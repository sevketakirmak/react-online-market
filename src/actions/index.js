import axios from "axios";

export const addItem = (product) => {
    const list = {...product, number: 1};
    return{
        type: "ADD_ITEM",
        payload: list
    }
}
export const removeItem = (product) => {
    return{
        type: "REMOVE_ITEM",
        payload: product
    }
}

export const addCharge = (price) => {
    return{
        type: "ADD_CHARGE",
        payload: price
    }
}

export const removeCharge = (price) => {
    return{
        type: "REMOVE_CHARGE",
        payload: price
    }
}

export const getProducts = (categoryId) => async(dispatch) =>{
    const response = await axios.get('http://localhost:8000/products', {
        params: {
            categoryId: categoryId
        }
    });

    dispatch({type:"GET_PRODUCTS", payload: response.data});
}

export const getCategory = (name) => async (dispatch) =>{

    const response = await axios.get('http://localhost:8000/category',{
        params:{
            name: name,
        }
    });

    dispatch({type:"GET_CATEGORY", payload: response.data});

}