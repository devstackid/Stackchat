'use client'
import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem'
import { User } from '@prisma/client'
import Avatar from '../Avatar'
import SettingsModal from './SettingsModal'

import { IoMdChatbubbles } from "react-icons/io";

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <SettingsModal 
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
      />
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 xl:px-6 lg:overflow-y-auto lg:bg-white my-2 ml-2 rounded-xl shadow lg:pb-4 lg:flex lg:flex-col justify-between'>
        
        <nav className='mt-4 flex flex-col justify-between'>
        <div className='mb-5'>
          <div className='flex items-center justify-start gap-1 mb-8'>
            <div className='w-2 h-2 bg-red-500 rounded-full'></div>
            <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
          </div>
          <div className='flex items-center gap-3 border-b pb-5 pr-10'>
            <IoMdChatbubbles size={35} className="text-indigo-500"/>
            <h1 className='text-sm font-bold text-gray-800'>Stackchat</h1>
          </div>
        </div>
        <ul role='list' className='block space-y-1'>
          {routes.map((item) => (
            <DesktopItem 
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
        </nav>
        <nav className="mt-4 flex flex-col">
          <div className='border-b mb-3 pb-3 block w-full'>
            <span className='text-sm font-bold text-gray-500'>Profile</span>
          </div>
          <div
            onClick={()=>setIsOpen(true)}
            className='
              flex items-center gap-3
              cursor-pointer
              hover:opacity-75
              transition
            '
          >
            <Avatar user={currentUser} />
            <span className='text-xs font-medium text-gray-700 capitalize border-b'>{currentUser.name}</span>
          </div>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar