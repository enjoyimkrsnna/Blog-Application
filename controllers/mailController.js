const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const OTP = require('../models/Otp');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { passwordResetEmail } = require('../config/emailTemplates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});

const getForgotPassword = (req, res) => {
  res.render('forgot-password', { title: 'Forgot Password' });
};

const postForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('forgot-password', { error: 'No account with that email' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    const otpData = new OTP({
      email: email,
      otp: otp,
      expiresAt: new Date(Date.now() + 10 * 60000) 
    });

    await otpData.save();

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Your Password Reset OTP - Not Just a Random Number!',
        html: passwordResetEmail(otp) 
      };

    await transporter.sendMail(mailOptions);

    res.render('forgot-password', { message: 'OTP sent to your email', email });
  } catch (error) {
    console.error(error);
    res.render('forgot-password', { error: 'Internal server error' });
  }
};

const getUpdatePassword = (req, res) => {
  res.render('update-password', { title: 'Update Password' });
};

const postUpdatePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  console.log('password updating');
  try {
    const otpEntry = await OTP.findOne({ email, otp });

    if (!otpEntry || otpEntry.expiresAt < Date.now()) {
      return res.render('update-password', { error: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('update-password', { error: 'No account with that email' });
    }

    user.password = newPassword;
    await user.save();

    await OTP.deleteOne({ email });

    res.render('update-password', { success: 'Password updated successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.render('update-password', { error: 'Internal server error' });
  }
};

module.exports = {
  getForgotPassword,
  postForgotPassword,
  getUpdatePassword,
  postUpdatePassword
};
