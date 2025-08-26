import React, { useState } from 'react'
import {usechatstore} from '../store/useChatStore'
import {useRef} from 'react'
import {X,Image,Send} from 'lucide-react'
import { toast } from 'react-hot-toast';


function messageInput() {
  const [message,setmessage] = useState("")
  const [image,setimage] = useState(null) 
  const fileinputref = useRef(null)
  
  const {sendmessage} = usechatstore();

  const handlemessage = async(e) => {
    e.preventDefault();
    if(!message.trim() && !image){
      return toast.error("Please enter a message")
    }
    try {
     await sendmessage({
        text : message,
        image : image
      })
      setmessage("")
      setimage(null)
      
      
    } catch (error) {
  
    }
  




  }

  const handleimage = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      return toast.error("Please select an image file")
    }
    const reader = new FileReader()

    reader.onload = () => {
      setimage(reader.result)
    };

    reader.readAsDataURL(file);
    
  }

  const removeimage = () => {
    setimage(null)
  }






  return (
    <div>
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeimage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handlemessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input
            type="text"
            placeholder='Type your message'
            value={message}
            onChange={(e)=>setmessage(e.target.value)}
            className='flex-1 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="file"
            accept="image/*"
            ref={fileinputref}
            onChange={handleimage}
            className='hidden'
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
            ${image ? "border-green-600" : "border-red-600"}
            `}
            onClick={()=>fileinputref.current?.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button type="submit" className='btn btn-circle btn-sm bg-green-600' onClick={handlemessage} disabled={!message.trim() && !image}>
          <Send className="size-4"/>
        </button>
      </form>
        
    </div>
  )
}

export default messageInput
