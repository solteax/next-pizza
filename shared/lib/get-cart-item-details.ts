import { CartStateItem } from "./get-cart-details"
import { getVaLidTranslation } from "./get-valid-translation"

export const getCartItemDetails = ({
  ingredients,
  t,
  pizzaDetails,
}: {
  ingredients?: CartStateItem["ingredients"]
  t: (key: string) => string
  pizzaDetails?: string | null
}): string => {
  const details = []

  if (pizzaDetails) {
    details.push(pizzaDetails)
  }

  if (ingredients) {
    details.push(
      ...ingredients.map((ingredient) =>
        getVaLidTranslation({
          key: ingredient.translationKey && `ingredient.${ingredient.translationKey}`,
          defaultValue: ingredient.name,
          t,
        })
      )
    )
  }

  return details.join(", ")
}
