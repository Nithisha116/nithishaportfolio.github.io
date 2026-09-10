const nodemailer = require("nodemailer");

const RECIPIENT_EMAIL = "nithishareddy113@gmail.com";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  let payload;
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (err) {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const title = (payload.title || "").trim();
  const message = (payload.message || "").trim();

  if (!name || !email || !message || !isValidEmail(email)) {
    res.status(400).json({ error: "Missing or invalid required fields" });
    return;
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
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Title:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("send-email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
