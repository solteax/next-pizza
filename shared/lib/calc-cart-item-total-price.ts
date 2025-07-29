import { safePriceToNumber } from "@/shared/lib"
import { CartItemDTO } from "../services/dto/cart.dto"

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + safePriceToNumber(ingredient.price),
    0
  )

  const total =
    (ingredientsPrice + safePriceToNumber(item.productItem.price)) * item.quantity

  return Math.floor(total * 100) / 100
}
