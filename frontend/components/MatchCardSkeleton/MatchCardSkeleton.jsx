import React from "react";

const MatchCardSkeleton = () => {
  return (
    <div className="h-screen w-[450px] p-6 flex flex-col gap-6 items-center">
      <div className="flex flex-col h-full w-full max-w-md gap-4 bg-base-200 rounded-2xl p-4 shadow-lg animate-pulse">
        {/* Profile Image Skeleton */}
        <div className="skeleton h-24 w-24 rounded-full shrink-0"></div>

        {/* Content Skeleton */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          <div className="skeleton h-6 w-3/4 rounded-lg"></div>
          <div className="skeleton h-4 w-1/2 rounded-lg"></div>
          <div className="flex gap-2">
            <div className="skeleton h-8 w-20 rounded-full"></div>
            <div className="skeleton h-8 w-20 rounded-full"></div>
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="flex items-center justify-center">
          <div className="skeleton h-12 w-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MatchCardSkeleton;
