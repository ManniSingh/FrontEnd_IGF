import { Button } from "@mui/material";
import { Cart } from "../../types/ProductTypes";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/productSlice";
import { cartItemStyles, imageStyles } from "../../styles/cartItem";

interface CartItemProps {
  item: Cart;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div style={cartItemStyles}>
      <div>
        <img src={item.images[0]} alt={item.title} style={imageStyles} />
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Subtotal: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(addToCart(item))}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
