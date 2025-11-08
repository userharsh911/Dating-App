import React, { useState } from "react";
import {
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Music,
  Camera,
  Book,
  Coffee,
  Dumbbell,
  Plane,
  Edit,
  Settings,
  MessageCircle,
  Gift,
  Star,
} from "lucide-react";
import userStore from "../../store/userStore";
import base64ImageConvert from "../../constant/fileReader";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import AccountForm from "../AccountForm/AccountForm";

const ProfileSecion = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [image, setImage] = useState("");
  const { user, UpdateProfilePic } = userStore((state) => state);
  console.log("Profile Rendered", user);
  const profile = {
    name: user?.name,
    age: user?.age,
    Branch: user?.branch || "Computer Science Engineering",
    location: user?.location || "New York, USA",
    bio: "Adventure seeker with a passion for photography and good coffee. Love exploring new places and trying different cuisines. Looking for someone genuine who can make me laugh.",
    education: "IIT Delhi",
    height: "5'6\"",
    interests: [
      "Photography",
      "Travel",
      "Coffee",
      "Music",
      "Fitness",
      "Reading",
    ],
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

  const getInterestIcon = (interest) => {
    const icons = {
      Photography: Camera,
      Travel: Plane,
      Coffee: Coffee,
      Music: Music,
      Fitness: Dumbbell,
      Reading: Book,
    };
    return icons[interest] || Star;
  };
  const imageUpload = async (e) => {
    e.preventDefault();
    console.log("file selected ", image);
    let baseImage = await base64ImageConvert(image);
    await UpdateProfilePic(baseImage);
  };

  return (
    <div className="h-dvh overflow-y-scroll bg-base-200 text-base-content">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-base-200">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 flex justify-between items-center">
          <button className="p-2 rounded-full hover:bg-base-300 transition">
            <svg
              className="w-6 h-6 text-base-content"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-base-300 transition">
              <Settings className="w-6 h-6 text-base-content" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-2 sm:px-4 pb-24 sm:pb-8">
        {/* Main Photo Grid */}
        <ProfileBanner />

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
          </div>

          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-base-300">
              <GraduationCap className="w-4 h-4 text-base-content" />
              <span className="text-xs sm:text-sm text-base-content">
                {profile.Branch}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-base-300">
              <GraduationCap className="w-4 h-4 text-base-content" />
              <span className="text-xs sm:text-sm text-base-content">
                <label htmlFor="my_modal_7" className="btn">
                  Edit
                </label>
                <input
                  type="checkbox"
                  id="my_modal_7"
                  className="modal-toggle"
                />
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <AccountForm/>
                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_7">
                    Close
                  </label>
                </div>
              </span>
            </div>
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
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-base-content">
                About Me
              </h3>
              <p className="text-base-content/85 leading-relaxed text-sm sm:text-base">
                {profile.bio}
              </p>
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
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-base-content">
              Interests & Hobbies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {profile.interests.map((interest) => {
                const Icon = getInterestIcon(interest);
                return (
                  <div
                    key={interest}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-base-200"
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm sm:text-base text-base-content">
                      {interest}
                    </span>
                  </div>
                );
              })}
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
  );
};

export default ProfileSecion;
