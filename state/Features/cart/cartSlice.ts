"use client";

import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
  category: string
}

export interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  total: number;
  priceTotal: number;
}

const initialState: CartState = {
  cartItems: [],
  isCartOpen: false,
  total: 0,
  priceTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart, (state, action) => {
      const { productToAdd } = action.payload;
      const existingItem = state.cartItems.find(
        (item: any) => item.id === productToAdd.id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem: any) =>
          cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems.push({ ...productToAdd, quantity: 1 });
      }
    });
    builder.addCase(removeItemFromCart, (state, action) => {
      const { productToRemove } = action.payload;
      const existingItem = state.cartItems.find(
        (item: any) => item.id === productToRemove.id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== productToRemove.id
        );
      }
    });
    builder.addCase(reduceItemQuantityFromCart, (state, action) => {
      const { itemToReduce } = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === itemToReduce.id
      );

      if (existingItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== itemToReduce.id
        );
      }

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === itemToReduce.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    });
    builder.addCase(cartPriceTotal, (state, action) => {
      state.priceTotal = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    });
  },
});

export const { setIsCartOpen, setCartItems } = cartSlice.actions;

export const addItemToCart = createAction<{
  cartItems: any[];
  productToAdd: any;
}>("cart/ADD_ITEM_TO_CART");

export const removeItemFromCart = createAction<{
  cartItems: any[];
  productToRemove: any;
}>("cart/REMOVE_ITEM_FROM_CART");

export const reduceItemQuantityFromCart = createAction<{
  cartItems: any[];
  itemToReduce: any;
}>("cart/REDUCE_ITEM_QUANTITY");

export const cartPriceTotal = createAction<{
  cartItems: any[];
}>("cart/CART_PRICE_TOTAL");

export default cartSlice.reducer;
