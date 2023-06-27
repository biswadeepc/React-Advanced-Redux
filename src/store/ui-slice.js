import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name:'ui',
    initialState: {cartIsVisible: false, notification:null},
    reducers: {
        toggle(state){
            // Basis on our understanding of redux, state mutation cannot be done.
            // So here also we should create a new state and return it.
            /*
             return {
                 cartIsVisible : !state.cartIsVisible
             }
             */
            // But thanks to Redux-Toolkit, which is using "Immer" under the hood, which lets us use
            // State mutating 'easy to understand' way but does everything required behind the scenes.
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state,action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;