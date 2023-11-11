import Image from "next/image"
import AuthForm from "./components/AuthForm"
export default function Home() {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
            alt="logo" 
            width="48"
            height="48"
            className="mx-auto"
            src="/images/next-js-svgrepo-com.svg"
            />
            <h2 className="mt-6 text-center text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>
        <AuthForm />
      </div>
    )
  }
  