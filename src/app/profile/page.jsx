'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('posts')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const mockPosts = [
    {
      id: 1,
      content: "Just deployed my new decentralized app! The future of web3 is here 🚀",
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      content: "Working on some amazing blockchain integration features. Privacy matters! 🔒",
      likes: 18,
      comments: 5,
      shares: 2,
      timestamp: "1 day ago"
    },
    {
      id: 3,
      content: "The community here is incredible. Love building with fellow developers! 💻",
      likes: 32,
      comments: 12,
      shares: 7,
      timestamp: "3 days ago"
    }
  ]

  const mockLikedPosts = [
    {
      id: 1,
      content: "This is an amazing post about decentralized governance!",
      author: "@crypto_dev",
      likes: 156,
      timestamp: "1 week ago"
    },
    {
      id: 2,
      content: "Great insights on blockchain scalability solutions",
      author: "@web3_builder",
      likes: 89,
      timestamp: "2 weeks ago"
    }
  ]

  const mockFollowers = [
    { id: 1, username: "alice_crypto", name: "Alice Johnson", avatar: "A" },
    { id: 2, username: "bob_web3", name: "Bob Smith", avatar: "B" },
    { id: 3, username: "crypto_carol", name: "Carol Davis", avatar: "C" },
    { id: 4, username: "dave_blockchain", name: "Dave Wilson", avatar: "D" }
  ]

  const mockFollowing = [
    { id: 1, username: "web3_master", name: "Web3 Master", avatar: "W" },
    { id: 2, username: "defi_expert", name: "DeFi Expert", avatar: "D" },
    { id: 3, username: "nft_creator", name: "NFT Creator", avatar: "N" }
  ]

  const tabOptions = [
    { key: 'posts', label: 'Your Posts' },
    { key: 'likes', label: 'Your Likes' },
    { key: 'followers', label: 'Followers' },
    { key: 'following', label: 'Following' }
  ]

  const renderContent = () => {
    switch (selectedTab) {
      case 'posts':
        return (
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-sm leading-relaxed mb-4 font-light">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="flex space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-medium">{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-white font-medium">{post.comments}</span>
                    </span>
                  </div>
                  <span className="text-gray-400 font-light">{post.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )
      case 'likes':
        return (
          <div className="space-y-4">
            {mockLikedPosts.map((post) => (
              <div key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-sm leading-relaxed mb-3 font-light">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span className="text-gray-400">by <span className="text-white font-medium">{post.author}</span></span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-medium">{post.likes}</span>
                    </span>
                    <span className="text-gray-400 font-light">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      case 'followers':
        return (
          <div className="space-y-3">
            {mockFollowers.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <span className="text-black text-sm font-bold">{user.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs font-light">{user.username}</p>
                </div>
                <button className="text-white/80 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )
      case 'following':
        return (
          <div className="space-y-3">
            {mockFollowing.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <span className="text-black text-sm font-bold">{user.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs font-light">{user.username}</p>
                </div>
                <button className="text-white/80 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Aligned to left box margin */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white font-sans mb-2">Profile</h1>
          <p className="text-gray-400 text-base font-light">View all your profile details here.</p>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Profile Card */}
          <div className="w-96 flex-shrink-0">
                         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20 h-[400px] flex flex-col">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-3 font-sans">Sarthak Harsh</h2>
                <div className="inline-block bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full mb-6 shadow-lg">
                  Premium User
                </div>
                
                {/* Avatar */}
                <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-green-400/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <span className="text-black text-3xl font-bold">S</span>
                </div>
                
                {/* Social Media Section */}
                <div className="mb-6">
                  <h3 className="text-white text-base font-medium mb-3 font-sans">Social Media</h3>
                  <div className="flex justify-center space-x-4">
                    <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-lg">
                      <span className="text-white text-xs font-bold">YT</span>
                    </div>
                    <div className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer shadow-lg">
                      <span className="text-white text-xs font-bold">IG</span>
                    </div>
                    <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer shadow-lg">
                      <span className="text-white text-xs font-bold">TT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sleek Content Section */}
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20 h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-white font-sans">Your Content</h3>
                
                {/* Elegant Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm"
                  >
                    <span>{tabOptions.find(tab => tab.key === selectedTab)?.label}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl shadow-black/50 z-10">
                      {tabOptions.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => {
                            setSelectedTab(tab.key)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ${
                            selectedTab === tab.key
                              ? 'text-white bg-white/20 font-medium'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
