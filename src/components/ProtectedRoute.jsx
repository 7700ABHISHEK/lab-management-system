import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate("/login");
            return;
        }
    }, [])

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute