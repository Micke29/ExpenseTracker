const User = require('../models/User')
const userValidationError = require('../middlewares/userValidationError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @desc    Register user
 * @route   POST /api/v1/auth
 * @access  Public
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            })
            user.save()
                .then(() => {
                    User.findOne({ username: req.body.username })
                        .then(user => {
                            res.status(200).json({
                                data: {
                                    userId: user._id,
                                    token: jwt.sign(
                                        { userId: user._id },
                                        process.env.USER_TOKEN,
                                        { expiresIn: '2h' }
                                    )
                                }
                            })
                        })
                        .catch(() => res.status(500).json({
                            success: false,
                            error: 'Server Error'
                        }))
                }
                    /*() => res.status(201).json({
                    success: true,
                    data: {}
                })*/)
                .catch(err => {
                    userValidationError(err, res)
                })
        })
        .catch(err => res.status(500).json({
            success: false,
            error: 'Server Error during Signup'
        }))
}

/**
 * @desc    Connect user
 * @route   POST /api/v1/auth
 * @access  Public
 */
exports.login = (req, res, next) => {
    return console.log(req.headers.authorization)
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(204).json({
                    success: false,
                    error: 'Unknown User or Wrong Password !'
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(204).json({
                            success: false,
                            error: 'Unknown User or Wrong Password !'
                        })
                    }
                    res.status(200).json({
                        data: {
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                process.env.USER_TOKEN,
                                { expiresIn: '2h' }
                            )
                        }
                    })
                })
                .catch(() => res.status(500).json({
                    success: false,
                    error: 'Server Error'
                }))
        })
        .catch(() => res.status(500).json({
            success: false,
            error: 'Server Error'
        }))
}