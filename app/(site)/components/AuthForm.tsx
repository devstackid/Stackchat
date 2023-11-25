'use client'
import Input from '@/app/components/inputs/Input';
import { useEffect, useState} from 'react'
import { useCallback } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        if (session?.status == 'authenticated'){
            router.push('/users')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if(variant == 'LOGIN'){
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant == 'REGISTER'){
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(()=> toast.error('Something went wrong!'))
            .finally(()=> setIsLoading(false))
        }

        if(variant == 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback)=>{
                if (callback?.error){
                    toast.error('Invalid Credentials')
                }

                if(callback?.ok && !callback?.error){
                    toast.success('Logged in!')
                    router.push('/users')
                }
            })
            .finally(()=>setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, {redirect: false})
        .then((callback)=>{
            if(callback?.error){
                toast.error('Invalid Credentials')
            }

            if(callback?.ok && !callback?.error){
                toast.success('Logged in!')
            }
        })
        .finally(() => setIsLoading(false))
    }

  return (
    <div className=''>
        <h1 className='text-base lg:text-xl font-bold text-gray-800 mb-3 lg:mb-10 hidden lg:block'>Masuk ke Stackchat</h1>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant == 'REGISTER' && (
                    <Input id='name' label='Nama' register={register} errors={errors} />
                )}
                <Input id='email' label='Email' type='email' register={register} errors={errors} />
                <Input id='password' label='Kata sandi' type='password' register={register} errors={errors} />
                <div>
                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant == 'LOGIN' ? 'Login' : 'Register'}
                    </Button>
                </div>
            </form>
            <div className="mt-3 lg:mt-6">
                <div className="relative">
                    
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or
                        </span>
                    </div>

                    <div className="mt-3 lg:mt-6 z-30 flex gap-2">
                        
                        <AuthSocialButton
                            icon={FcGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant == 'LOGIN' ? `New to Stackchat?` : 'Already have an account?'}
                    </div>
                    <div onClick={toggleVariant} className='underline cursor-pointer font-medium'>
                        {variant == 'LOGIN' ? 'Register now' : 'Login'}
                    </div>
                </div>

            </div>
    </div>
  )
}

export default AuthForm
