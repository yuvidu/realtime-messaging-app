import React,{useEffect} from 'react'
import { usechatstore } from '../store/useChatStore'
import Chatheader from '../components/chatheader'
import MessageInput from '../components/messageInput'
import MessageSkeleton from '../components/skeleton/messageskeleton'
import { useAuthStore } from '../store/useAuthStore'
 

const Chatcontainer = () => {
  const{messages,getmessages,isMessagesLoading,Selecteduser} = usechatstore();
  const{authuser} = useAuthStore();

  useEffect(()=>{
    if(Selecteduser && Selecteduser._id) {
      getmessages(Selecteduser._id);
    }
  },[Selecteduser, getmessages])
  
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
      <div className='flex-1 flex flex-col overflow-auto p-4 space-y-2'>
        
        {messages.map((message) => {
          const isSender = message.senderID === authuser._id;
          return (
            <div 
              key={message._id} 
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${isSender ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
                  <img 
                    src={isSender 
                      ? authuser.profilePicture || "/avatar.png" 
                      : Selecteduser.profilePicture || "/avatar.png"
                    } 
                    alt="Profile"
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                  {message.text && (
                    <div className={`px-4 py-2 rounded-2xl ${
                      isSender 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}>
                      {message.text}
                    </div>
                  )}
                  {message.image && (
                    <div className='mt-1 overflow-hidden rounded-lg'>
                      <img 
                        src={message.image} 
                        alt="Chat"
                        className='max-w-xs max-h-80 object-cover rounded-lg'
                      />
                    </div>
                  )}
                  <span className='text-xs text-gray-500 mt-1'>
                    {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput/>
    </div>
  )
}

export default Chatcontainer
