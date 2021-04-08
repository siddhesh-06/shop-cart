import {Button} from '@material-ui/core';
//Types
import {CartItemtype} from '../App';
//Styles
import {Wrapper} from './CartItemStyled';

type Props = {
    item: CartItemtype;
    addToCart: (clickedItem: CartItemtype) => void;
    removeFromCart: (id: number) => void;
}


const CartItem: React.FC<Props> = ({item,addToCart,removeFromCart}) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className='information'>
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount*item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={()=> removeFromCart(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={()=> addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title}/>
    </Wrapper>
)

export default CartItem