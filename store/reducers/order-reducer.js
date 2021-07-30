import {encryptObj,decryptObj} from "../../utils/encryption-decryption"

let order = {};

if (typeof window !== "undefined") {
    order = decryptObj(localStorage.getItem('kparts-current-order')) || {};
}

const orderReducer = (state = order, action) => {
    let newOrder, existingItem
    switch (action.type) {
      case "CREATE_ORDER":
        newOrder = state;
        newOrder.order = action.payload;
        localStorage.setItem("kparts-current-order", encryptObj(newOrder));
        return { ...newOrder };

      case "ADD_DELIVERY":
        newOrder = state;

        if (!newOrder.order) return state;
        newOrder.delivery = action.payload;

        localStorage.setItem("kparts-current-order", encryptObj(newOrder));

        return { ...newOrder };

      case "ADD_ORDERED_PARTS":
        newOrder = state;

        if (!newOrder.order) return state;
        newOrder.ordered_parts = action.payload;

        localStorage.setItem("kparts-current-order", encryptObj(newOrder));

        return { ...newOrder };

      case "ADD_DISCOUNT":
        newOrder = state;

        if (!(newOrder.order && newOrder.delivery)) return state;
        newOrder.discount = action.payload;

        localStorage.setItem("kparts-current-order", encryptObj(newOrder));

        return { ...newOrder };

      case "ADD_PAYMENT_METHODS":
        newOrder = state;

        if (!newOrder.delivery) return state;
        newOrder.payment = action.payload;

        localStorage.setItem("kparts-current-order", encryptObj(newOrder));

        return { ...newOrder };

      case "ADD_PROCESSED_DATA":
        newOrder = state;

        if (!newOrder.delivery) return state;
        newOrder.payment = { ...newOrder.payment, processed: action.payload };

        localStorage.setItem("kparts-current-order", encryptObj(newOrder));

        return { ...newOrder };

      case "DESTROY_ORDER":
        newOrder = {};
        localStorage.removeItem("kparts-current-order");
        return { ...newOrder };
      default:
        return state;
    }
}

export default orderReducer
