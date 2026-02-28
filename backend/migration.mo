import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    available : Bool;
  };

  type OldActor = {
    products : Map.Map<Text, Product>;
  };

  type NewActor = {
    products : Map.Map<Text, Product>;
  };

  public func run(old : OldActor) : NewActor {
    { products = old.products };
  };
};
