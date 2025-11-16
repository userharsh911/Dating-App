import React, {useRef, useState } from "react";
import {
  MapPin,
  GraduationCap,
  Edit,
  Brain,
  Settings,
  Pencil,
  Check,
  X,
} from "lucide-react";
import userStore from "../../store/userStore";
import base64ImageConvert from "../../constant/fileReader";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import AccountForm from "../AccountForm/AccountForm";
import toast from "react-hot-toast";

const ProfileSecion = ({ editing }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [bioLoader, setBioLoader] = useState(false);
  const hobbyInputRef = useRef("");
  const descriptionRef = useRef("");
  const {
    user,
    selectedUser,
    UpdateProfilePic,
    EditUserHobby,
    EditUserDescription,
  } = userStore((state) => state);
  const profile = {
    name: editing ? user?.name : selectedUser?.name,
    profilePic: editing ? user?.profilePicLink : selectedUser?.profilePicLink,
    age: editing ? user?.age : selectedUser?.age,
    Branch: (editing ? user?.branch : selectedUser?.branch) || "N/D",
    location: (editing ? user?.location : selectedUser?.location) || "N/D",
    bio: (editing ? user?.description : selectedUser?.description) || "N/D",
    height: (editing ? user?.height : selectedUser?.height) || "N/D",
    interests: editing ? user?.hobbies : selectedUser?.hobbies,
    photos: 6,
    verified: true,
  };

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
  ];

  const imageUpload = async (e) => {
    e.preventDefault();
    let baseImage = await base64ImageConvert(image);
    toast.promise(
      UpdateProfilePic(baseImage).then(() => {
        setImage(null);
      }),
      {
        loading: "Saving...",
        success: <b>saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };

  const submitHobby = async ({ id }) => {
    setUploading(true);
    if (id || id === 0) {
      await EditUserHobby({ hobby: hobbyInputRef.current.value.trim(), id });
    } else if (!id && hobbyInputRef.current.value.trim() === "") {
      toast.error("Please enter a hobby to add");
    } else {
      await EditUserHobby({ hobby: hobbyInputRef.current.value.trim() });
      hobbyInputRef.current.value = "";
    }
    setUploading(false);
  };

  const updateDescription = async () => {
    if (user?.description == descriptionRef.current.value.trim()) {
      return setEditBio(false);
    }
    setBioLoader(true);
    try {
      await EditUserDescription({
        description: descriptionRef.current.value.trim(),
      });
      setBioLoader(false);
      setEditBio(false);
    } catch (error) {
      throw error?.response
    }
    finally{
      setEditBio(false);
      setBioLoader(false);
    }
  };

  return (
    <>
      {user && (
        <div className="h-dvh overflow-y-scroll bg-base-200 text-base-content">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-base-200">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 flex justify-end items-center">
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-base-300 transition">
                  <Settings className="w-6 h-6 text-base-content" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-2 sm:px-4 pb-24 sm:pb-8">
            {/* Main Photo Grid */}
            <ProfileBanner image={profile.profilePic} />

            {/* Profile Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                      {profile.name}, {profile.age}
                    </h1>
                    {profile.verified && (
                      <div className="bg-info rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-info-content"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-base-content/70">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                  </div>
                </div>
                {editing && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto p-2 sm:p-6">
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    <label
                      htmlFor="fileInput"
                      className="btn btn-outline btn-primary gap-2 hover:scale-105 transition-transform btn-sm sm:btn-md w-full sm:w-auto"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Select Image</span>
                      <span className="sm:hidden">Select</span>
                    </label>

                    {image && (
                      <div className="alert alert-success shadow-lg w-full sm:max-w-md relative py-2 sm:py-3">
                        <div className="flex items-center gap-2 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-5 w-5 sm:h-6 sm:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
                            {image.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setImage(null)}
                          className="btn btn-circle btn-ghost btn-xs absolute -top-2 -right-2 btn-active hover:btn-error transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    <button
                      onClick={imageUpload}
                      className="btn btn-primary gap-2 hover:scale-105 transition-transform shadow-lg btn-sm sm:btn-md w-full sm:w-auto"
                      disabled={!image}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                      </svg>
                      <span className="hidden sm:inline">Upload Image</span>
                      <span className="sm:hidden">Upload</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-base-300">
                  <GraduationCap className="w-4 h-4 text-base-content" />
                  <span className="text-xs sm:text-sm text-base-content">
                    {profile.Branch}
                  </span>
                </div>
                {editing && (
                  <div className="flex items-center gap-2 px-3 bg-primary sm:px-4 py-2 rounded-full">
                    <Pencil className="w-4 h-4 text-primary-content" />
                    <span className="text-xs sm:text-sm ">
                      <label
                        htmlFor="my_modal_7"
                        className="cursor-pointer flex text-primary-content  font-bold items-center gap-1"
                      >
                        Edit
                      </label>
                      <input
                        type="checkbox"
                        id="my_modal_7"
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <AccountForm />
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7">
                          Close
                        </label>
                      </div>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 sm:gap-6 mb-6 border-b border-base-300 overflow-x-auto">
              {["about", "interests", "photos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-2 capitalize font-medium transition whitespace-nowrap text-sm sm:text-base text-base-content ${
                    activeTab === tab
                      ? "border-b-2 border-primary"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <div className="flex gap-5 items-center mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-base-content">
                      About Me
                    </h3>
                    {editing && <>
                      {!editBio ? (
                        <Edit
                          onClick={() => setEditBio((val) => !val)}
                          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                        />
                      ) : !bioLoader ? (
                        <>
                          <Check
                            onClick={updateDescription}
                            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                          />
                          <X
                            onClick={() => setEditBio((val) => !val)}
                            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                          />
                        </>
                      ) : (
                        <span className="loading loading-spinner loading-md"></span>
                      )}
                    </>}
                  </div>
                  {!editBio ? (
                    <p className="text-base-content/85 leading-relaxed text-sm sm:text-base">
                      {profile.bio}
                    </p>
                  ) : (
                    <textarea
                      className="text-base-content/85 w-full leading-relaxed text-sm sm:text-base"
                      name=""
                      id=""
                      ref={descriptionRef}
                    >
                      {profile.bio}
                    </textarea>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 text-base-content">
                    Basics
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-3 sm:p-4 rounded-xl bg-base-200">
                      <p className="text-xs sm:text-sm mb-1 text-base-content/70">
                        Height
                      </p>
                      <p className="font-medium text-sm sm:text-base text-base-content">
                        {profile.height}
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl bg-base-200">
                      <p className="text-xs sm:text-sm mb-1 text-base-content/70">
                        Distance
                      </p>
                      <p className="font-medium text-sm sm:text-base text-base-content">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "interests" && (
              <div className="w-full">
                <div className="flex w-full gap-4 mb-4 items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 text-base-content">
                    Interests & Hobbies
                  </h3>
                  {editing && <div className="join">
                    <div>
                      <label className="input outline-none join-item border-none">
                        <input
                          type="text"
                          placeholder="Add interest"
                          ref={hobbyInputRef}
                        />
                      </label>
                    </div>
                    <button
                      className="btn btn-neutral join-item"
                      disabled={uploading}
                      onClick={submitHobby}
                    >
                      Add
                    </button>
                  </div>}
                </div>
                <div className="grid grid-cols-1 justify-center sm:grid-cols-2 gap-2 sm:gap-3">
                  {profile.interests.map((interest, i) => {
                    return (
                      <div
                        key={interest + i}
                        className="flex items-center justify-around gap-3 p-3 sm:p-4 rounded-xl bg-base-200"
                      >
                        <div className="flex items-center w-full gap-3">
                          <div className="p-2 rounded-full bg-primary/20">
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-base-content">
                            {interest}
                          </span>
                        </div>
                        {editing && <div className="">
                          <button
                            className="btn btn-circle btn-ghost btn-sm btn-active hover:btn-error transition-colors"
                            onClick={() => submitHobby({ id: i })}
                            disabled={uploading}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>}
                      </div>
                    );
                  })}
                  {
                    profile.interests.length==0 && 
                    <div className="w-full ">
                      <p className="text-center text-base-content  text-sm sm:text-base">
                        No hobbies added yet.
                      </p>
                    </div>
                  }
                  {uploading && (
                    <span className="loading loading-bars loading-xl text-center"></span>
                  )}
                </div>
              </div>
            )}

            {activeTab === "photos" && (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-xl"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={photo.url}
                      alt={`Photo ${photo.id}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {/* <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 bg-base-200">
          <div className="max-w-4xl mx-auto flex gap-2 sm:gap-4">
            <button className="flex-1 py-3 sm:py-4 rounded-full font-semibold transition hover:opacity-90 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base bg-primary text-primary-content">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
              Like
            </button>
            <button className="flex-1 py-3 sm:py-4 rounded-full font-semibold transition hover:opacity-90 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base bg-secondary text-secondary-content">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Message
            </button>
            <button className="p-3 sm:p-4 rounded-full transition hover:opacity-90 bg-base-300">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-base-content" />
            </button>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSecion;
