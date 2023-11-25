import Image from 'next/image'
import Link from 'next/link'
import { FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import React from 'react'

const EmptyState = () => {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 bg-white rounded-xl shadow h-full flex flex-col items-center justify-center'>
        <div className="">
          <h1 className='text-3xl font-bold text-gray-800'>Hi, Selamat datang di <span className='font-extrabold text-indigo-500'>Stackchat</span></h1>
          <p className='text-sm text-gray-500'>Lihat obrolan terakhir atau mulai percakapan baru</p>
          <div className='mt-3 flex items-start gap-2'>
          <Image
          alt='Author'
          width="80"
          height="80"
          className='rounded-full border'
          src="/images/author.png"
          />
          <div>
            <p className='text-sm font-medium w-[350px] leading-wide mb-2 text-gray-500'>
              &quot;Terimakasih sudah menggunakan aplikasi ini, anda dapat memberikan tanggapan jika terdapat bug dalam penggunaan platform ini.&quot; <span className='not-italic text-black font-bold'>~ Devstack.Id</span>
            </p>
            <div className='flex items-center gap-2'>
              <Link href="https://wa.me/62895631780343" className='shadow p-3 rounded-xl'>
                <FaWhatsapp className='text-green-600'/>
              </Link>
              <Link href="https://www.instagram.com/dyyyynn_/" className='shadow p-3 rounded-xl'>
                <FiInstagram className='text-pink-600'/>
              </Link>
            </div>
          </div>

        </div>
        </div>
        
    </div>
  )
}

export default EmptyState