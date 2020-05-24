const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions')

router
    .route('/:userId')
    .get(auth, getTransactions);

router
    .route('/')
    .post(auth, addTransaction);

router
    .route('/:userId/:id')
    .delete(auth, deleteTransaction);

module.exports = router