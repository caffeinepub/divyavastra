import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProductInternal = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageId : ?Text;
    category : Text;
    inStock : Bool;
    whatsappNumber : Text;
  };

  public type Product = ProductInternal;

  public type UserProfile = {
    name : Text;
  };

  let products = Map.empty<Nat, ProductInternal>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextProductId = 5;

  func getNextProductId() : Nat {
    let id = nextProductId;
    nextProductId += 1;
    id;
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product query functions (public, no auth required)
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Product mutation functions (admin-only)
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, imageId : ?Text, category : Text, inStock : Bool, whatsappNumber : Text) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let newProduct : ProductInternal = {
      id = getNextProductId();
      name;
      description;
      price;
      imageId;
      category;
      inStock;
      whatsappNumber;
    };
    products.add(newProduct.id, newProduct);
    newProduct.id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, imageId : ?Text, category : Text, inStock : Bool, whatsappNumber : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : ProductInternal = {
          id;
          name;
          description;
          price;
          imageId;
          category;
          inStock;
          whatsappNumber;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };
};
