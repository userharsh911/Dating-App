import React, { useEffect, useRef, useState } from "react";
import userStore from "../../store/userStore";
import messageStore from "../../store/message.store";
import { MessageCircleMore, User, Heart, Sparkles, MapPin } from "lucide-react";
import MatchCardSkeleton from "../MatchCardSkeleton/MatchCardSkeleton";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import userImage from '/user.png';
import toast from "react-hot-toast";

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

  useEffect(() => {
    const loadUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await getMatchesUsers();
        setHasMore(data.pagination.hasMore);
        setInitialLoad(false);
      } catch (error) {
        toast.error(error|| "Failed to load users");
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
        {/* Animated Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full" 
            />
        </div>

      <div className="h-full w-full max-w-lg mx-auto relative z-10 flex flex-col">
        {/* Header with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-6 py-4 flex items-center justify-between"
        >
            <h1 className="text-3xl font-black text-base-content flex items-center gap-2">
                Discover 
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Sparkles className="text-yellow-500 fill-yellow-500" size={24} />
                </motion.div>
            </h1>
        </motion.div>

        {/* Scrollable Container */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-20 scroll-smooth no-scrollbar"
        >
          <div className="flex flex-col gap-6 py-4">
            
            {initialLoad ? (
              <MatchCardSkeleton />
            ) : allUsers?.length > 0 ? (
              <>
                {allUsers?.map((user, index) => {
                    const isOnline = onlineUsers.includes(user._id);
                    
                    return (
                        <motion.div 
                            key={user._id || index}
                            ref={index === allUsers.length - 1 ? lastUserRef : null}
                            data-index={index}
                            className="match-card-item w-full"
                            // Upgraded to Spring physics for a bouncier, premium feel
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: Math.min(index * 0.1, 0.3) }}
                        >
                            <div className="relative w-full aspect-3/4 sm:aspect-4/5 rounded-4xl overflow-hidden shadow-2xl group cursor-pointer bg-neutral border border-base-300/50">
                                
                                {user?.profilePicLink ? (
                                    <motion.img
                                      src={user?.profilePicLink}
                                      alt={user.name}
                                      className="absolute inset-0 w-full h-full object-cover"
                                      whileHover={{ scale: 1.08 }}
                                      transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-base-200">
                                        <User size={64} className="text-base-content/40" />
                                    </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    {isOnline && (
                                        <motion.div 
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                          className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg"
                                        >
                                            <span className="relative flex h-3 w-3">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="text-xs font-bold text-white tracking-wide">Online</span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Content Layer (Bottom) */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-4">
                                    
                                    {/* Name & Age */}
                                    <div className="flex items-end justify-between">
                                        <motion.div 
                                          initial={{ opacity: 0, x: -20 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                            <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-1 drop-shadow-md">
                                                {user.name}, <span className="text-3xl font-medium text-white/80">{user.age}</span>
                                            </h2>
                                            <div className="flex items-center gap-1 text-white/70 text-sm font-medium mt-1">
                                                <User size={14} /> {user.gender}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Bio / Description */}
                                    <motion.p 
                                      initial={{ opacity: 0 }}
                                      whileInView={{ opacity: 1 }}
                                      transition={{ delay: 0.3 }}
                                      className="text-white/80 text-sm line-clamp-2 leading-relaxed"
                                    >
                                      {user.description || "No bio available."}
                                    </motion.p>

                                    {/* Action Buttons */}
                                    <motion.div 
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.4 }}
                                      className="grid grid-cols-5 gap-3 mt-2"
                                    >
                                        <motion.button 
                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.25)" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                sessionStorage.setItem(scrollPositionKey, index.toString());
                                                setSelectedUser(user);
                                                navigate(`/matches/moredetails`);
                                            }}
                                            className="col-span-3 bg-white/15 backdrop-blur-md border border-white/20 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            View Profile
                                        </motion.button>
                                        
                                        <motion.button 
                                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(236, 72, 153, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={async()=>{await messageList(user); navigate("/message")}} 
                                            className="col-span-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                                        >
                                            Chat <MessageCircleMore size={18} />
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Loading Spinner */}
                {loading && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                      className="w-full py-6 flex justify-center"
                    >
                         <span className="loading loading-spinner loading-lg text-primary"></span>
                    </motion.div>
                )}
                
                {/* End of List */}
                {!hasMore && !loading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-center py-10 opacity-70"
                    >
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                          <Heart className="mx-auto mb-3 text-error drop-shadow-md" size={32} fill="currentColor" />
                        </motion.div>
                        <p className="font-bold text-lg">You've caught up!</p>
                        <p className="text-sm text-base-content/60">No more matches in your area.</p>
                    </motion.div>
                )}
              </>
            ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[60vh] flex flex-col items-center justify-center text-center px-4"
                >
                    <motion.div 
                      animate={{ y: [-10, 10, -10] }} 
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="w-28 h-28 bg-base-200 rounded-full flex items-center justify-center mb-6 shadow-xl border border-base-300"
                    >
                        <User size={50} className="text-base-content/40" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-base-content">No matches found</h3>
                    <p className="text-base-content/60 max-w-xs mt-3 leading-relaxed">
                        Try changing your preferences or check back later for new people.
                    </p>
                </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;