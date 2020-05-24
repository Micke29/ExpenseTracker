import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    async function signupUser(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/auth/signup', user, config)

            dispatch({
                type: 'SIGNUP_USER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function loginUser(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/auth/login', user, config)

            dispatch({
                type: 'LOGIN_USER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }
    }

    async function getTransactions() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${sessionStorage.getItem('token')}`
            }
        }

        try {
            const res = await axios.get(`/api/v1/transactions/${sessionStorage.getItem('userId')}`, config)

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            console.error(err.response.data.error)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        const config = {
            headers: {
                'Authorization': `token ${sessionStorage.getItem('token')}`
            }
        }

        try {
            await axios.delete(`/api/v1/transactions/${sessionStorage.getItem('userId')}/${id}`, config)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${sessionStorage.getItem('token')}`
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        signupUser,
        loginUser,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}