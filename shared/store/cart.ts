import { create } from "zustand"
import { Api } from "../services/api-client"
import { getCartDetails } from "../lib"
import { CartStateItem } from "../lib/get-cart-details"
import { CreateCartItemValues } from "../services/dto/cart.dto"

export interface CartState {
  loading: boolean
  updatingItems: Record<number, boolean>
  error: boolean
  totalAmount: number
  items: CartStateItem[]
  fetchCartItems: () => Promise<void>
  updateItemQuantity: (id: number, quantity: number) => Promise<void>
  addCartItem: (values: CreateCartItemValues) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  updatingItems: {},
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.getCart()

      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        updatingItems: { ...state.updatingItems, [id]: true },
        error: false,
      }))
      const data = await Api.cart.updateItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set((state) => ({
        error: true,
        updatingItems: { ...state.updatingItems, [id]: false },
      }))
    } finally {
      set((state) => ({
        updatingItems: { ...state.updatingItems, [id]: false },
      }))
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }))
      const data = await Api.cart.removeCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }))
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.addCartItem(values)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
}))
