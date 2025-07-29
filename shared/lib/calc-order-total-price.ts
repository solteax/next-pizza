import { DELIVERY_PRICE, VAT } from "../constants"
import { safePriceToNumber } from "./safe-price-to-number"

export const calcOrderTotalPrice = (totalAmount: number) => {
  const vatPrice = safePriceToNumber((totalAmount * VAT) / 100)
  const totalPrice = safePriceToNumber(totalAmount + DELIVERY_PRICE + vatPrice)
  return {
    vatPrice,
    totalPrice,
  }
}
