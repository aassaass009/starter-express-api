const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
const { hashSync, genSaltSync } = require("bcrypt");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const viewProfile = (req, res, next) => {
    try {
        const admintoken = req.headers.authorization;
        const token = admintoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_KEY);
        const id = decoded.id;

        Admin.findById(id)
            .then(respone => {
                res.header('Access-Control-Allow-Origin', '*');
                res.json({
                    respone
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured!'
                })
            })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
}

const signUp = async (req, res) => {
    try {
        const body = req.body;
        const isNewAdmin = await Admin.isThisEmailAdmin(body.email)
        if (!isNewAdmin) {
            return res.json({
                message: 'This email is already in use'
            })
        }

        const salt = genSaltSync(10);

        try {
            body.password = hashSync(body.password, salt);
        } catch (error) {
            res.json({
                message: "password error"
            })
        }

        let admin = new Admin({
            email: body.email,
            password: body.password,
        })
        admin.save()
            .then(response => {
                res.json({
                    message: "Sign up is successfully"
                })
            })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
}

const login = async (req, res, next) => {
    try {
        var email = req.body.email
        var password = req.body.password
        const isNewAdmin = await Admin.isThisEmailAdmin(email)
        if (isNewAdmin) {
            return res.json({
                message: 'email or password is invalid'
            })
        }
        Admin.findOne({ $or: [{ email: email }, { password: password }] })
            .then(admin => {
                if (admin) {
                    bcrypt.compare(password, admin.password, function (err, result) {
                        if (err) {
                            res.json({
                                error: err
                            })
                        }

                        if (result) {
                            let token = jwt.sign({ email: admin.email, id: admin._id }, process.env.JWT_KEY)
                            res.json({
                                message: 'Login Successful!',
                                token: token,
                            })
                        } else {
                            res.json({
                                message: "email or password is invalid"
                            })
                        }
                    })
                } else {
                    res.json({
                        message: 'No Admin'
                    })
                }
            })
    } catch (error) {
        res.json({
            message: "Error"
        })
    }
}


module.exports = {
    viewProfile, signUp, login
}