const nodemailer = require("nodemailer");

const sendOrderMail = async (to, order) => {
  try {
    console.log("📧 MAIL FUNCTION CALLED");
    console.log("📧 To:", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Pizza App 🍕" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "🍕 Order Confirmed",
      html: `
        <h2>Order Confirmed</h2>
        <p>Thank you for your order!</p>
        <p><b>Total:</b> ₹${order.total}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Order mail sent successfully");
  } catch (error) {
    console.error("❌ Mail sending failed:", error.message);
  }
};

module.exports = sendOrderMail;
