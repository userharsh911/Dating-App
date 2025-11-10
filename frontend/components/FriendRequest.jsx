import React, { useState } from 'react';

export default function FriendRequest() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      username: '@rahul_dev',
      mutualFriends: 12,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      time: '2h ago'
    },
    {
      id: 2,
      name: 'Priya Singh',
      username: '@priya_codes',
      mutualFriends: 8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      time: '5h ago'
    },
    {
      id: 3,
      name: 'Arjun Patel',
      username: '@arjun_tech',
      mutualFriends: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
      time: '1d ago'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      username: '@sneha_design',
      mutualFriends: 15,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
      time: '2d ago'
    }
  ]);

  const handleAccept = (id, name) => {
    setRequests(requests.filter(req => req.id !== id));
    // Toast notification
    const toast = document.getElementById('toast-success');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = `${name} ko accept kar liya! 🎉`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  };

  const handleReject = (id, name) => {
    setRequests(requests.filter(req => req.id !== id));
    // Toast notification
    const toast = document.getElementById('toast-reject');
    const toastText2 = document.getElementById('toast-text-2');
    toastText2.textContent = `${name} ka request reject kar diya`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  };

  return (
    <div className="min-h-screen bg-base-200 overflow-y-scroll h-screen p-4 md:p-8">
      {/* Toast Notifications */}
      <div className="toast toast-top toast-end z-50">
        <div id="toast-success" className="alert alert-success hidden">
          <span id="toast-text"></span>
        </div>
        <div id="toast-reject" className="alert alert-error hidden">
          <span id="toast-text-2"></span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold">
              Friend Requests
              <div className="badge badge-primary">{requests.length}</div>
            </h1>
            <p className="text-base-content/70">
              Nayi friend requests dekho aur accept/reject karo
            </p>
          </div>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="card-title text-2xl">Koi request nahi hai!</h2>
              <p className="text-base-content/70">
                Abhi koi friend request pending nahi hai bhai
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {/* Avatar */}
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={request.avatar} alt={request.name} />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h2 className="card-title text-xl">
                        {request.name}
                        <div className="badge badge-ghost">{request.time}</div>
                      </h2>
                      <p className="text-base-content/70">{request.username}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm text-base-content/70">
                          {request.mutualFriends} mutual friends
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        className="btn btn-primary flex-1 md:flex-initial"
                        onClick={() => handleAccept(request.id, request.name)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Accept
                      </button>
                      <button 
                        className="btn btn-ghost flex-1 md:flex-initial"
                        onClick={() => handleReject(request.id, request.name)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Card */}
        {requests.length > 0 && (
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <div className="stats stats-vertical md:stats-horizontal shadow w-full">
                <div className="stat">
                  <div className="stat-title">Total Requests</div>
                  <div className="stat-value text-primary">{requests.length}</div>
                  <div className="stat-desc">Pending approval</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">This Week</div>
                  <div className="stat-value text-secondary">4</div>
                  <div className="stat-desc">New connections</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Acceptance Rate</div>
                  <div className="stat-value">89%</div>
                  <div className="stat-desc">↗︎ Great!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}