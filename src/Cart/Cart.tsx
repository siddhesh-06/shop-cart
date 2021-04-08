import CartItem from '../CartItem/CartItem';
import {Wrapper} from './CartStyled'
import {CartItemtype} from '../App';

type Props = {
    cartItems: CartItemtype[];
    addToCart: (clickedItem: CartItemtype) => void;
    removeFromCart: (id:number) => void;
}

const Cart: React.FC<Props> = ({cartItems,addToCart,removeFromCart}) =>{
    const calculateTotal = (items:CartItemtype[]) =>{
        return items.reduce((ack: number,item) => ack + item.amount * item.price,0)
    }
    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item =>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart