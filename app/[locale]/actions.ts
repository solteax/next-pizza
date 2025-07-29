"use server"

import { prisma } from "@/prisma/prisma-client"
import { PayOrderTemplate } from "@/shared/components"
import { VerificationUserTemplate } from "@/shared/components/blocks/email-temapltes/verification-user"
import { calcOrderTotalPrice, safePriceToNumber } from "@/shared/lib"
import { OrderStatus, Prisma } from "@prisma/client"
import { getUserSession } from "@/shared/lib/get-user-session"
import { hashSync } from "bcrypt"
import { cookies } from "next/headers"
import { sendEmail } from "@/shared/lib/send-email.server"

export async function createOrder(
  data: any,
  totalAmount: number,
  emailData: {
    emailTitle: string
    messageTitle: string
    paymentMessage: React.ReactNode
  }
): Promise<void> {
  try {
    const cookieStore = cookies()
    const cartToken = cookieStore.get("cartToken")?.value

    if (!cartToken) {
      throw new Error("Cart token not found")
    }

    /* Find cart by token */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })

    /* If no cart found */
    if (!userCart) {
      throw new Error("Cart not found")
    }

    /* If cart is empty */
    if (safePriceToNumber(userCart?.totalAmount) === 0) {
      throw new Error("Cart is empty")
    }

    /* Create order */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: calcOrderTotalPrice(totalAmount).totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    /* Clear cart */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    // Draft for payment logic
    // const paymentData = await createPayment({
    //   amount: order.totalAmount,
    //   orderId: order.id,
    //   description: "Payment for order #" + order.id,
    // })

    // if (!paymentData) {
    //   throw new Error("Payment data not found")
    // }

    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.id,
    //   },
    // })

    // const paymentUrl = paymentData.confirmation.confirmation_url

    await sendEmail(
      data.email,
      emailData.emailTitle + order.id,
      PayOrderTemplate({
        messageTitle: emailData.messageTitle + order.id,
        paymentMessage: emailData.paymentMessage,
      })
    )

    // return paymentUrl
  } catch (err) {
    console.log("[CreateOrder] Server error", err)
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession()

    if (!currentUser) {
      throw new Error("User not found")
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    })
  } catch (err) {
    console.log("Error [UPDATE_USER]", err)
    throw err
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error("Email not verified")
      }

      throw new Error("User already exists")
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })

    await sendEmail(
      createdUser.email,
      "Next Pizza / 📝 Confirm registration",
      VerificationUserTemplate({
        code,
      })
    )
  } catch (err) {
    console.log("Error [CREATE_USER]", err)
    throw err
  }
}
