// MongoDB Input Error
module.exports = function userValidationError(err, res) {
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message)

        return res.status(400).json({
            success: false,
            error: messages
        })
    } else {
        return res.status(500).json({
            success: false,
            error: 'Server Error during Validation'
        })
    }
}