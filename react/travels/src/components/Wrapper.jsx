import React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children }) => {
    return (
        <div>
            <div>
                <h1>Bus Travels</h1>

                {token ? (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                )}
            </div>

            <main>{children}</main>
        </div>
    )
}

export default Wrapper