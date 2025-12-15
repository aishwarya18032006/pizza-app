const nodemailer = require("nodemailer");

const sendOrderMail = async (to, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Pizza App 🍕" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🍕 Order Confirmed",
    html: `
      <h2>Order Confirmed</h2>
      <p>Thank you for your order!</p>
      <p><b>Total:</b> ₹${order.total}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Order mail sent");
};

module.exports = sendOrderMail;
