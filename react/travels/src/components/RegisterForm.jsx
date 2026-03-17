import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '', email: '', password: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setMessage('Registration successful')
        } catch (error) {
            setMessage('Registration failed')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <label>Username</label>
                <input
                    type="text"
                    name='username'
                    value={form.username}
                    onChange={handleChange}
                />

                <label>Email</label>
                <input
                    type="email"
                    name='email'
                    value={form.email}
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
                    Register
                </button>

                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default RegisterForm