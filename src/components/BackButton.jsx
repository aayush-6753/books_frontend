import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import React from 'react'

const BackButton = ({ destination = '/' }) => {
    return (
        <div className='flex'>
            <Link
                to={destination}
                className='btn-secondary inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-medium shadow-lg'
            >
                <BsArrowLeft className='text-2xl' />
                Back
            </Link>
        </div>
    )
}

export default BackButton