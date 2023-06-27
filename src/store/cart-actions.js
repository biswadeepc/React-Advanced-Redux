import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = ()=>{
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-demo-1775-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')

            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            return data;
        }

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                totalQuantity: cartData.totalQuantity || 0,
                items : cartData.items || []
            }));
        }
        catch(error)
        {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message:'Fetching problem .'
              }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'loading',
            title: 'loading ....',
            message:'The cart data is loading.'
          }));
        const sendRequest = async () => {
            const response = await fetch('https://react-demo-1775-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
            {
                method: 'PUT', 
                body: JSON.stringify(cart)
            })

            if(!response.ok){
                throw new Error('Something gone wrong!');
            }
        }

        try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success...',
                message:'Cart data loaded successfully.'
              }));
        }
        catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message:'Fetching problem .'
              }));
        }
    }
}