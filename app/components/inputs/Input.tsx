'use client'
import clsx from 'clsx'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label, id, type, required, register, errors, disabled
}) => {
  return(
    <div>
      <label htmlFor={id} className='block text-xs lg:text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <div className="mt-1 lg:mt-2">
        <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, {required})} className={clsx(`
        form-input
        block 
        w-full 
        lg:rounded-md 
        border-0
        px-0
        lg:px-2
        lg:border-b-0
        border-b
        focus:ring-0
        py-1.5 
        text-gray-900 
        lg:shadow-sm 
        lg:ring-1 
        lg:ring-inset 
        lg:ring-gray-300 
        placeholder:text-gray-400 
        lg:focus:ring-2 
        lg:focus:ring-inset 
        lg:focus:ring-sky-600 
        sm:text-sm 
        sm:leading-6`, 
        errors[id] && "focus:ring-rose-500", 
        disabled && "opacity-50 cursor-default")} />
      </div>
    </div>
  )
}
 export default Input