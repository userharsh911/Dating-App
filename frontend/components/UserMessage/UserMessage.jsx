import React, { useEffect, useRef, useState } from "react";
import { Send, X, Menu, Ellipsis, MessageSquareHeart } from "lucide-react";
import messageStore from "../../store/message.store";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import userImage from "../../public/user.png";
import userStore from "../../store/userStore";
import formatRelativeTime from "../../constant/DateTime";
import UsersSkeleton from "../UsersSkeleton/UsersSkeleton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion

export default function UserMessage() {
  const {
    allMessageUsers,
    setSelectetMessageUser,
    setMessageNull,
    selectedMessageUser,
    sendMessage,
    messages,
    getMessages,
  } = messageStore((state) => state);
  const { user, onlineUsers, setSelectedUser, blockPerson, unblockPerson } =
    userStore((state) => state);
  const [loader, setLoader] = useState(false);
  const viewRef = useRef(null);
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const handleUserSelect = (usr) => {
    setIsChatOpen(true);
    if (selectedMessageUser?._id == usr._id) return;
    setMessageNull();
    setSelectetMessageUser(usr);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectetMessageUser(null);
  };

  const messageSubmit = async (data) => {
    setLoader(true);
    if (data.message.trim() === "") {
      setLoader(false);
      return toast.error("Message cannot be empty");
    }
    const msg = data.message;
    setValue("message", "");
    await sendMessage({ message: msg });
    setLoader(false);
  };

  useEffect(() => {
    if (selectedMessageUser) {
      getMessages();
    }
  }, [selectedMessageUser, getMessages]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: "smooth" }); // Changed to smooth for better UX
    }
  }, [messages]);

  return (
    <div className="flex h-screen w-full pb-18 md:pb-0 bg-base-200 overflow-hidden">
      {/* Left Sidebar - Users List */}
      <AnimatePresence>
        {(!isChatOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`${
              isChatOpen ? "hidden md:flex" : "flex"
            } w-full md:w-80 lg:w-96 bg-base-100 border-r border-base-300 flex-col z-10 shadow-lg`}
          >
            {/* Sidebar Header */}
            <div className="bg-primary text-primary-content p-5 shadow-sm z-20">
              <h1 className="text-2xl font-black flex items-center gap-2">
                Chats <MessageSquareHeart size={24} />
              </h1>
            </div>

            {/* Users List */}
            {user.messageList.length == 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex-1 flex-col gap-6 flex items-center justify-center text-base-content opacity-50 p-6 text-center"
              >
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4 }}>
                  <MessageSquareHeart size={48} className="text-base-content/30" />
                </motion.div>
                <p className="text-lg font-semibold">No one here to chat with yet.</p>
                <span className="text-sm">Start connecting with users from the Matches section</span>
              </motion.div>
            ) : (
              <div className="overflow-y-auto px-3 flex-1 py-4 scroll-smooth no-scrollbar">
                <ul className="menu menu-lg w-full p-0 gap-1">
                  {allMessageUsers?.map((usr, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                      key={usr._id}
                      className={`flex w-full py-2 px-3 rounded-2xl justify-between items-center transition-colors ${
                        selectedMessageUser?._id == usr._id ? "bg-primary/10 border border-primary/20" : "hover:bg-base-200"
                      }`}
                    >
                      <div
                        className={`flex items-center w-[85%] gap-4 cursor-pointer`}
                        onClick={() => handleUserSelect(usr)}
                      >
                        <div
                          className={`avatar avatar-placeholder ${
                            !user.blockList.includes(usr._id) &&
                            !usr.blockList.includes(user._id) &&
                            onlineUsers.includes(usr._id)
                              ? "avatar-online"
                              : "avatar-offline"
                          }`}
                        >
                          {usr?.profilePicLink ? (
                            <div className="w-12 h-12 rounded-full shadow-sm">
                              <img src={usr.profilePicLink} alt={usr.name} className="object-cover" />
                            </div>
                          ) : (
                            <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full shadow-sm">
                              <span className="text-xl font-bold">
                                {usr.name[0].toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[15px] text-base-content truncate">
                            {usr.name}
                            {usr.blockList.includes(user._id) && (
                              <span className="block text-xs text-error opacity-80 font-normal mt-0.5">Blocked you</span>
                            )}
                            {user.blockList.includes(usr._id) && (
                              <span className="block text-xs text-warning opacity-80 font-normal mt-0.5">You Blocked</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Dropdown */}
                      <div className="dropdown p-0 dropdown-end z-40">
                        <div tabIndex={0} role="button" className="p-2 hover:bg-base-300 rounded-full transition-colors">
                          <Ellipsis size={18} className="text-base-content/60" />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu p-2 bg-base-100 border border-base-300 rounded-box z-[1] w-40 shadow-xl"
                        >
                          {user.blockList.includes(usr._id) ? (
                            <li onClick={async () => await unblockPerson(usr._id)}>
                              <button className="text-success font-medium">🔓 Unblock</button>
                            </li>
                          ) : (
                            <li onClick={async () => await blockPerson(usr._id)}>
                              <button className="text-error font-medium">🚫 Block</button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                  {!allMessageUsers && <UsersSkeleton />}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Side - Chat Area */}
      <div className={`${!isChatOpen ? "hidden md:flex" : "flex"} flex-1 flex-col relative bg-base-200/50`}>
        {selectedMessageUser ? (
          <motion.div 
            key={selectedMessageUser._id} // Re-animates when user changes
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full w-full"
          >
            {/* Chat Header */}
            <div className="bg-base-100/80 backdrop-blur-md border-b border-base-300 p-3 sm:p-4 shadow-sm z-20 sticky top-0">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => {
                    setSelectedUser(selectedMessageUser);
                    navigate(`/matches/moredetails`);
                  }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="avatar">
                    <div className="w-10 sm:w-12 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <img
                        src={selectedMessageUser.profilePicLink || userImage}
                        alt={selectedMessageUser.name}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-base-content group-hover:text-primary transition-colors">
                      {selectedMessageUser.name}
                    </h2>
                    <p className="text-xs font-medium">
                      {selectedMessageUser.blockList.includes(user._id) || user.blockList.includes(selectedMessageUser._id) ? (
                        <span className="text-error">Cannot message</span>
                      ) : onlineUsers.includes(selectedMessageUser._id) ? (
                        <span className="text-success flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span> Online
                        </span>
                      ) : (
                        <span className="text-base-content/50">Offline</span>
                      )}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-ghost btn-circle md:hidden bg-base-200"
                  onClick={handleCloseChat}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
              <AnimatePresence>
                {messages?.map((msg, i) => {
                  const isMe = msg.senderId === user._id;
                  return (
                    <motion.div
                      key={msg._id || i}
                      initial={{ opacity: 0, y: 20, scale: 0.9, originX: isMe ? 1 : 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                    >
                      <div className="chat-image avatar hidden sm:block">
                        <div className="w-8 rounded-full shadow-sm">
                          <img
                            alt="Avatar"
                            src={(isMe ? user.profilePicLink : selectedMessageUser.profilePicLink) || userImage}
                          />
                        </div>
                      </div>
                      
                      <div className="chat-header mb-1 opacity-70 text-xs font-medium">
                        {isMe ? "You" : selectedMessageUser.name.split(" ")[0]}
                      </div>
                      
                      <div
                        className={`chat-bubble shadow-md ${
                          msg.sender === "me" || isMe
                            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-content"
                            : "bg-base-100 text-base-content border border-base-300"
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                      <div className="chat-footer mt-1">
                        <time className="text-[10px] opacity-50 font-medium">
                          {formatRelativeTime(msg.createdAt)}
                        </time>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              <div ref={viewRef} className="h-1"></div>

              {messages?.length <= 0 && !loader && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col gap-4 items-center justify-center text-base-content opacity-50 p-4"
                >
                  <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-3xl">👋</span>
                  </div>
                  <span className="font-medium">Say hi to start the conversation!</span>
                </motion.div>
              )}

              {!messages && <UsersSkeleton message={true} />}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit(messageSubmit)} className="bg-base-100 p-3 sm:p-4 border-t border-base-300 pb-6 sm:pb-4 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <div className="flex gap-2 items-center max-w-4xl mx-auto">
                <input
                  type="text"
                  autoComplete="off"
                  disabled={
                    user.blockList.includes(selectedMessageUser._id) ||
                    selectedMessageUser.blockList.includes(user._id)
                  }
                  placeholder={
                    user.blockList.includes(selectedMessageUser._id) || selectedMessageUser.blockList.includes(user._id)
                      ? "You cannot message this user"
                      : "Type a message..."
                  }
                  className="input input-bordered flex-1 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-base-200/50 disabled:bg-base-300 disabled:cursor-not-allowed"
                  {...register("message", { required: true })}
                />
                
                {loader ? (
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-circle btn-primary shadow-lg shadow-primary/30"
                    disabled={
                      user.blockList.includes(selectedMessageUser._id) ||
                      selectedMessageUser.blockList.includes(user._id)
                    }
                  >
                    <Send size={18} className="ml-1" />
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          /* Empty State - Desktop Only */
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="hidden md:flex flex-1 flex-col items-center justify-center bg-base-200/30"
          >
            <motion.div 
              animate={{ y: [-15, 0, -15], rotate: [-2, 2, -2] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="text-primary opacity-20 mb-6"
            >
              <MessageSquareHeart size={100} />
            </motion.div>
            <h3 className="text-2xl font-bold text-base-content/70">Your Messages</h3>
            <p className="text-base-content/50 mt-2">Select a chat from the sidebar to start messaging</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}