import React from "react";

const UsersSkeleton = ({message=false}) => {
    const repeat = [1,2,3,4,5];
  return (
      <div>
        {repeat?.map((i)=>(
            <div key={i+1} className={` ${(message && i%2==0) ? 'flex-row-reverse' : 'flex-row'} flex w-full gap-3 rounded-2xl p-4 py-8`}>
                <div className="skeleton h-12 w-12 rounded-full shrink-0"></div>
                <div className={` ${(message && i%2==0) ? 'items-end' : 'items-start'} flex flex-col gap-3 flex-1 justify-center`}>
                    <div className="skeleton h-6 w-3/4 rounded-lg"></div>
                    <div className="skeleton h-4 w-1/2 rounded-lg"></div>
                </div>
            </div>
        ))}
      </div>
  );
};

export default UsersSkeleton;
