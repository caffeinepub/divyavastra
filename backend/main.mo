import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Migration "migration";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : ?Nat;
    category : Text;
    imageUrl : Text;
    available : Bool;
  };

  let products : Map.Map<Text, Product> = Map.empty<Text, Product>();

  public shared ({ caller }) func initializeJaipuriSkirts() : async () {
    if (products.size() > 0) {
      Runtime.trap("Jaipuri Skirts already initialized");
    };
    let jaipuriProducts : [Product] = [
      {
        id = "1";
        name = "Red/Gold Floral Lehenga";
        description = "A beautiful red Jaipuri skirt with gold floral patterns.";
        price = null;
        category = "Jaipuri Skirt";
        imageUrl = "/assets/generated/IMG_4047-1.jpeg";
        available = true;
      },
      {
        id = "2";
        name = "Navy/Gold Lehenga";
        description = "Elegant navy Jaipuri skirt perfect for festivals with gold accents.";
        price = null;
        category = "Jaipuri Skirt";
        imageUrl = "/assets/generated/IMG_4044-1.jpeg";
        available = true;
      },
      {
        id = "3";
        name = "Pink Floral Lehenga";
        description = "Stylish pink Jaipuri skirt with floral patterns.";
        price = null;
        category = "Jaipuri Skirt";
        imageUrl = "/assets/generated/IMG_4045-1.jpeg";
        available = true;
      },
    ];

    for (product in jaipuriProducts.values()) {
      products.add(product.id, product);
    };
  };

  public shared ({ caller }) func initializeKurtis() : async () {
    let kurtiProducts : [Product] = [
      {
        id = "4";
        name = "White/Purple Block-Print Kurti";
        description = "Stunning white short kurti with purple block-print design.";
        price = null;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-1.jpeg";
        available = true;
      },
      {
        id = "5";
        name = "White/Purple Block-Print Kurti - Side View";
        description = "Side view of the stunning white short kurti with purple block-print design.";
        price = null;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-2.jpeg";
        available = true;
      },
      {
        id = "6";
        name = "White/Purple Block-Print Kurti - Closeup";
        description = "Closeup of the beautiful white/purple block-print kurti showing fabric details.";
        price = null;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-2.jpeg";
        available = true;
      },
    ];

    for (product in kurtiProducts.values()) {
      products.add(product.id, product);
    };
  };

  public shared ({ caller }) func initializeSarees() : async () {
    let sareeProducts : [Product] = [
      {
        id = "7";
        name = "Traditional Silk Saree";
        description = "Elegant traditional silk saree with intricate gold border.";
        price = null;
        category = "Saree";
        imageUrl = "/assets/generated/IMG_SAREE1.jpeg";
        available = true;
      },
      {
        id = "8";
        name = "Modern Georgette Saree";
        description = "Lightweight georgette saree with contemporary design.";
        price = null;
        category = "Saree";
        imageUrl = "/assets/generated/IMG_SAREE2.jpeg";
        available = true;
      },
      {
        id = "9";
        name = "Handloom Cotton Saree";
        description = "Eco-friendly handloom cotton saree in vibrant colors.";
        price = null;
        category = "Saree";
        imageUrl = "/assets/generated/IMG_SAREE3.jpeg";
        available = true;
      },
    ];

    for (product in sareeProducts.values()) {
      products.add(product.id, product);
    };
  };

  public shared ({ caller }) func initializeGopiDresses() : async () {
    let gopiDressProducts : [Product] = [
      {
        id = "10";
        name = "Pastel Pink Gopi Dress";
        description = "A stunning pastel pink Gopi Dress with intricate embroidery.";
        price = null;
        category = "Gopi Dress";
        imageUrl = "/assets/generated/IMG_4047-2.jpeg";
        available = true;
      },
      {
        id = "11";
        name = "Lavender Gopi Dress";
        description = "Elegant lavender Gopi Dress with gold accents.";
        price = null;
        category = "Gopi Dress";
        imageUrl = "/assets/generated/IMG_4044-2.jpeg";
        available = true;
      },
      {
        id = "12";
        name = "Blue Floral Gopi Dress";
        description = "Gopi Dress featuring beautiful blue floral patterns.";
        price = null;
        category = "Gopi Dress";
        imageUrl = "/assets/generated/IMG_4045-2.jpeg";
        available = true;
      },
    ];

    for (product in gopiDressProducts.values()) {
      products.add(product.id, product);
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.toArray().filter(
      func((_, product)) {
        Text.equal(product.category, category);
      }
    );
    filtered.map(
      func((_, product)) { product }
    );
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
