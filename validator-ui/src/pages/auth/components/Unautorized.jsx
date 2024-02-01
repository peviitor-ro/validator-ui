import React from 'react'
import broken_racket from '../../assets/svgs/broken_racket.svg'

export default function Unautorized() {
    return (
        <div className="flex flex-col items-center justify-center h-screen transform translate-y-[-30%]">
            <img src={broken_racket} alt="broken_rocket" width="320" height="320" />
            <div className="
              flex
              flex-col
              items-center
              bg-[#f1f3f6]
              rounded-lg shadow-xl
              p-4
            ">
                <h1 className="text-3xl font-bold">Unauthorized</h1>
                <p className="text-xl">You are not authorized to access this page.</p>
            </div>
        </div>
    )
}
