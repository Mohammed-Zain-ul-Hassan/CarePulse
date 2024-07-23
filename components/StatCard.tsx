import clsx from 'clsx';
import Image from 'next/image';
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
            <div className='flex items-center gap-4'>
                <Image
                    src = {icon}
                    height = {32}
                    width = {32}
                    alt = {label}
                    className='size-8 w-fit'
                />
                <h2 className='text-32-bold text-white'>{count}</h2>
            </div>

            <p>{label}</p>
        </div>
    )
}

export default StatCard