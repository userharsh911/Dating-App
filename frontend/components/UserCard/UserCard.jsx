import React from "react";
import userStore from "../../store/userStore";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { MessageCircleMore } from "lucide-react";
import MatchCardSkeleton from "../MatchCardSkeleton/MatchCardSkeleton";
import { useNavigate } from "react-router-dom";
import messageStore from "../../store/message.store";

const UserCard = () => {
  const { getMatchesUsers, allUsers, setSelectedUser, page, setPage } = userStore((state) => state);
  const {messageList} = messageStore(state=>state);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const scrollPositionKey = 'usercard-scroll-position';
  const lastUserRef = useRef();
  const observerRef = useRef(null); // Observer ko store karne ke liye

  // Load users jab page change ho
  useEffect(() => {
    const loadUsers = async () => {
      if (loading) return;
      
      setLoading(true);
      try {
        const data = await getMatchesUsers();
        console.log("users in user card ", data.users);
        setHasMore(data.pagination.hasMore);
        setInitialLoad(false);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Agar loading chal raha hai ya hasMore nahi hai, observer mat banao
    if (loading || !hasMore) {
      return;
    }

    // Purana observer disconnect karo
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Ye check bahut important hai!
        if (entries[0].isIntersecting && hasMore && !loading) {
          console.log("Loading more users... Current page:", page);
          setPage(page + 1); // Next page load karo   
        }
      },
      { 
        threshold: 0.8, // 80% visible ho tab trigger kare
        rootMargin: '0px' // Extra margin mat do
      }
    );

    const currentRef = lastUserRef.current;
    if (currentRef) {
      console.log("Observing last user card");
      observerRef.current.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [allUsers, hasMore, loading]); // allUsers change hone pe re-observe karo

  // Restore scroll position
  useEffect(() => {
    setTimeout(() => {
    console.log("Restoring scroll position...");
    const savedScrollIndex = sessionStorage.getItem(scrollPositionKey);
    
    if (savedScrollIndex && carouselRef.current && allUsers?.length > 0) {
      console.log("Saved scroll index found:", savedScrollIndex);
      const index = parseInt(savedScrollIndex);
      const targetItem = carouselRef.current.querySelector(`.carousel-item:nth-child(${index + 1})`);
      if (targetItem) {
        targetItem.scrollIntoView({ 
            behavior: 'instant',
            block: 'nearest', 
            inline: 'center' 
          });
      }
    }
    }, 0);
  }, [allUsers]);

  // Save scroll position
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll('.carousel-item');
    const carouselRect = carousel.getBoundingClientRect();
    const centerY = carouselRect.top + carouselRect.height / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterY = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(centerY - itemCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    sessionStorage.setItem(scrollPositionKey, closestIndex.toString());
  };

  return (
    <div className="h-screen overflow-y-scroll bg-base-200">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center h-full py-10">
          <div 
            ref={carouselRef}
            className="carousel carousel-vertical rounded-box h-full"
            onScroll={handleScroll}
          >
            {initialLoad ? (
              <MatchCardSkeleton />
            ) : allUsers?.length > 0 ? (
              <>
                {allUsers.map((user, index) => (
                  <div 
                    className="carousel-item h-full" 
                    key={user._id || index}
                    ref={index === allUsers.length - 1 ? lastUserRef : null}
                  >
                    <div className="card bg-base-100">
                      <figure className="relative overflow-hidden h-64 sm:h-72">
                        <img
                          src={user.profilePicLink}
                          alt={user.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="badge badge-primary badge-lg">
                            {user.name}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </figure>

                      <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="card-title text-xl truncate">
                            {user.name}
                          </h2>
                          <span className="text-lg font-semibold text-primary">
                            {user.age}
                          </span>
                        </div>

                        <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                          A card component has a figure, a body part, and inside
                          body there are title and actions parts
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge badge-warning">
                            {user.gender}
                          </span>
                          <span className="badge badge-success">
                            {user.age} years
                          </span>
                        </div>

                        <div className="card-actions flex gap-3 mt-5">
                          <button 
                            className="btn btn-primary flex-1" 
                            onClick={() => {
                              sessionStorage.setItem(scrollPositionKey, index.toString());
                              setSelectedUser(user);
                              navigate(`/matches/moredetails`);
                            }}
                          >
                            More
                          </button>
                          <button onClick={()=>messageList(user)} className="btn btn-secondary flex-1">Chat <MessageCircleMore size={20} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator - only show when actually loading */}
                {loading && (
                  <div className="carousel-item h-40 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                )}

                {/* No more users - only show when not loading */}
                {!hasMore && !loading && (
                  <div className="carousel-item h-40 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl mb-2">🎉</p>
                      <p className="text-base-content/60">You've seen all users!</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
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
      </div>
    </div>
  );
};

export default UserCard;