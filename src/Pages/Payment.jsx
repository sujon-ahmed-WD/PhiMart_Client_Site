import React from 'react';
import { Link } from 'react-router';

const Payment = () => {
    return (
        <div>
            Payment success return to <Link to="/dashboard">Dashboard</Link>
        </div>
    );
};

export default Payment;