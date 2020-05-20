const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (req.body.userId === undefined || req.headers.authorization === undefined) {
            res.status(400).json({
                success: false,
                error: 'Invalid User ID'
            })
        } else {
            const token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.USER_TOKEN)
            const userId = decodedToken.userId
            if (req.body.userId && req.body.userId !== userId) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid User ID'
                })
            } else {
                next()
            }
        }
    } catch {
        res.status(400).json({
            success: false,
            error: 'Invalid request !'
        })
    }
}