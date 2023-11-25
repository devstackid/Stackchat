'use client'
import clsx from "clsx"
import useConversation from "../hooks/useConversation"
import EmptyState from "../components/EmptyStateConversation"

const Home = () => {
    const {isOpen} = useConversation()

    return(
        <div
        className={clsx(`
        lg:pl-[30rem] py-3 pr-3 h-full lg:block
        `,
            isOpen ? 'block' : 'hidden'
        )}
        >
            <EmptyState />
        </div>
    )
}

export default Home