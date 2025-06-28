const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.post('/send-chart-email', async (req, res) => {
  const { email, image } = req.body;
console.log('Received email:', email);
console.log('Received image:', image ? 'Image data present' : 'No image data');
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
    return res.status(400).send('Invalid email');

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.example.com',
//     port: 465,
//     secure: true,          // → false if you’re on port 587
//     auth: { user: 'youruser', pass: 'yourpass' }
//   });
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'kavindabandara94@gmail.com',
//     pass: '778569119119kS'
//   }
// });
  try {
    await transporter.sendMail({
      from: '"Bucks2Bar" <no-reply@bucks2bar.com>',
      to: email,
      subject: 'Your Chart Image',
      text: 'Attached is your chart image.',
      attachments: [{
        filename: 'chart.png',
        content: image.split(',')[1],   // may be undefined if data URL is malformed
        encoding: 'base64'
      }]
    });
    return res.send('Email sent');
  } catch (err) {
    console.error('❌ Email send failed:', err);  // 👈  see full stack in terminal
    return res.status(500).send(err.message);     // send message to caller while debugging
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));
