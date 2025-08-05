import React,{useEffect} from 'react'
import { usechatstore } from '../store/useChatStore'
import Chatheader from '../components/chatheader'
import MessageInput from '../components/messageInput'
import MessageSkeleton from '../components/skeleton/messageskeleton'

const Chatcontainer = () => {

  const{messages,getmessage,isMessagesLoading,Selecteduser} = usechatstore();

  useEffect(()=>{
    getmessage(Selecteduser._id)
  },[Selecteduser._id,getmessage])
  
  if(isMessagesLoading) 
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <Chatheader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
    )



  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <Chatheader/>
      <p>messages...</p>
      <MessageInput/>
    </div>
  )
}

export default Chatcontainer
