const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions')

router
    .route('/')
    .get(auth, getTransactions)
    .post(auth, addTransaction);

router
    .route('/:id')
    .delete(auth, deleteTransaction);

module.exports = router