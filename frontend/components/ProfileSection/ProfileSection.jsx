import React, { useRef, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import userStore from "../../store/userStore";
import base64ImageConvert from "../../constant/fileReader";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import toast from "react-hot-toast";
import SignupForm from "../SignupForm";

// Framer Motion Variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleUpItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

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
    interests: editing ? user?.hobbies : selectedUser?.hobbies || [],
    photos: 6,
    verified: true,
  };


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
      },
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
      throw error?.response;
    } finally {
      setEditBio(false);
      setBioLoader(false);
    }
  };

  return (
    <>
      {user && (
        <div className="h-dvh overflow-y-scroll bg-base-200 text-base-content overflow-x-hidden">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-base-200/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 flex justify-end items-center">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-2 rounded-full hover:bg-base-300 transition"
                >
                  <Settings className="w-6 h-6 text-base-content" />
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto px-2 sm:px-4 pb-24 sm:pb-8"
          >
            {/* Main Photo Grid */}
            <ProfileBanner image={profile.profilePic} />

            {/* Profile Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
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
                </motion.div>

                {editing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto p-2 sm:p-6"
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    <motion.label
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      htmlFor="fileInput"
                      className="btn btn-outline btn-primary gap-2 btn-sm sm:btn-md w-full sm:w-auto"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Select Image</span>
                      <span className="sm:hidden">Select</span>
                    </motion.label>

                    <AnimatePresence>
                      {image && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="alert alert-success shadow-lg w-full sm:max-w-md relative py-2 sm:py-3"
                        >
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={imageUpload}
                      className="btn btn-primary gap-2 shadow-lg btn-sm sm:btn-md w-full sm:w-auto"
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
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-base-300">
                  <GraduationCap className="w-4 h-4 text-base-content" />
                  <span className="text-xs sm:text-sm text-base-content">
                    {profile.Branch}
                  </span>
                </div>

                {editing && (
                  <>
                    {/* 1. Only the Label stays inside the animated div */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 bg-primary sm:px-4 py-2 rounded-full cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-primary-content" />
                      <span className="text-xs sm:text-sm">
                        <label
                          htmlFor="my_modal_7"
                          className="cursor-pointer flex text-primary-content font-bold items-center gap-1"
                        >
                          Edit
                        </label>
                      </span>
                    </motion.div>

                    {/* 2. The Modal goes outside the animated div to prevent CSS fixed-position conflicts */}
                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <SignupForm />
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">
                        Close
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 sm:gap-6 mb-6 border-b border-base-300 overflow-x-auto relative">
              {["about", "interests", "photos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-2 capitalize font-medium transition whitespace-nowrap text-sm sm:text-base text-base-content relative ${
                    activeTab === tab
                      ? "text-primary"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* ABOUT TAB */}
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex gap-5 items-center mb-3">
                        <h3 className="text-base sm:text-lg font-semibold text-base-content">
                          About Me
                        </h3>
                        {editing && (
                          <AnimatePresence mode="wait">
                            {!editBio ? (
                              <motion.div
                                key="edit-icon"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                              >
                                <Edit
                                  onClick={() => setEditBio((val) => !val)}
                                  className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-primary transition-colors"
                                />
                              </motion.div>
                            ) : !bioLoader ? (
                              <motion.div
                                key="action-icons"
                                className="flex gap-2"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                              >
                                <Check
                                  onClick={updateDescription}
                                  className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-success hover:scale-110 transition-transform"
                                />
                                <X
                                  onClick={() => setEditBio((val) => !val)}
                                  className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-error hover:scale-110 transition-transform"
                                />
                              </motion.div>
                            ) : (
                              <motion.span
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="loading loading-spinner loading-md"
                              ></motion.span>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                      <AnimatePresence mode="wait">
                        {!editBio ? (
                          <motion.p
                            key="bio-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-base-content/85 leading-relaxed text-sm sm:text-base"
                          >
                            {profile.bio}
                          </motion.p>
                        ) : (
                          <motion.textarea
                            key="bio-input"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="textarea textarea-bordered textarea-primary text-base-content w-full leading-relaxed text-sm sm:text-base"
                            ref={descriptionRef}
                            defaultValue={profile.bio}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 text-base-content">
                        Basics
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-3 sm:p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                        >
                          <p className="text-xs sm:text-sm mb-1 text-base-content/70">
                            Height
                          </p>
                          <p className="font-medium text-sm sm:text-base text-base-content">
                            {profile.height}
                          </p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-3 sm:p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                        >
                          <p className="text-xs sm:text-sm mb-1 text-base-content/70">
                            Location
                          </p>
                          <p className="font-medium text-sm sm:text-base text-base-content">
                            {profile.location}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                {/* INTERESTS TAB */}
                {activeTab === "interests" && (
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row w-full gap-4 mb-4 items-start sm:items-center justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-base-content">
                        Interests & Hobbies
                      </h3>
                      {editing && (
                        <div className="join w-full sm:w-auto shadow-sm">
                          <input
                            type="text"
                            placeholder="Add interest"
                            ref={hobbyInputRef}
                            className="input input-bordered outline-none border-none join-item w-full sm:w-auto focus:outline-primary"
                          />
                          <button
                            className="btn btn-primary join-item"
                            disabled={uploading}
                            onClick={submitHobby}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    {profile.interests.length > 0 ? (
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 justify-center sm:grid-cols-2 gap-2 sm:gap-3"
                      >
                        <AnimatePresence>
                          {profile.interests.map((interest, i) => (
                            <motion.div
                              key={interest + i}
                              variants={scaleUpItem}
                              layout
                              exit={{
                                opacity: 0,
                                scale: 0.5,
                                transition: { duration: 0.2 },
                              }}
                              className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-primary/20">
                                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                </div>
                                <span className="font-medium text-sm sm:text-base text-base-content">
                                  {interest}
                                </span>
                              </div>
                              {editing && (
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
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
                                </motion.button>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full py-8"
                      >
                        <p className="text-center text-base-content/60 text-sm sm:text-base">
                          No hobbies added yet.
                        </p>
                      </motion.div>
                    )}

                    {uploading && (
                      <div className="flex justify-center mt-4">
                        <span className="loading loading-bars loading-md text-primary"></span>
                      </div>
                    )}
                  </div>
                )}

                {/* PHOTOS TAB */}
                {activeTab === "photos" && (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-2 sm:gap-3"
                  >
                    <p className="text-center text-base-content/60 col-span-full mt-8">
                      coming soon...
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProfileSecion;
