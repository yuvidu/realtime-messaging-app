import React from 'react'
import { useState } from 'react'
import { Mail, MessageSquare, User,Lock, EyeOff,Eye} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast } from 'react-hot-toast'

const SignUpPage = () => {

  const [showPassword, setPassword] = useState(false);
  const [showformdata , setShowFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const{Signup,isSigningUp} = useAuthStore()
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullnameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces

  const validateForm = () => {
    if(!showformdata.fullName.trim()) return toast.error("Full name is required");
    if(!showformdata.email.trim()) return toast.error("email is required");
    if(!showformdata.password.trim()) return toast.error("Password is required");
    if(!emailRegex.test(showformdata.email)) return toast.error("email needs to be valid");
    if(!fullnameRegex.test(showformdata.fullName)) return toast.error("Full name can only contain letters and spaces")
      return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formvalidationresult = validateForm();
    if(formvalidationresult) {

      Signup(showformdata)

    }
  }


  
  


  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side */} 
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>

              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>create account</h1>
              <p className='text-base-content/60'>Create your account to start chatting</p>

            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input 
                  type='text' 
                  placeholder='Enter your full name' 
                  className='input input-bordered w-full pl-10 z-0' 
                  value={showformdata.fullName} 
                  onChange={(e) => setShowFormData({...showformdata, fullName: e.target.value})}
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input 
                  type='text' 
                  placeholder='Enter your email' 
                  className='input input-bordered w-full pl-10 z-0' 
                  value={showformdata.email} 
                  onChange={(e) => setShowFormData({...showformdata, email: e.target.value})}
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input 
                  type= {showPassword ? 'text' : "password"} 
                  placeholder='Enter your password' 
                  className='input input-bordered w-full pl-10 z-0' 
                  value={showformdata.password} 
                  onChange={(e) => setShowFormData({...showformdata, password: e.target.value})}
                />
                <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>{setPassword(!showPassword)}}
                >
                  {showPassword? (<EyeOff className='size-5 text-base-content/40 z-10'/>):(<Eye className='size-5 text-base-content/40 z-10'/>)}
                </button>
              </div>
            </div>

            <button type="submit" className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp?(
                <span className="loading loading-dots loading-xs"></span>

              ):("create account")}

            </button>
            <div className='text-center'>
              <p className='text-base-content/60'>
              Already have an account  {"   "}
              <Link to="/login" className="link link-primary">
                login
              </Link>
              </p>
            </div>
          </form>
        </div>
      </div> 
      {/* Right side */} 
      <AuthImagePattern 
      title="join our community"
      subtitle = "join our community and start chatting with your friends and family"
      
      />     
    </div>
  )
}

export default SignUpPage
