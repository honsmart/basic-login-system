require("dotenv").config();
const User = require("../../models").users
const Profile = require("../../models").profiles;
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Base64.parse("4gt71TxD1e4P3433");
var iv = CryptoJS.enc.Base64.parse("4gt71TxD1e4P3433");
exports.Login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body


        if (!email) {
            return res.send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'email is required'
            })
        }

        if (!password) {
            return res.send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'password is required'
            })
        }
        const user = await User.findOne({
            where: {
                email
            },
        })
        if (!user) {
            return res.send({
                statusCode: "404",
                success: false,
                message: 'Error',
                error: 'An account doesn\'t exist with this email'
            })
        }
        // var encrypted = CryptoJS.AES.encrypt(password, key, {iv: iv});

        var decrypted = (CryptoJS.AES.decrypt(user.password, key, {
            iv: iv
        })).toString(CryptoJS.enc.Utf8);
        const match = decrypted === password;

        if (!match) {
            return res.send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Invalid password'
            })
        }


        const token = jwt.sign({
            email
        }, process.env.JWT_pa) //will change it to .env variable for production

        const saveToken = await User.update({
            remember_token: token
        }, {
            where: {
                email
            }
        })



        if (saveToken) {
            req.session.data = {
                token
            }
            return res.status(200).send({
                statusCode: "200",
                success: true,
                message: 'Success',
                token: token,
                error: undefined
            })
        } else {
            return res.send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'An error ocurred, try again later',
            })
        }

    } catch (e) {
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "Error",
            error: e.message
        })
    }
};
