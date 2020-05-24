import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import '../styles/App.css';

import { GlobalContext } from '../context/GlobalState'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const { loginUser } = useContext(GlobalContext)

    const spanStyle = {
        padding: 5,
        color: '#f44336',
        backgroundColor: '#ffdddd',
    }

    const onSubmit = async e => {
        e.preventDefault()

        const User = {
            username,
            password
        }

        await loginUser(User)

        if (sessionStorage.getItem('userId')) {
            if (error) setError(false)
        } else {
            setPassword('')
            setError(true)
        }
    }

    return (
        <>
            {sessionStorage.getItem('userId') && <Redirect to="/" />}
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
                </div>
                <div className="form-control" style={{ marginBottom: 15 }}>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                {error && <span style={spanStyle}>Error with ID and/or password</span>}
                <button className="btn">Login</button>
            </form>
            <Link to="/signup">No account ? Sign up</Link>
        </>
    )
}

export default Login
