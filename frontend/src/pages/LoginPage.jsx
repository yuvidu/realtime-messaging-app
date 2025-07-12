import React ,{useState} from 'react'
import { Mail, MessageSquare,Lock, EyeOff,Eye} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'



const LoginPage = () => {

  const [showpassword,setshowpassword] = useState(false);
  const [formdata,setformdata] = useState({
    email: '',
    password: '',
  })

  const{Logging,isLoggingIn} = useAuthStore()
 
  const handlelogging = async(e) => {
    e.preventDefault();
    try {
      await Logging(formdata);

      
    } catch (error) {
      console.error("Error during logging in:", error);
      toast.error("Failed to log in. Please try again.");
    }
  }



  return (
  <div className='min-h-screen grid lg:grid-cols-2'>
   <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8 mt-1'>
            <div className='flex flex-col items-center gap-2 group'>

              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>logging account</h1>
              <p className='text-base-content/60'>logging to your account to start chatting</p>

            </div>
          </div>
          <form onSubmit={handlelogging} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>E-mail</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input 
                  type='text' 
                  placeholder='Enter your full name' 
                  className='input input-bordered w-full pl-10 z-0' 
                  value = {formdata.email}
                  onChange={(e) => setformdata({...formdata, email: e.target.value})}
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
                  type = {showpassword ? 'text':'password'} 
                  placeholder='Enter your password' 
                  className='input input-bordered w-full pl-10 z-0' 
                  value = {formdata.password}
                  onChange={(e) => setformdata({...formdata, password: e.target.value})}
                />
                <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=> setshowpassword(!showpassword)}
                >
                 {showpassword? (<EyeOff className='size-5 text-base-content/40 z-10'/>):(<Eye className='size-5 text-base-content/40 z-10'/>)}  
                </button>
              </div>
            </div>

            <button type="submit" className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn?(
                <span className="loading loading-dots loading-xs"></span>

              ):("logging in")}

            </button>
            <div className='text-center'>
              <p className='text-base-content/60'>
              Dont have an account  {"   "}
              <Link to="/signup" className="link link-primary">
                Signup
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

export default LoginPage
