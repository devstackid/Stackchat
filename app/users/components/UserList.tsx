'use client'
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'
import { FaSearch } from "react-icons/fa";

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({
    items
}) => {
  return (
    <aside className='
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-56
        lg:w-80
        lg:block
        bg-gray-100
        overflow-y-auto
        my-3
        block
        w-full
        left-0
    '>
        <div className='px-5'>
            <div className="flex-col mb-5">
                <div className="text-2xl font-bold text-neutral-800 py-4">
                    Discover <span className='block text-xs font-normal text-gray-500'>Mulai obrolan dengan orang yang mugkin anda kenal</span>
                </div>
                <div className='flex items-center justify-start gap-2 py-2 px-3 rounded-xl bg-gray-200'>
                    <FaSearch size={20} />
                    <input type="text" placeholder='Search' className='bg-transparent text-xs ring-0 p-2 outline-none' />
                </div>
            </div>
            {items.map((item) => (
                <UserBox 
                    key={item.id}
                    data={item}
                />
            ))}
        </div>
    </aside>
  )
}

export default UserList