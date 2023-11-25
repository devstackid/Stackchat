import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import {HiChat} from 'react-icons/hi'
import {
    HiArrowLeftOnRectangle,
    HiUser

} from 'react-icons/hi2'
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { CiCamera } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";

const useRoutes = () => {
    const pathname = usePathname()
    const {conversationId} = useConversation()

    const routes = useMemo(()=> [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname == '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUser,
            active: pathname == '/users'
        },
        {
            label: 'Status',
            href: '/users',
            icon: CiCamera,
            active: pathname == '/stories'
        },
        {
            label: 'Panggilan',
            href: '/users',
            icon: FaPhoneVolume,
            active: pathname == '/logs'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes
