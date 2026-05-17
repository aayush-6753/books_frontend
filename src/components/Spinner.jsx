import React from 'react'

const Spinner = () => {
    return (
        <div className='flex justify-center py-10'>
            <div className='inline-block h-16 w-16 animate-spin rounded-full border-4 border-[rgba(246,48,73,0.2)] border-t-[var(--tone-mint)]' />
        </div>
    )
}

export default Spinner
