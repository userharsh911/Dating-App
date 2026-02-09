import React, { useEffect, useRef, useState } from "react";
import userStore from "../../store/userStore";
import messageStore from "../../store/message.store";
import { MessageCircleMore, User, Heart, Sparkles, MapPin } from "lucide-react";
import MatchCardSkeleton from "../MatchCardSkeleton/MatchCardSkeleton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = () => {
  const { getMatchesUsers, allUsers, setSelectedUser, page, setPage, onlineUsers } = userStore((state) => state);
  const { messageList } = messageStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  
  const carouselRef = useRef(null);
  const scrollPositionKey = 'usercard-scroll-position';
  const lastUserRef = useRef();
  const observerRef = useRef(null); 

  // --- FETCH LOGIC (SAME AS BEFORE) ---
  useEffect(() => {
    const loadUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await getMatchesUsers();
        setHasMore(data.pagination.hasMore);
        setInitialLoad(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  // --- INFINITE SCROLL OBSERVER ---
  useEffect(() => {
    if (loading || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(page + 1);
        }
      },
      { threshold: 0.8 }
    );

    if (lastUserRef.current) observerRef.current.observe(lastUserRef.current);
    return () => observerRef.current?.disconnect();
  }, [allUsers, hasMore, loading]);

  // --- SCROLL RESTORATION ---
  useEffect(() => {
    setTimeout(() => {
    const savedScrollIndex = sessionStorage.getItem(scrollPositionKey);
    if (savedScrollIndex && carouselRef.current && allUsers?.length > 0) {
      const index = parseInt(savedScrollIndex);
      const targetItem = carouselRef.current.querySelector(`[data-index="${index}"]`);
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }
    }, 100);
  }, [allUsers]);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll('.match-card-item');
    const carouselRect = carousel.getBoundingClientRect();
    const centerY = carouselRect.top + carouselRect.height / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(centerY - (itemRect.top + itemRect.height / 2));
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    sessionStorage.setItem(scrollPositionKey, closestIndex.toString());
  };

  return (
    <div className="h-screen w-full bg-base-100 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full" />
        </div>

      <div className="h-full w-full max-w-lg mx-auto relative z-10 flex flex-col">
        {/* Header (Optional) */}
        <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-black text-base-content flex items-center gap-2">
                Discover <Sparkles className="text-yellow-500 fill-yellow-500" size={20} />
            </h1>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 pb-20 scroll-smooth no-scrollbar"
        >
          <div className="flex flex-col gap-6 py-4">
            
            {initialLoad ? (
              <MatchCardSkeleton />
            ) : allUsers?.length > 0 ? (
              <>
                {allUsers.map((user, index) => {
                    const isOnline = onlineUsers.includes(user._id);
                    
                    return (
                        <motion.div 
                            key={user._id || index}
                            ref={index === allUsers.length - 1 ? lastUserRef : null}
                            data-index={index}
                            className="match-card-item w-full"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index % 5 * 0.05 }}
                        >
                            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer bg-neutral">
                                
                                {/* Image Layer */}
                                <motion.img
                                    src={user.profilePicLink}
                                    alt={user.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                />

                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                {/* Status Badge (Top Right) */}
                                <div className="absolute top-4 right-4 z-20">
                                    {isOnline && (
                                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                            <span className="relative flex h-3 w-3">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="text-xs font-bold text-white">Online</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Layer (Bottom) */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-3">
                                    
                                    {/* Name & Age */}
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-1">
                                                {user.name}, <span className="text-2xl font-medium text-gray-300">{user.age}</span>
                                            </h2>
                                            <div className="flex items-center gap-1 text-gray-300 text-sm font-medium">
                                                <User size={14} /> {user.gender}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio / Description */}
                                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Building dreams and coding schemes.
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-5 gap-3 mt-2">
                                        <motion.button 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                sessionStorage.setItem(scrollPositionKey, index.toString());
                                                setSelectedUser(user);
                                                navigate(`/matches/moredetails`);
                                            }}
                                            className="col-span-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                                        >
                                            View Profile
                                        </motion.button>
                                        
                                        <motion.button 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={async()=>{await messageList(user); navigate("/message")}} 
                                            className="col-span-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        >
                                            Chat <MessageCircleMore size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Loading Spinner */}
                {loading && (
                    <div className="w-full py-6 flex justify-center">
                         <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}
                
                {/* End of List */}
                {!hasMore && !loading && (
                    <div className="text-center py-10 opacity-50">
                        <Heart className="mx-auto mb-2 text-pink-400" size={32} />
                        <p className="font-medium">You've reached the end!</p>
                    </div>
                )}
              </>
            ) : (
                // Empty State
                <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <User size={40} className="text-base-content/30" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content">No matches found</h3>
                    <p className="text-base-content/60 max-w-xs mt-2">
                        Try changing your preferences or check back later for new people.
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