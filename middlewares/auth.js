const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        let param

        if (req.method === 'POST') {
            param = req.body
        } else {
            param = req.params
        }

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.USER_TOKEN)
        const userId = decodedToken.userId
        if (param.userId && param.userId !== userId) {
            res.status(400).json({
                success: false,
                error: 'Invalid User ID'
            })
        } else {
            next()
        }
    } catch {
        res.status(400).json({
            success: false,
            error: 'Invalid request !'
        })
    }
}