import clsx from 'clsx';
import React from 'react'

interface StatCardProps{
    count : number;
    label : string;
    icon : string;
    type : 'appointments' | 'pending' | 'cancelled';
}

const StatCard = (props : StatCardProps) => {
    const {count = 0 , label , icon , type} = props;
    return (
        <div className={clsx('stat-card' , {
            'bg-appointments': type === 'appointments',
            'bg-pending' : type === 'pending',
            'bg-cancelled' : type === 'cancelled'
        })}>
            test
        </div>
    )
}

export default StatCard