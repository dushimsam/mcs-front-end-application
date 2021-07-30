import {encryptObj,decryptObj} from "../../utils/encryption-decryption"

let cart = [];

if (typeof window !== "undefined") {
    cart  = decryptObj(localStorage.getItem('kparts-shopping-cart')) || [];
}

const cartReducer = (state=cart,action) =>{
    let newCart,existingItem
    switch(action.type){
        case 'ADD_ITEM_TO_CART':
            action.payload.orderedQuantity = 1
            newCart = [...state,action.payload]
            localStorage.setItem('kparts-shopping-cart',encryptObj(newCart))
            return [...newCart]

        case 'INCREMENT_ITEM':   
            newCart = state;

            existingItem = newCart.find(cartItem => cartItem._id == action.payload);
            console.log("Item to increment",existingItem)
            console.log("payload was"+ action.payload)
            if(!existingItem || existingItem.orderedQuantity === existingItem.quantity) return state

            existingItem.orderedQuantity +=1
            localStorage.setItem('kparts-shopping-cart',encryptObj(newCart))

            return [...newCart]

        case 'DECREMENT_ITEM':               
            newCart = state;

            existingItem = state.find(cartItem => cartItem._id == action.payload);
            if(!existingItem || existingItem.orderedQuantity === 1) return state
            
            if(existingItem.orderedQuantity < 2) newCart = newCart.filter(item => item._id != action.payload )
            else existingItem.orderedQuantity -=1
            
            localStorage.setItem('kparts-shopping-cart',encryptObj(newCart))

            return  [...newCart]


        case 'REMOVE_ITEM':
            newCart = state.filter(cartItem => cartItem._id != action.payload)
             localStorage.setItem('kparts-shopping-cart',encryptObj(newCart))
            return newCart

        case 'DESTROY_CART':
            newCart = []
            localStorage.removeItem('kparts-shopping-cart')
            return [newCart]
 
        default:
            return state
    }
}

export default cartReducer
