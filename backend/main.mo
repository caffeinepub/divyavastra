import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Migration "migration";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

(with migration = Migration.run)
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

  // Seed initial Gopi Skirt products
  public shared ({ caller }) func initializeGopiProducts() : async () {
    if (products.size() > 0) {
      Runtime.trap("Gopi Skirt products already initialized");
    };
    let initialProducts : [Product] = [
      {
        id = "1";
        name = "Red/Gold Floral Lehenga";
        description = "A beautiful red Gopi skirt with gold floral patterns.";
        price = 2500;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4047-1.jpeg";
        available = true;
      },
      {
        id = "2";
        name = "Navy/Gold Lehenga";
        description = "Elegant navy Gopi skirt perfect for festivals with gold accents.";
        price = 2700;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4044-1.jpeg";
        available = true;
      },
      {
        id = "3";
        name = "Pink Floral Lehenga";
        description = "Stylish pink Gopi skirt with floral patterns.";
        price = 2600;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4045-1.jpeg";
        available = true;
      },
      {
        id = "4";
        name = "Red/Gold Lehenga - Side View";
        description = "Side view of the beautiful red Gopi skirt with gold floral patterns.";
        price = 2500;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4047-2.jpeg";
        available = true;
      },
      {
        id = "5";
        name = "Navy/Gold Lehenga - Side View";
        description = "Side view of the elegant navy Gopi skirt with gold accents.";
        price = 2700;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4044-2.jpeg";
        available = true;
      },
      {
        id = "6";
        name = "Pink Gopi Skirt - Floral Patterns";
        description = "Alternative angle of the stylish pink Gopi skirt with floral patterns.";
        price = 2600;
        category = "Gopi Skirt";
        imageUrl = "/assets/generated/IMG_4045-2.jpeg";
        available = true;
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };
  };

  // Seed Short Kurti specific products
  public shared ({ caller }) func initializeKurtiProducts() : async () {
    let kurtiProducts : [Product] = [
      {
        id = "7";
        name = "White/Purple Block-Print Kurti";
        description = "Stunning white short kurti with purple block-print design.";
        price = 1800;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-1.jpeg";
        available = true;
      },
      {
        id = "8";
        name = "White/Purple Block-Print Kurti - Side View";
        description = "Side view of the stunning white short kurti with purple block-print design.";
        price = 1800;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-2.jpeg";
        available = true;
      },
      {
        id = "9";
        name = "White/Purple Block-Print Kurti - Closeup";
        description = "Closeup of the beautiful white/purple block-print kurti showing fabric details.";
        price = 1800;
        category = "Short Kurti";
        imageUrl = "/assets/generated/IMG_4048-2.jpeg";
        available = true;
      },
    ];

    for (product in kurtiProducts.values()) {
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
