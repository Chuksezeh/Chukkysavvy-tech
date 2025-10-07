import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSliceProduct = createSlice({
  name: 'cartProduct',
  initialState: {
    productItems: [],
    productTotalAmount: 0,
    productTotalCount: 0,
  },
  reducers: {
    // Add to cart product/////////////////////////////////////////////

    addToCartProduct: (state, action) => {
      const itemInCart = state.productItems.find(item => item.productId === action.payload.productId);
      if (itemInCart) {
        // Item already exists, do nothing (don't add or update quantity)
        return;
      } else {
        // Item doesn't exist, add it to the cart with quantity 1
        state.productItems.push({ ...action.payload, quantity: 1 });
      }
    },

    // get total product ///////////////////////////////////////////////
    getCartTotalProduct: state => {
      let { productTotalAmount, productTotalCount } = state.productItems.reduce(
        (cartTotal, cartItem) => {
          const { pricePerItem, quantity } = cartItem;
          const itemTotal = pricePerItem * quantity;
          cartTotal.productTotalAmount += itemTotal;
          cartTotal.productTotalCount += quantity;
          return cartTotal;
        },
        { productTotalAmount: 0, productTotalCount: 0 }
      );
      state.productTotalAmount = parseInt(productTotalAmount.toFixed(2));
      state.productTotalCount = productTotalCount;
    },

    // Increase product quantity///////////////////////////////////////////
    increase: (state, action) => {
      state.productItems = state.productItems.map(item => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    // remove product///////////////////////////////////////

    removeProduct: (state, action) => {
      state.productItems = state.productItems.filter(item => item.productId !== action.payload);
    },

    decrease: (state, action) => {
      state.productItems = state.productItems.map(item => {
        if (item.productId === action.payload && item.quantity >= 1) {
          return { ...item, quantity: (item.quantity -= 1) };
        }
        return item;
      });
    },

    // clear product cart//////////////////////////////////////////////

    clearCartProduct: state => {
      state.productItems = [];
    },

    hasError: (state, action) => {
      state.items = state.items.map(item => {
        item.fields.map(item => {
          item.fieldItems.map(current => {
            if (current.fieldItemId === action.payload && current.quantity < current.currentQuantity) {
              return { hasError: 'Maximum' };
            }
          });
        });
      });
    },
  },
});

export const { getCartTotalProduct, clearCartProduct, removeProduct, addToCartProduct, increase, decrease } =
  counterSliceProduct.actions;
export default counterSliceProduct.reducer;
