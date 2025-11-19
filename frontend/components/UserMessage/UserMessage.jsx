import React, { useEffect, useRef, useState } from "react";
import { Send, X, Menu, Ellipsis } from "lucide-react";
import messageStore from "../../store/message.store";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import userImage from "../../public/user.png";
import userStore from "../../store/userStore";
import formatRelativeTime from "../../constant/DateTime";
import UsersSkeleton from "../UsersSkeleton/UsersSkeleton";
import { useNavigate } from "react-router-dom";

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

  const handleUserSelect = (user) => {
    console.log("selected user ", user);
    if (selectedMessageUser?._id == user._id) return;
    setMessageNull();
    setSelectetMessageUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectetMessageUser(null);
  };

  const messageSubmit = async (data) => {
    setLoader(true);
    if (data.message.trim() === "") {
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
      viewRef.current.scrollIntoView({ behavior: "auto" });
    }
    console.log("user ", user);
  }, [messages]);

  return (
    <div className="flex h-screen w-full pb-18 md:pb-0 bg-base-200">
      {/* Left Sidebar - Users List */}
      <div
        className={`${
          isChatOpen ? "hidden md:flex" : "flex"
        } w-full  md:w-80 lg:w-96 bg-base-100 border-r border-base-300 flex-col`}
      >
        {/* Sidebar Header */}
        <div className="bg-primary text-primary-content p-4">
          <h1 className="text-xl font-bold">Chats</h1>
        </div>

        {/* Users List */}
        {user.messageList.length == 0 ? (
          <div className="flex-1 flex-col gap-10 flex items-center justify-center text-base-content opacity-50 p-4">
            <p>No one here to chat with yet.</p>{" "}
            <span className="text-center">
              start connecting with users from the Matches section
            </span>
          </div>
        ) : (
          <div className="overflow-y-auto px-4 flex-1 py-5 ">
            <ul className="menu menu-lg w-full p-0">
              {allMessageUsers?.map((usr) => (
                <div
                  key={usr._id}
                  className={`flex w-full py-2 my-1 px-4 justify-between items-center hover:bg-base-200 ${
                    selectedMessageUser?._id == usr._id && "bg-base-200"
                  }`}
                >
                  <div
                    className={`flex items-center w-[90%] gap-3 cursor-pointer`}
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
                        <div className="w-12 rounded-full">
                          <img src={usr.profilePicLink} alt={usr.name} />
                        </div>
                      ) : (
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                          <span className="text-3xl">
                            {usr.name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-base-content">
                        {usr.name}
                        <p className="opacity-50 font-normal">
                          {usr.blockList.includes(user._id) && "Blocked you"}
                        </p>
                        <p className="opacity-50 font-normal">
                          {user.blockList.includes(usr._id) && " (Blocked)"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown p-0 dropdown-left z-40">
                    <div tabIndex={0} role="button" className="">
                      <Ellipsis size={20} className="cursor-pointer" />
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu p-0 bg-base-100 border-2 border-warning rounded-box z-1 w-36 shadow-sm"
                    >
                      {user.blockList.includes(usr._id) ? (
                        <li onClick={async () => await unblockPerson(usr._id)}>
                          <p className="opacity-80">
                            {" "}
                            {user.blockList.includes(usr._id) &&
                              "unblock 🔓"}{" "}
                          </p>
                        </li>
                      ) : (
                        <li onClick={async () => await blockPerson(usr._id)}>
                          <p className="opacity-80">
                            {" "}
                            {!user.blockList.includes(usr._id) &&
                              "block 🚫"}{" "}
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
              {!allMessageUsers && <UsersSkeleton />}
            </ul>
          </div>
        )}
      </div>

      {/* Right Side - Chat Area */}
      <div
        className={`${!isChatOpen ? "hidden md:flex" : "flex"} flex-1 flex-col`}
      >
        {selectedMessageUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-primary text-primary-content p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(selectedMessageUser);
                    navigate(`/messages/moredetails`);
                  }}
                >
                  <div
                    className={`avatar avatar-placeholder ${
                      !user.blockList.includes(selectedMessageUser._id) &&
                      !selectedMessageUser.blockList.includes(user._id) &&
                      onlineUsers.includes(selectedMessageUser._id)
                        ? "avatar-online"
                        : "avatar-offline"
                    }`}
                  >
                    {selectedMessageUser?.profilePicLink ? (
                      <div className="w-12 rounded-full">
                        <img
                          src={selectedMessageUser.profilePicLink}
                          alt={user.name}
                        />
                      </div>
                    ) : (
                      <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span className="text-3xl">
                          {selectedMessageUser.name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold">
                      {selectedMessageUser.name}{" "}
                      <span className="opacity-50">
                        {selectedMessageUser.blockList.includes(user._id) &&
                          "Blocked you"}
                          {user.blockList.includes(selectedMessageUser._id) &&
                            " (Blocked Contact)"}
                      </span>{" "}
                    </h2>
                    <p className="text-xs opacity-70">
                      {!user.blockList.includes(selectedMessageUser._id) &&
                      !selectedMessageUser.blockList.includes(user._id) &&
                      onlineUsers.includes(selectedMessageUser._id)
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                {/* Close Button for Mobile */}
                <button
                  className="btn btn-ghost btn-circle md:hidden"
                  onClick={handleCloseChat}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
              {messages?.map((msg, i) => (
                <div key={i}>
                  <div
                    key={msg.id}
                    className={`chat ${
                      msg.senderId === user._id ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Avatar"
                          src={
                            (msg.senderId === user._id
                              ? user.profilePicLink
                              : selectedMessageUser.profilePicLink) || userImage
                          }
                        />
                      </div>
                    </div>
                    <div className="chat-header mb-1">
                      <span className="font-semibold text-sm">
                        {msg.senderId == user._id
                          ? user.name
                          : selectedMessageUser.name}
                      </span>
                    </div>
                    <div
                      className={`chat-bubble ${
                        msg.sender === "me"
                          ? "chat-bubble-success"
                          : "chat-bubble-primary"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="chat-footer mb-1">
                      <time className="text-xs opacity-50 ml-2">
                        {formatRelativeTime(msg.createdAt)}
                      </time>
                    </div>
                  </div>
                  <div ref={viewRef}></div>
                </div>
              ))}
              {messages?.length <= 0 && (
                <div className="flex-1 flex-col gap-10 flex items-center justify-center text-base-content opacity-50 p-4">
                  <span>No messages yet.</span>
                </div>
              )}

              {!messages && <UsersSkeleton message={true} />}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit(messageSubmit)}>
              <div className="bg-base-100 border-t border-base-300 p-4 pb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled={
                      user.blockList.includes(selectedMessageUser._id) ||
                      selectedMessageUser.blockList.includes(user._id)
                    }
                    placeholder="Type a message..."
                    className="input input-bordered flex-1 focus:outline-none focus:border-primary"
                    {...register("message", { required: true })}
                  />
                  {loader ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <button
                      className="btn btn-circle btn-primary"
                      disabled={
                        user.blockList.includes(selectedMessageUser._id) ||
                        selectedMessageUser.blockList.includes(user._id)
                      }
                    >
                      <Send size={20} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Empty State - Desktop Only */
          <div className="hidden md:flex flex-1 items-center justify-center bg-base-200">
            <div className="text-center text-base-content opacity-50">
              <Menu size={64} className="mx-auto mb-4" />
              <p className="text-xl">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
