import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BusList = () => {
    const [buses, setBuses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/buses/")
                setBuses(response.data)
            } catch (error) {
                console.log('error in fetching buses')
            }
        }
        fetchBuses()
    }, [])

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`)
    }

    return (
        <div>
            <h1>Available Buses</h1>

            <div>
                {buses.map((item) => (
                    <div key={item.id}>
                        <h2>{item.bus_name}</h2>

                        <p>Bus No: {item.number}</p>
                        <p>From: {item.origin}</p>
                        <p>To: {item.destination}</p>

                        <div>
                            <span>{item.start_time}</span>
                            <span>{item.reach_time}</span>
                        </div>

                        <button onClick={() => handleViewSeats(item.id)}>
                            View Seats
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BusList