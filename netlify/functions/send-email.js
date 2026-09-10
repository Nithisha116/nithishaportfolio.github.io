const nodemailer = require("nodemailer");

const RECIPIENT_EMAIL = "nithishareddy113@gmail.com";

const JSON_HEADERS = { "Content-Type": "application/json" };

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const title = (payload.title || "").trim();
  const message = (payload.message || "").trim();

  if (!name || !email || !message || !isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Missing or invalid required fields" }),
    };
  }

  const subject = title || "New Portfolio Contact Message";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nTitle: ${subject}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Title:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("send-email error:", err);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
