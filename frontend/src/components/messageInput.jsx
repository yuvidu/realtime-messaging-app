import React, { useState } from 'react'
import {usechatstore} from '../store/useChatStore'
import {useRef} from 'react'
import {X,Image} from 'lucide-react'






function messageInput() {
  const [message,setmessage] = useState("")
  const [image,setimage] = useState(null) 
  const fileinputref = useRef(null)
  const {sendmessage} = usechatstore();

  const handlemessage = async(e) => {
    setmessage(e.target.value)
  }

  const handleimage = (e) => {
    setimage(e.target.files[0])
  }

  const removeimage = () => {}






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
      </form>
        
    </div>
  )
}

export default messageInput
