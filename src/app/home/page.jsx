'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'

const Page = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [messageContent, setMessageContent] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [likedMessages, setLikedMessages] = useState(new Set())
  const [dislikedMessages, setDislikedMessages] = useState(new Set())
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle like button click
  const handleLike = (messageId) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
        // Remove from disliked if it was there
        setDislikedMessages(prevDisliked => {
          const newDislikedSet = new Set(prevDisliked)
          newDislikedSet.delete(messageId)
          return newDislikedSet
        })
      }
      return newSet
    })
  }

  // Handle dislike button click
  const handleDislike = (messageId) => {
    setDislikedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
        // Remove from liked if it was there
        setLikedMessages(prevLiked => {
          const newLikedSet = new Set(prevLiked)
          newLikedSet.delete(messageId)
          return newLikedSet
        })
      }
      return newSet
    })
  }

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/get-messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.data || [])
      } else {
        console.error('Failed to fetch messages')
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Send message via API
  const sendMessage = async () => {
    if (!messageContent.trim() || !address) return

    try {
      setIsPosting(true)
      const response = await fetch('/api/send-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          content: messageContent.trim()
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Add new message to the beginning of the list
        setMessages(prev => [data.data, ...prev])
        setMessageContent('') // Clear input
        console.log('Message sent successfully:', data)
      } else {
        const errorData = await response.json()
        console.error('Failed to send message:', errorData.error)
        alert(`Failed to send message: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setIsPosting(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  // Get user data (mock for now)
  const getUserData = async (walletAddress) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const mockUsers = {
      '0x1234567890abcdef': { username: 'john_doe', age: 25 },
      '0xabcdef1234567890': { username: 'jane_smith', age: 30 }
    }
    
    return mockUsers[walletAddress] || { username: 'Anonymous', age: 'N/A' }
  }

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected && address) {
        try {
          const user = await getUserData(address)
          setUserData(user)
          // Fetch messages when user is connected
          fetchMessages()
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUserData({ username: 'Anonymous', age: 'N/A' })
        }
      } else {
        // Not connected, redirect to landing
        router.push('/')
      }
    }

    checkUser()
  }, [isConnected, address, router])

  const handleDisconnect = () => {
    disconnect()
    router.push('/')
  }

  // Show loading or redirect if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-4">
      <nav className="mx-4 bg-black/90 backdrop-blur-md border p-4 border-gray-700 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <img 
                  src="/WhatsApp Image 2025-08-30 at 14.40.31_a903baa5.jpg"     
                  alt="WhatsApp Logo" 
                  className="w-36 h-36 object-contain"
                />
              </div>
            </div>

            <div className="hidden md:block flex-1 mx-8">
              <div className="flex items-center bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-semibold">
                      {userData?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium font-mono">
                    {userData?.username || 'Username'}
                  </span>
                </div>
                <div className="flex-1 mx-4">
                  <input 
                    type="text" 
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Key down your thoughts here!" 
                    className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                    disabled={isPosting}
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  disabled={!messageContent.trim() || isPosting}
                  className={`bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 font-mono rounded-full px-4 py-2 text-black text-sm font-medium shadow-lg ${
                    !messageContent.trim() || isPosting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isPosting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <button 
                onClick={handleDisconnect}
                className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block hover:shadow-zinc-800/50 transition-all duration-300"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                  <span className='font-mono'>Disconnect</span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-yellow-400 p-2 rounded-md transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700/50">
                <a href="#" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  Home
                </a>
                <a href="#" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  Features
                </a>
                <a href="#" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  About
                </a>
                <a href="#" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  Contact
                </a>
                <div className="pt-4">
                  <button 
                    onClick={handleDisconnect}
                    className="w-full bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block hover:shadow-zinc-800/50 transition-all duration-300"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center justify-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                      <span>Disconnect</span>
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex gap-6 p-6">
        {/* Left Side - Profile Card */}
        <div className="w-80 flex-shrink-0 space-y-6">
          <div 
            onClick={() => router.push('/profile')}
            className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] group"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-black text-2xl font-bold">
                  {userData?.username?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-mono group-hover:text-yellow-400 transition-colors duration-300">
                {userData?.username || 'Username'}
              </h3>
              <p className="text-gray-400 text-sm mb-4 font-mono group-hover:text-gray-300 transition-colors duration-300">
                @{userData?.username || 'username'}
              </p>
              <div className="text-gray-400 text-sm mb-4 font-mono">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/pricing');
                  }}
                  className='bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg px-4 py-1 font-mono font-bold transition-colors duration-200 cursor-pointer'
                >
                  Get Verified
                </button>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div>
                  <div className="text-white font-semibold font-mono group-hover:text-yellow-400 transition-colors duration-300">{messages.length}</div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Posts</div>
                </div>
                <div>
                  <div className="text-white font-semibold font-mono group-hover:text-yellow-400 transition-colors duration-300">5.6K</div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Followers</div>
                </div>
                <div>
                  <div className="text-white font-semibold font-mono group-hover:text-yellow-400 transition-colors duration-300">890</div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Following</div>
                </div>
              </div>
              
              {/* Subtle click indicator */}
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <p className="text-yellow-500/60 text-xs font-mono group-hover:text-yellow-500 transition-colors duration-300">
                  Click to view full profile →
                </p>
              </div>
            </div>
          </div>
          
          {/* HOT POSTS of the day Card */}
          <div className="bg-black/90 backdrop-blur-sm border h-[350px] border-gray-700 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-5 font-mono"><span className='text-yellow-500'>HOT POSTS</span></h3>
              <div className="space-y-3">
                <div className="text-left">
                  <p className="text-white text-sm font-mono mb-1">Trending <span className='text-yellow-500'>#1</span></p>
                  <p className="text-gray-400 text-xs">"Decentralized future is here..."</p>
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-mono mb-1">Trending <span className='text-yellow-500'>#2</span></p>
                  <p className="text-gray-400 text-xs">"Voice to the people..."</p>
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-mono mb-1">Trending <span className='text-yellow-500'>#3</span></p>
                  <p className="text-gray-400 text-xs">"Privacy matters..."</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <p className="text-yellow-500 text-xs font-mono">30-8-2025</p>
              </div>  
            </div>
          </div>
        </div>
        
        {/* Center - Messages Timeline */}
        <div className="flex-1">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 min-h-[675px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-normal text-white font-mono">Timeline</h2>
              <button 
                onClick={fetchMessages}
                disabled={isLoading}
                className="text-yellow-500 hover:text-yellow-400 text-sm font-mono transition-colors duration-200"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center text-gray-400 py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-sm font-mono">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                <p className="text-lg font-mono">No messages yet</p>
                <p className="text-sm mt-2 font-mono">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message._id || message.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black text-sm font-bold">
                          {message.walletAddress?.slice(2, 4)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-white font-medium text-sm font-mono">
                            {message.walletAddress?.slice(0, 6)}...{message.walletAddress?.slice(-4)}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {formatTimestamp(message.createdAt)}
                          </span>
                        </div>
                        <p className="text-white text-sm leading-relaxed font-light mb-3">
                          {message.content}
                        </p>
                        
                        {/* Like/Dislike Buttons */}
                        <div className="flex items-center space-x-6 pt-2 border-t border-gray-700/30">
                                                     {/* Like Button */}
                           <button 
                             onClick={() => handleLike(message._id || message.id)}
                             className={`flex items-center space-x-2 transition-colors duration-200 group ${
                               likedMessages.has(message._id || message.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                             }`}
                           >
                             <svg 
                               className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                               fill={likedMessages.has(message._id || message.id) ? "currentColor" : "none"}
                               stroke="currentColor" 
                               viewBox="0 0 24 24"
                             >
                               <path 
                                 strokeLinecap="round" 
                                 strokeLinejoin="round" 
                                 strokeWidth={2} 
                                 d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
                               />
                             </svg>
                             <span className="text-xs font-mono group-hover:text-red-400 transition-colors duration-200">
                               Like
                             </span>
                           </button>
                          
                         
                                                     <button 
                             onClick={() => handleDislike(message._id || message.id)}
                             className={`flex items-center space-x-2 transition-colors duration-200 group ${
                               dislikedMessages.has(message._id || message.id) ? 'text-red-400' : 'text-gray-400 hover:text-blue-400'
                             }`}
                           >
                             <svg 
                               className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                               fill={dislikedMessages.has(message._id || message.id) ? "currentColor" : "none"}
                               stroke="currentColor" 
                               viewBox="0 0 24 24"
                             >
                               <path 
                                 strokeLinecap="round" 
                                 strokeLinejoin="round" 
                                 strokeWidth={2} 
                                 d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" 
                               />
                             </svg>
                             <span className="text-xs font-mono group-hover:text-blue-400 transition-colors duration-200">
                               Dislike
                             </span>
                           </button>
                          
                      
                          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-200 group">
                            <svg 
                              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                              />
                            </svg>
                            <span className="text-xs font-mono group-hover:text-green-400 transition-colors duration-200">
                              Comment
                            </span>
                          </button>
                          

                          <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 group">
                            <svg 
                              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
                              />
                            </svg>
                            <span className="text-xs font-mono group-hover:text-purple-400 transition-colors duration-200">
                              Share
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page