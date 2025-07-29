import { safePriceToNumber } from "@/shared/lib"
import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"

/**
 * Function to calculate the total price of the pizza
 *
 * @param type - type of pizza
 * @param size - size of pizza
 * @param items - list of variations
 * @param ingredients - list of ingredients
 * @param selectedIngredients - selected ingredients
 *
 * @returns number total price
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    safePriceToNumber(
      items.find((item) => item.pizzaType === type && item.size === size)?.price
    ) || 0

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + safePriceToNumber(ingredient.price), 0)

  return pizzaPrice + totalIngredientsPrice
}
