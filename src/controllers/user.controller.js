require("dotenv").config();
const User = require("../../models").users
const CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Base64.parse("4gt71TxD1e4P3433");
var iv = CryptoJS.enc.Base64.parse("4gt71TxD1e4P3433");

exports.create = async (req, res) => {
    try {
        const {
            email,
            phone,
            username,
            password
        } = req.body

        if (!email) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'email is required'
            })
        }

        if (!phone) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'phone is required'
            })
        }

        if (!username) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'username is required'
            })
        }

        if (!password) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'password is required'
            })
        }

        const hashedpass = CryptoJS.AES.encrypt(password, key, {iv: iv}).toString();

        const createUser = {
            email,
            phone,
            username,
            password: hashedpass
        }

        const findEmail = await User.findOne({
            where: {
                email
            }
        })

        const findUsername = await User.findOne({
            where: {
                username
            }
        })

        if (findEmail) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'An account already exist with this email'
            })
        }
      

        if (findUsername) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'An account already exist with this username'
            })
        }
        
        const newUser = await User.create(createUser)


        if (newUser) {
            return res.status(201).send({
                statusCode: "201",
                success: true,
                message: 'Record created',
                user: newUser
            })
        } else {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: `unabale to create record, try again`
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "Error",
            error: e.message
        })
    }
}

exports.profile = async (req, res) => {
    try {
        const id = req.params['id'];


        if (!id) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Params id is required'
            })
        }


        const user = await User.findOne({
            where: {
                id
            }
        })
        

        if (user) {
            return res.status(200).send({
                statusCode: "200",
                success: true,
                message: 'Record fetched',
                user
            })
        } else {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: `Unabale to fetch data`
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "Error",
            error: e.message
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.destroy({
            where: {
                id
            }
        })
        

        if (user) {
            return res.status(200).send({
                statusCode: "200",
                success: true,
                message: 'Account deleted',
            })
        } else {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: `Unabale to dete account`
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "Error",
            error: e.message
        })
    }
}