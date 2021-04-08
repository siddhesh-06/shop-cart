import {useState} from 'react'
import {useQuery} from 'react-query'

//Components
import Item from './Item/Item'
import Cart from './Cart/Cart';
import {Drawer , Grid ,LinearProgress, Badge} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'

//Styles
import {Wrapper,StyledButton} from './AppStyles'

//Types
export type CartItemtype = {
  id : number;
  category : string;
  description : string;
  image : string;
  price : number;
  title : string;
  amount : number;
}


const getProducts = async():Promise<CartItemtype[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();



const App = () => {

  const [cartOpen,setcartOpen] = useState(false);

  const [cartItems,setCartItems] = useState([] as CartItemtype[]);

  const {data,isLoading,error} = useQuery<CartItemtype[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemtype[]) =>
    items.reduce((ack: number,item) => ack +item.amount,0);

  const handleAddToCart = (clickedItem: CartItemtype) => {
    setCartItems(prev => {
      const isItemIncart = prev.find(item => item.id === clickedItem.id)
      
      if(isItemIncart){
        return prev.map(item => item.id === clickedItem.id ? {...item,amount: item.amount+1} : item)
      }

      return [...prev,{...clickedItem, amount: 1}];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack,item) =>{
          if(item.id === id){
            if(item.amount === 1) return ack;
            return [...ack,{...item,amount: item.amount-1}];
          }else{
            return [...ack,item];
          }
      },[] as CartItemtype[])
    )
  };

  if(isLoading) return <LinearProgress/>;

  if(error) return <div>Somethings gets wrong...</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=> setcartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={()=>setcartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
}

export default App;
