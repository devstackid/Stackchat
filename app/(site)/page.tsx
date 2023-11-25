'use client'
import Image from "next/image"
import AuthForm from "./components/AuthForm"
import { useCallback, useEffect, useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'HOME' | 'AUTH'
export default function Home() {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('HOME');

  useEffect(()=> {
    if (session?.status == 'authenticated'){
        router.push('/users')
    }
}, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if(variant == 'HOME'){
        setVariant('AUTH');
    } else {
        setVariant('HOME');
    }
  }, [variant]);
  
    return (
      <>
        {variant == 'AUTH' && (
            <div className="w-full block lg:flex h-screen overflow-y-scroll lg:overflow-hidden relative">
              <div className="w-[40%] lg:inline hidden bg-gradient-to-b relative from-indigo-500 to-blue-300 p-8">
                <div className="flex items-center gap-2 mb-10">
                  <IoMdChatbubbles size={40} className="text-white"/> 
                  <h1 className="text-xl font-light text-white">STACKCHAT</h1>
                </div>
                <div>
                  <h2 className="text-xl font-light text-white mb-5">Buat percakapan</h2>
                  <p className="block text-white text-sm w-full lg:w-[350px]">Mulai mengobrol dengan orang-orang yang mungkin anda kenal atau berkenalan dengan orang baru</p>
                </div>
                <div className="absolute bottom-0 z-40 left-3 right-3">
                  <Image 
                    alt="Image"
                    width="450"
                    height="500"
                    src="/images/2.png"
                  />
                </div>
                <div className="absolute bottom-28 z-20 left-5 right-5">
                  <Image 
                    alt="Image"
                    width="500"
                    height="500"
                    src="/images/3.png"
                  />
                </div>
                <div className="absolute bottom-28 z-30 right-4">
                  <Image 
                    alt="Image"
                    width="300"
                    height="500"
                    src="/images/1.png"
                  />
                </div>
                <div className="absolute -bottom-10 z-50 right-3 shadow-md rounded-xl overflow-hidden">
                  <Image 
                    alt="Image"
                    width="150"
                    height="150"
                    src="/images/4.png"
                  />
                </div>
                
              </div>

              {/* Form */}
              <div className="w-full lg:w-[60%] bg-white pt-10 lg:pt-20 px-10 lg:px-20 pb-5">
                <div className="lg:hidden block w-full text-center mb-10">
                  <IoMdChatbubbles size={70} className="text-blue-900 mx-auto lg:hidden"/>
                  <h2 className="text-xl font-extrabold text-gray-800 mb-3">Buat percakapan</h2>
                  <p className="block text-gray-500 text-sm w-full lg:w-[350px]">Mulai mengobrol dengan orang-orang yang mungkin anda kenal atau berkenalan dengan orang baru</p>
                </div>
                <AuthForm />
              </div>                
              
            </div>    
        )}

        {/* Portofolio */}
        {variant == 'HOME' && (
          <div className="w-full bg-gray-100">
            <div className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between p-5 border-b lg:border-none">
              <div className="flex items-center gap-1">

                <h1 className="text-xl font-extrabold text-black">Devstack.id</h1>
              </div>
              <button onClick={toggleVariant} className='bg-indigo-500 text-sm font-bold text-white px-3 py-2'>
                        {variant == 'HOME' ? 'Login' : 'Login'}
                    </button>
              
            </div>

            <div className="w-full pt-40 h-screen flex justify-center bg-white relative overflow-hidden border-b">
              <div className="z-30">
                <h1 className="text-3xl lg:text-7xl font-extrabold text-gray-800 mb-3 text-center"><span className="text-indigo-500">Welcome</span>, to Stackchat</h1>
                <p className="text-sm font-light text-gray-700 text-center w-full px-5 lg:px-0 lg:w-[600px] mx-auto">
                  Stackchat adalah sebuah platform berpesanan online berbasis website yang dibangun menggunakan berbagai teknologi website modern
                </p>
                

              </div>
              
                <div className="absolute -bottom-72 lg:-bottom-60 z-20 right-30">
                  <Image 
                    alt="Image"
                    width="400"
                    height="400"
                    src="/images/4.png"
                  />
                </div>
            </div>

            <section className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
              <h1 className="text-base font-bold text-gray-800 text-center mb-5">Mengobrol atau berkenalan</h1>
              <div className="p-2 border shadow">
              <Image 
                    alt="Image"
                    width="600"
                    height="600"
                    src="/images/2.png"
                  />
              </div>
            
            </section>
            <section className="w-full h-screen bg-white flex flex-col items-center justify-center p-5">
            <h1 className="text-base font-bold text-gray-800 text-center mb-5">Berdiskusi melalui percakapan grup</h1>
              <div className="p-2 border shadow">
              <Image 
                    alt="Image"
                    width="600"
                    height="600"
                    src="/images/1.png"
                  />
              </div>
            
            </section>
            <section className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
            <h1 className="text-base font-bold text-gray-800 text-center mb-5">Sekadar mengobrol dengan teman, keluarga, dan pasanganmu</h1>
              <div className="p-2 border shadow">
              <Image 
                    alt="Image"
                    width="600"
                    height="600"
                    src="/images/3.png"
                  />
              </div>
            
            </section>

            <section className="w-full h-screen bg-white flex flex-col items-center justify-center p-5">
              <div className="lg:flex items-center gap-4">
                <div className=" rounded-full w-max mx-auto overflow-hidden">
                <Image 
                      alt="Image"
                      width="100"
                      height="100"
                      src="/images/5.jpg"
                    />
                </div>
                <div>
                  <p className="text-base text-center mt-3 lg:mt-0 lg:text-start font-bold text-gray-800 w-full lg:w-[500px]">&quot;It`s was not easy to be a Fullstack, keep it grow and show the world that you can to be a winner!&quot;</p>
                </div>

              </div>
            
            </section>
            <section className="w-full bg-white border-t flex items-center justify-center p-5">
              <h1 className="text-center text-sm font-bold text-gray-800">Copyright, 2023 @devstack.id</h1>
            
            </section>
            
          </div>
        )}


      </>
    )
  }
  