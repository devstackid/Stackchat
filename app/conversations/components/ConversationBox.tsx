'use client'

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation,Message,User } from '@prisma/client'
import {format} from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/app/types'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}


const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(()=>{
        const messages = data.messages || []

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(()=>{
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(()=>{
        if(!lastMessage){
            return false
        }

        const seenArray = lastMessage.seen || []

        if(!userEmail){
            return false
        }

        return seenArray.filter((user)=>user.email == userEmail).length != 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(()=>{
        if(lastMessage?.image){
            return 'Sent an image'
        }

        if (lastMessage?.body){
            return lastMessage.body
        }

        return 'Started a conversation'
    }, [lastMessage])

  return (
    <div onClick={handleClick}
        className={clsx(`
        w-full
        relative
        flex
        mb-1
        items-center
        space-x-3
        border-b
        p-3
        hover:bg-gray-300
        hover:rounded-xl
        transition
        cursor-pointer
        `,
            selected ? 'bg-indigo-500 rounded-xl' : 'bg-gray-100'
        )}
    >
        {data.isGroup ? (
            <AvatarGroup users={data.users} />
        ) : (
            <Avatar user={otherUser} />
        )}
        
        <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
                <div className="flex justify-between items-center mb-1">
                    <p className={clsx(`
                        text-md font-medium text-gray-900
                    `,
                    selected ? 'text-white' : 'text-black font-medium'
                    )}>
                        {data.name || otherUser.name}
                    </p>
                    {lastMessage?.createdAt && (
                        <p className='text-xs text-black font-normal'>
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <p className={clsx(`
                    truncate
                    text-sm
                    text-black
                `,
                    selected ? 'text-white' : 'text-black font-medium',
                    hasSeen ? 'text-black' : 'font-bold'
                )}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ConversationBox