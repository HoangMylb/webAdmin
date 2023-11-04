const express = require('express');
const router = express.Router();

// email handler
const nodemailer = require('nodemailer');

// Password handler
const bcrypt = require('bcrypt');

// mongodb user model
const User = require('../model/User');

// mongodb user otp verification model
const UserOTPVerification = require('../model/UserOTPVerification');

// unique string
// const { v4: uuidv4 } = require('uuid');

// Env variables
require('dotenv').config();

// path for static verified page
const path = require('path');

// Nodemailer stuff
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

// testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready for messages');
        console.log(success);
    }
});

// setting sever url
const development = 'http://localhost:3000/';
const production = 'https://radiant-meadow-44726.herokuapp.com/';
const currentUrl = process.env.NODE_ENV ? production : development;



router.post('/signup', async (req, res) => {
    let { email, trangThai, ghe , soLuong } = req.body;
    email = email.trim();

    if (email == "") {
        res.json({
            status: false,
            message: 'Empty input fields!',
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: false,
            message: 'Invalid email entered',
        });
    } else {
        // Checking if user already exists
        User.find({ email })
            .then(async (result) => {
                if (result.length && trangThai === "OTP") {
                    // A user already exists
                    try {
                        const userId = result[0]._id;

                        if (!userId || !email) {
                            throw Error('Empty user details are not allowed');
                        } else {
                            // delete existing records and resend
                            await UserOTPVerification.deleteMany({ userId });
                            sendOTPVerificationEmail({ _id: userId, email }, res);
                        }
                    } catch (error) {
                        res.json({
                            status: false,
                            message: error.message,
                        });
                    }

                } else if (result.length && trangThai === "lịch sử") {
                    // A user already exists
                    try {
                        const userId = result[0]._id;

                        if (!userId || !email) {
                            throw Error('Empty user details are not allowed');
                        } else {
                            // delete existing records and resend
                            await UserOTPVerification.deleteMany({ userId });
                            sendHistory({ _id: userId, email, ghe , soLuong }, res);
                        }
                    } catch (error) {
                        res.json({
                            status: false,
                            message: error.message,
                        });
                    }

                } else {
                    // Try to create new user
                    try {
                        const newUser = new User({
                            email,
                            verified: false,
                        });
                    
                        newUser
                            .save()
                            .then((result) => {
                                if (trangThai === "OTP") {
                                    sendOTPVerificationEmail(result, res);
                                } else if (trangThai === "lịch sử") {
                                    sendHistory(result, res);
                                } else {
                                    res.json({
                                        status: false,
                                        message: 'Invalid trangThai value!',
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    status: false,
                                    message: 'An error occurred while saving user account!',
                                });
                            });
                    }catch (error) {
                        res.json({
                            status: false,
                            message: 'An error occurred while hashing password!',
                        });
                    }
                    // password handling

                }
            })
            .catch((err) => {
                console.log(err)
                res.json({
                    status: false,
                    message: 'An error occurred while checking for existing user!',
                });
            })
    }
});

// PHƯỚC MẬP BÁO THỦ


const sendHistory = async ({ _id, email, ghe, soLuong }, res) => {
    try {
        
        // <b>${otp}</b>


        // mail options
        const mailOptions = {
            form: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Ghế: ${ghe}.</br>
            <p>Số lượng vé: ${soLuong}.</br>
            <p>This code <b>expires in 1 hour</b>.</p>`
        };

        // hash the otp
        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        // save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: true,
            message: 'Verification otp email sent',
            data: {
                userId: _id,
                email,
            },
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
}


//send otp verification email
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

        // mail options
        const mailOptions = {
            form: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process.</br>
            <p>This code <b>expires in 1 hour</b>.</p>`
        };

        // hash the otp
        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        // save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: true,
            message: 'Verification otp email sent',
            data: {
                userId: _id,
                email,
            },
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
}

// Verify otp email
router.post('/verifyOTP', async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error('Empty otp details are not allowed');
        } else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,

            });
            if (UserOTPVerificationRecords.length <= 0) {
                // no record found
                throw new Error(
                    "Account record doesn't exist or has been verified already. Please sign up or log in."
                )
            } else {
                // user otp record exists
                const { expiresAt } = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    // user otp record has expired
                    await UserOTPVerification.deleteMany({ userId });
                    throw new Error('Code has expired. Please request again.');
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);

                    if (!validOTP) {
                        // supplied otp wrong
                        throw new Error('Bạn nhập sai mã OTP. Vui lòng kiểm tra lại Email.');
                    } else {
                        // success
                        await User.updateOne({ _id: userId }, { verified: true });
                        await UserOTPVerification.deleteMany({ userId });
                        res.json({
                            status: true,
                            message: 'User email verified successfully.',
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
})

// resend verification
router.post('/resendOTPVerificationCode', async (req, res) => {
    try {
        let { userId, email } = req.body;

        if (!userId || !email) {
            throw Error('Empty user details are not allowed');
        } else {
            // delete existing records and resend
            await UserOTPVerification.deleteMany({ userId });
            sendOTPVerificationEmail({ _id: userId, email }, res);
        }
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
})

module.exports = router;