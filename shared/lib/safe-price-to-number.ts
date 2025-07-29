export const safePriceToNumber = (price: any, defaultValue: number = 0): number => {
  if (price === undefined || price === null) {
    return defaultValue
  }

  try {
    let num: number

    if (typeof price === "object" && "toNumber" in price) {
      num = price.toNumber()
    } else {
      num = Number(price)
    }

    if (isNaN(num)) return defaultValue

    return Math.round(num * 100) / 100
  } catch (error) {
    console.warn("Invalid price value:", price, error)
    return defaultValue
  }
}
