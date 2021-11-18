import { act } from "react-dom/cjs/react-dom-test-utils.development";
import { combineReducers } from "redux";

const products = (state=[], action ) =>{
    switch (action.type){
        case 'GET_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

const category = (state=[], action) =>{
    switch (action.type){
        case 'GET_CATEGORY':
            return action.payload;
        default:
            return state;
    }
}

const basket = (state=[], action) =>{
    switch(action.type){
        case 'ADD_ITEM':{
            if(state.filter((e)=> e.id === action.payload.id).length > 0){
                const index = state.findIndex((e)=> e.id === action.payload.id);
                //const newPrice = ((typeof state[index].price === 'string' ? parseFloat(state[index].price.replace(",", ".")):state[index].price ) / state[index].number * (state[index].number + 1)).toFixed(2);
                const newPrice = state[index].price / state[index].number * (state[index].number + 1)
                const addNumber = {...state[index], number: state[index].number+1, price: newPrice}
                const newState = state.filter(item => item.id !== action.payload.id);
                return [...newState, addNumber];
            }
            else
                return[...state, {...action.payload, number: 1 }]
        }
        case 'REMOVE_ITEM':
            return state.filter(item => item !== action.payload);
        default: 
            return state;
    }
}

const totalCharge = (state=0, action) =>{
    switch(action.type){
        case 'ADD_CHARGE':
            return state + action.payload;
        case 'REMOVE_CHARGE':
            return state - action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    products: products,
    category: category,
    basket: basket,
    charge: totalCharge
});