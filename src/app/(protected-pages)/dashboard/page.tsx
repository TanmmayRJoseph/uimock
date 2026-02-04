import React from 'react'
import { logout } from '@/actions/authActions';
export default function Dashboard() {
    return (
        <div>dashboard page
            <button onClick={logout}>logout</button>
        </div>
    )
}
