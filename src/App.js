import { Fragment, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from './store/ui-slice';
import { sendCartData, fetchCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';

let initialRender = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(()=>{
    // Code to keep the logic inside a component, making the component "Fat component"
    /* 
      const storeCartData = async ()=> {
        dispatch(uiActions.showNotification({
          status: 'loading',
          title: 'loading ....',
          message:'The cart data is loading.'
        }));
        const response = await fetch('https://react-demo-1775-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT', 
          body: JSON.stringify(cart)
        })

        if(!response.ok){
          throw new Error('Something gone wrong!');
        }
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success...',
          message:'Cart data loaded successfully.'
        }));
      }
      if(initialRender){
        initialRender = false;
        return;
      }
      storeCartData().catch((error) => {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message:'Fetching problem .'
        }));
      }) 
    */

    // Code to keep the logic inside action creators,thus making the component "Lean" but the 
    // Action creation "Fat" -- 
    // The action crator has been written inside the "cart-slice.js" file and has been exported.
      
    if(initialRender){
      initialRender = false;
      /*
      // We can either call the action creator to populate the cart for the first time from here
      // Or we can initiate another useEffect call to populate the same.
        dispatch(fetchCartData());
      */
      return;
    }
    
    dispatch(sendCartData(cart));
    
  },[cart,dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
      <Layout>
        {showCart && <Cart />}
        <Products />  
      </Layout>
    </Fragment>
  );
}

export default App;
