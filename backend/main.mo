import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  include MixinStorage();

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    available : Bool;
  };

  let products : Map.Map<Text, Product> = Map.empty<Text, Product>();

  // Seed initial products
  public shared ({ caller }) func initialize() : async () {
    if (products.size() > 0) {
      Runtime.trap("Products already initialized");
    };

    let initialProducts : [Product] = [
      {
        id = "1";
        name = "Blue Gopi Skirt";
        description = "A beautiful blue Gopi skirt with traditional patterns.";
        price = 2500;
        category = "Gopi Skirt";
        imageUrl = "https://example.com/images/blue_skirt.jpg";
        available = true;
      },
      {
        id = "2";
        name = "Red Gopi Skirt";
        description = "Elegant red Gopi skirt perfect for festivals.";
        price = 2700;
        category = "Gopi Skirt";
        imageUrl = "https://example.com/images/red_skirt.jpg";
        available = true;
      },
      {
        id = "3";
        name = "Floral Gopi Skirt";
        description = "Stylish Gopi skirt with floral patterns.";
        price = 2600;
        category = "Gopi Skirt";
        imageUrl = "https://example.com/images/floral_skirt.jpg";
        available = true;
      },
      {
        id = "4";
        name = "Purple Gopi Skirt";
        description = "A stunning purple Gopi skirt with intricate designs.";
        price = 2800;
        category = "Gopi Skirt";
        imageUrl = "https://example.com/images/purple_skirt.jpg";
        available = true;
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductById(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (products.containsKey(product.id)) {
      Runtime.trap("Product with this ID already exists");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };
};
