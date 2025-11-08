import React from "react";
import userStore from "../../store/userStore";
import { useEffect } from "react";
import { useState } from "react";
import MatchCardSkeleton from "../MatchCardSkeleton/MatchCardSkeleton";

const UserCard = () => {
  const { getMatchesUsers, allUsers } = userStore((state) => state);

  useEffect(() => {
    getMatchesUsers().then((users) => {
      console.log("users in user card ", users);
    });
  }, [getMatchesUsers]);

  return (
    <div className="h-screen  overflow-y-scroll bg-base-200">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Cards Grid with Scroll */}
        <div className="flex justify-center h-full py-10 ">
          <div className="carousel carousel-vertical rounded-box h-full">
            {allUsers ? (
              allUsers?.map((user, index) => (
                <div className="carousel-item h-full">
                  <div
                    key={index}
                    className="card bg-base-100 "
                  >
                    {/* Image Container */}
                    <figure className="relative overflow-hidden h-64 sm:h-72">
                      <img
                        src={user.profilePicLink}
                        alt={user.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="badge badge-primary badge-lg">
                          NEW
                        </span>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </figure>

                    {/* Card Body */}
                    <div className="card-body p-5">
                      {/* Name and Age */}
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="card-title text-xl truncate">
                          {user.name}
                        </h2>
                        <span className="text-lg font-semibold text-primary">
                          {user.age}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                        A card component has a figure, a body part, and inside
                        body there are title and actions parts
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="badge badge-secondary">
                          {user.gender}
                        </span>
                        <span className="badge badge-accent">
                          {user.age} years
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="card-actions flex gap-3 mt-5">
                        <button className="btn btn-primary flex-1">More</button>
                        <button className="btn btn-ghost flex-1">Pass</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Skeleton loading state
              <>
                <MatchCardSkeleton />
              </>
            )}
          </div>
        </div>

        {/* Empty State */}
        {allUsers && allUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No matches found
            </h3>
            <p className="text-base-content/60">
              Check back later for new connections!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
