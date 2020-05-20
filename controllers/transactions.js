const Transaction = require('../models/Transaction')
const userValidationError = require('../middlewares/userValidationError')

/**
 * @desc    Get all transactions
 * @route   GET /api/v1/transactions
 * @access  Private
 */
exports.getTransactions = async (req, res, next) => {
    if (req.body.userId === undefined) {
        return res.status(401).json({
            success: false,
            error: 'Invalid User ID'
        })
    }
    try {
        const transactions = await Transaction.find({ userId: req.body.userId })

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

/**
 * @desc    Add transaction
 * @route   POST /api/v1/transactions
 * @access  Private 
 */
exports.addTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create(req.body)

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        userValidationError(err, res)
    }
}

/**
 * @desc    Delete transaction
 * @route   DELETE /api/v1/transactions/:id
 * @access  Private
 */
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        if (transaction.userId !== req.body.userId) {
            return res.status(401).json({
                success: false,
                error: 'Invalid User ID'
            })
        }

        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}