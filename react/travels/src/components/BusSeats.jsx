import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])

    const { busId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`http://127.0.0.1:8000/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
            } catch (error) {
                console.log('Error in fetching details', error)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async (seatId) => {
        if (!token) {
            alert('Please login')
            navigate('/login')
            return
        }

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/booking/",
                { seat: seatId },
                { headers: { Authorization: `Token ${token}` } }
            )

            alert("Booked!")

            setSeats(prev =>
                prev.map(seat =>
                    seat.id === seatId ? { ...seat, is_booked: true } : seat
                )
            )
        } catch (error) {
            alert("Booking failed")
        }
    }

    return (
        <div>
            {bus && (
                <div>
                    <h2>{bus.bus_name}</h2>
                    <p>{bus.origin} → {bus.destination}</p>
                </div>
            )}

            <div>
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        onClick={() => handleBook(seat.id)}
                        style={{color:seat.is_booked? 'red':'green'}}
                    >
                        {seat.seat_number} {seat.is_booked ? "(Booked)" : ""}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BusSeats