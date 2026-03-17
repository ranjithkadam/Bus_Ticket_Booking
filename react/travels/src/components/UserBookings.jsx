import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UserBookings = ({ token, userId }) => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token || !userId) return

            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user/${userId}/bookings/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                setBookings(response.data)
            } catch (error) {
                console.log("error")
            }
        }

        fetchBookings()
    }, [userId, token])

    return (
        <div>
            <h2>My Bookings</h2>

            {bookings.map((item, index) => (
                <div key={index}>
                    <p>Bus: {item.bus}</p>
                    <p>Seat: {item.seat}</p>
                    <p>{item.booking_time}</p>
                </div>
            ))}
        </div>
    )
}

export default UserBookings