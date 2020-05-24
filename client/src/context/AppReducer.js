export default (state, action) => {
    switch (action.type) {
        case 'SIGNUP_USER':
            sessionStorage.setItem('userId', action.payload.userId)
            sessionStorage.setItem('token', action.payload.token)

            return {
                ...state,
                loading: false
            }
        case 'LOGIN_USER':
            sessionStorage.setItem('userId', action.payload.userId)
            sessionStorage.setItem('token', action.payload.token)

            return {
                ...state,
                loading: false
            }
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'USER_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}