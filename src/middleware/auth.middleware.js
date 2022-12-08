const jwt = require('jsonwebtoken')
const User = require("../../models").users

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt.verify(token, process.env.JWT_pa)

 

        if (!token) {
            return res.status(401).send({
                statusCode: "401",
                success: false,
                message: "Error",
                error: 'Token not provided'
            })
        }
  

        const authUser = await User.findOne({
            where: {
                email: decoded.email,
                remember_token: token
               }
        })

        if (authUser) {
            req.token = token
            req.user = authUser
            next()
        }else{
            return res.status(401).send({
                statusCode: "401",
                success: false,
                message: "Error",
                error: 'Invalid token provided'
            })   
        }

    } catch (e) {
        if (e == "JsonWebTokenError: invalid token"){
            return res.status(401).send({
                statusCode: "401",
                success: false,
                message: "Error",
                error: 'Invalid token provided'
            })
        }
        
        return res.status(401).send({
            statusCode: "401",
            success: false,
            message: "Error",
            error: 'Please Autheticate with token'
        })
    }

}

module.exports = auth