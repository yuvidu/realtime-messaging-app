import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { LogOut, MessagesSquare, Settings,User } from 'lucide-react'


const Navbar = () => {

    const {Logout,isLoggingOut,authuser} = useAuthStore();
    
    const handleslogout = async (e) => {
      e.preventDefault();
      try {
        console.log("Logout button click");
        await Logout();
        console.log("Logout button clicked");
      } catch (error) {
        console.error("Error during logout:", error);
      }
      
    }


  return (
    <header className="bg-base-100 border-b border-b-gray-950 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto p-4 h-16">
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'> 
              <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                <MessagesSquare className='w-5 h-5 text-primary' />
              </div>
              <h1 className='text-lg font-bold'>
                ChatKom
              </h1>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <Link to={"/settings"} className='btn btn-sm gap-2 transition-colors'>
              <Settings className='w-4 h-4'/>
              <span className='hidden sm:inline'>Settings</span>
            </Link>
            { authuser && (
              <>
              <Link to={"/profile"} className='btn btn-sm gap-2'>
              <User className='w-4 h-4'/>
              <span className='hidden sm:inline'>Profile</span>
              </Link>
              <button className='btn btn-sm gap-2 transition-colors' onClick={handleslogout}>
              <LogOut className='w-4 h-4'/>
              {isLoggingOut ? (
                <span className="loading loading-dots loading-xs"></span>

              ):(<span className='hidden sm:inline'>Logout</span>)}
              
              </button>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
