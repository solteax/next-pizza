export const mapPizzaSize = {
  20: {
    default: "Small",
    translationKey: "filters.pizzaSize.small",
  },
  30: {
    default: "Medium",
    translationKey: "filters.pizzaSize.medium",
  },
  40: {
    default: "Large",
    translationKey: "filters.pizzaSize.large",
  },
} as const

export const mapPizzaType = {
  1: {
    default: "Traditional",
    translationKey: "filters.pizzaType.traditional",
  },
  2: {
    default: "Thin",
    translationKey: "filters.pizzaType.thin",
  },
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}))

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}))

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
