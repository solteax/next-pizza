import { Decimal } from "@prisma/client/runtime/library"

if (!(Decimal.prototype as any).toJSON) {
  ;(Decimal.prototype as any).toJSON = function () {
    return this.toNumber()
  }
}
