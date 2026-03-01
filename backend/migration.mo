import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
  type OldProduct = {
    id : Text;
    name : Text;
    description : Text;
    price : ?Nat;
    category : Text;
    imageUrl : Text;
    available : Bool;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
  };

  type NewProduct = {
    id : Text;
    name : Text;
    description : Text;
    price : ?Nat;
    category : Text;
    imageUrl : Text;
    available : Bool;
  };

  type NewActor = {
    products : Map.Map<Text, NewProduct>;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          oldProduct with
          available = true
        };
      }
    );
    { products = newProducts };
  };
};
