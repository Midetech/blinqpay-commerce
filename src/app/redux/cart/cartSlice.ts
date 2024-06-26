import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../interfaces/interface';
interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        },
        increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            return {
                ...state,
                items: state.items
                    .map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };
        },

        removeFromCart: (state, action) => {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            };
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addToCart, increaseQuantity, clearCart, setCartItems, decreaseQuantity, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const quantities = (state: { cart: CartState }) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectTotalPrice = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
