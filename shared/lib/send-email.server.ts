import sgMail from "@sendgrid/mail"

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  const { renderToStaticMarkup } = await import("react-dom/server")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")
  // Convert React component to HTML
  const htmlContent =
    typeof template === "string"
      ? template
      : renderToStaticMarkup(template as React.ReactElement)

  const msg = {
    to,
    from: process.env.SENDGRID_SENDER_EMAIL || "",
    subject,
    html: htmlContent,
  }

  try {
    const response = await sgMail.send(msg)
    console.log("SendGrid response:", response[0])
    return response[0]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`)
    }
    throw new Error("Failed to send email: Unknown error")
  }
}
