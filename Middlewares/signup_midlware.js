const genOtp = require("otp-generator");
const nodemailer = require("nodemailer");
const readline = require("readline");
const Joi = require("@hapi/joi");
const otp = genOtp.generate(6, {
  specialChars: false,
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
});
require("dotenv").config();
async function generateOtp(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$")
      )
      .required().messages({'string.empty':"cannot be empty password",
    "string.pattern.base":"incorrect pattern of password"})
  });
  const data = { email: req.body.email, password: req.body.password };
  const result = schema.validate(data, { abortEarly: false });
  if (result.error) {
   return res.status(400).send({ message: result.error.details });
  }
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "manichandhankumar@gmail.com",
      pass: process.env.password,
    }, 
  });  
  const mailOptions = {
    from: "manichandhankumar@gmail.com",
    to: req.body.email, 
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
      res.status(404).send({ message: "error while sending otp" });
    } else {
      console.log("Email sent: " + info.response);
      const rl = readline.createInterface({
        input: process.stdin, // Read from the standard input (keyboard)
        output: process.stdout, // Write to the standard output (console)
      });

      // Prompt the user for input
      rl.question("Enter otp: ", (userInput) => {
        if (otp == userInput) {
          next();
        } else {
          console.log(`incorrect otp: ${userInput}`);
          res.status(404).send({ message: "incorrect otp" });
        }

        rl.close(); // Close the readline interface
        
      });

      // This code will continue to run while waiting for user input
    }
  });
}

module.exports = { generateOtp };
