import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({
        username: '', password: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/login/', form)
            setMessage('Login Success')

            if (onLogin) {
                onLogin(response.data.token, response.data.user_id)
            }
        } catch (error) {
            setMessage('login failed')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>Username</label>
                <input
                    type="text"
                    name='username'
                    value={form.username}
                    onChange={handleChange}
                />

                <label>Password</label>
                <input
                    type="password"
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                />

                <button>
                    Login
                </button>

                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default LoginForm