const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post("/sendemail", (req, res) => {
  const { interested_credit, name, mail, zipcode, company_name } = req.body;

  if (
    interested_credit === "" ||
    name === "" ||
    mail === "" ||
    zipcode === "" ||
    company_name === ""
  ) {
    return res.json({
      status: "ERR",
      message: "parameter require!",
    });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zycoda.landing@gmail.com",
        pass: "aqha peab xdtr olkm",
      },
    });

    const htmlContent = `
      <b>ชื่อ - สกุล : ${name}</b>
      <p>สินค้าที่สนใจ : ${interested_credit.join(", ")}</p>
      <p>ชื่อบริษัท : ${company_name}</p>
      <p>เบอร์โทรศัพท์ : ${zipcode}</p>
      <p>Email : ${mail}</p>
    `;

    const option = {
      from: "zycoda.landing@gmail.com",
      to: "perapat8589@gmail.com",
      subject: "ข้อมูลสมัครขอทดลองใช้ Demo",
      text: "ข้อมูลผู้สมัคร",
      html: htmlContent,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        return res.json({
          status: "ERR",
          message: err,
        });
      } else {
        console.log(info.response);
        return res.json({
          status: "OK",
          message: info.response,
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Node app running port 3000!");
});

module.exports = app