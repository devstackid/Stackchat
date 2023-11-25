'use client';

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import clsx from "clsx";
import { find, uniq } from 'lodash';

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import GroupChatModal from "./GroupChatModal";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/app/types";
import { FaSearch } from "react-icons/fa";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id == conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation
      }))
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id != conversation.id)]
      })

      if(conversation.id == conversation.id){
        router.push('/conversations')
      }
    }
    
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }

  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal 
        users={users} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
      <aside className={clsx(`
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
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
              Obrolan <span className='block text-xs font-normal text-gray-500'>Ketuk untuk membuka obrolan</span>
            </div>
            
            <div 
              onClick={() => setIsModalOpen(true)} 
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <FaUserPlus size={20} />
            </div>
          </div>
          <div className='flex items-center justify-start gap-2 py-2 px-3 rounded-xl bg-gray-200 mb-3'>
                    <FaSearch size={20} />
                    <input type="text" placeholder='Search' className='bg-transparent text-xs ring-0 p-2 outline-none' />
                </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
   );
}
 
export default ConversationList;