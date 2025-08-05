import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { usechatstore } from "../store/useChatStore";

const ChatHeader = () => {
  const { Selecteduser, setSelecteduser } = usechatstore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={Selecteduser.profilePicture || "/avatar.png"} alt={Selecteduser?.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{Selecteduser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(Selecteduser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
  
        {/* Close button */}
        <button onClick={() => setSelecteduser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;