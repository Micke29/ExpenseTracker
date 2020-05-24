import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import '../styles/App.css';

import { GlobalContext } from '../context/GlobalState'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const { signupUser } = useContext(GlobalContext)

    const spanStyle = {
        padding: 5,
        color: '#f44336',
        backgroundColor: '#ffdddd',
    }

    function passwordCheck() {
        if (password !== verifyPassword) setPasswordError(true)
        else setPasswordError(false)
    }

    async function onSubmit(e) {
        e.preventDefault()

        passwordCheck()
        if (!passwordError) {
            const User = {
                username,
                password
            }

            await signupUser(User)

            if (!sessionStorage.getItem('userId')) setUsernameError(true)
            else setUsernameError(false)
        }
    }

    return (
        <>
            {sessionStorage.getItem('userId') && <Redirect to="/" />}
            <h3>Signup</h3>
            <form onSubmit={onSubmit} style={{ marginBottom: 15 }}>
                <div className="form-control" style={{ marginBottom: 15 }}>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
                </div>
                {usernameError && <span style={spanStyle}>This username already exists</span>}
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                <div className="form-control" style={{ marginBottom: 15 }}>
                    <label htmlFor="password">Verify Password</label>
                    <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required placeholder="Password" />
                </div>
                {passwordError && <span style={spanStyle}>Passwords doesn't match</span>}
                <button className="btn">Signup</button>
            </form>
            <Link to="/signup">Already have an account ? Log in</Link>
        </>
    )
}

export default Signup
