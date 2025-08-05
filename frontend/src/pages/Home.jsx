import { usechatstore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatselected from '../components/NoChatselected';
import Chatcontainer from './Chatcontainer';



const Home = () => {

  const{Selecteduser} = usechatstore();


  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>
            {Selecteduser?<Chatcontainer/>:<NoChatselected/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
