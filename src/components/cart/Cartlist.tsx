import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Cart } from "../../types/ProductTypes";
import CartItem from "./cartItem";

const Cartlist = () => {
  const cartItems = useSelector((state: RootState) => state.product.cart);
  const calculateTotal = (items: Cart[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cartlist;
