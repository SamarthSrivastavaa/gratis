'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LampDemo from '@/components/ui/lamp'
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi'
import { TextEffect } from '@/components/ui/text-effect'
import SignupForm from './SignupForm'

const Landing = () => {
  const router = useRouter()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [userData, setUserData] = useState(null)
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()

  // Mock function to check if user exists - replace with your actual API call
  const checkUserExists = async (walletAddress) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock data - replace with actual API call
    // This should check your database/backend for existing user
    const mockUsers = {
      '0x1234567890abcdef': { username: 'john_doe', age: 25 },
      '0xabcdef1234567890': { username: 'jane_smith', age: 30 }
    }
    
    return mockUsers[walletAddress] || null
  }

  // Mock function to create user - replace with your actual API call
  const createUser = async (walletAddress, userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock user creation - replace with actual API call
    const newUser = {
      walletAddress,
      username: userData.username,
      age: parseInt(userData.age),
      createdAt: new Date().toISOString()
    }
    
    console.log('User created:', newUser)
    return newUser
  }

  // Check user when wallet connects
  useEffect(() => {
    const handleUserCheck = async () => {
      if (isConnected && address) {
        try {
          const existingUser = await checkUserExists(address)
          if (existingUser) {
            // User exists, redirect to homepage
            setUserData(existingUser)
            router.push('/home')
          } else {
            // No user exists, show signup form
            setShowSignupForm(true)
          }
        } catch (error) {
          console.error('Error checking user:', error)
          // Show signup form as fallback
          setShowSignupForm(true)
        }
      }
    }

    handleUserCheck()
  }, [isConnected, address, router])

  const handleConnectWallet = (connector) => {
    connect({ connector })
    setShowWalletModal(false)
  }

  const handleSignupSubmit = async (formData) => {
    try {
      // Create user account
      const newUser = await createUser(address, formData)
      setUserData(newUser)
      setShowSignupForm(false)
      
      // Redirect to homepage
      router.push('/home')
    } catch (error) {
      console.error('Error creating user:', error)
      // Handle error (show error message, etc.)
    }
  }

  const handleSignupCancel = () => {
    setShowSignupForm(false)
    // Optionally disconnect wallet if user cancels signup
    disconnect()
  }

  return (
    <div className="relative min-h-screen mt-0">
      <LampDemo />
      <div className="absolute inset-0 mt-[40px] z-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="bg-gradient-to-br from-[#eff7f6] to-[#b2f7ef] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Decentralized Voice, <br /> central to you
          </h1>
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-[40px]">
              {!isConnected ? (
                <button 
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-[#7bdff2] to-[#b2f7ef] no-underline group cursor-pointer relative shadow-2xl shadow-[#7bdff2]/30 rounded-full p-px text-xs font-semibold leading-6 text-[#073943] inline-block hover:shadow-[#7bdff2]/50 transition-all duration-300"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(123,223,242,0.6)_0%,rgba(123,223,242,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gradient-to-r from-[#7bdff2] to-[#b2f7ef] py-3 px-6 ring-1 ring-[#7bdff2]/30">
                    <span className="font-mono font-bold">Connect Wallet</span>
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
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#b2f7ef]/0 via-[#b2f7ef]/90 to-[#b2f7ef]/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="bg-[#eff7f6]/20 backdrop-blur-sm border border-[#7bdff2] rounded-xl px-4 py-2">
                    <p className="text-[#eff7f6] text-sm font-mono">
                      Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <button 
                    onClick={() => disconnect()}
                    className="bg-gradient-to-r from-[#131730] to-[#263039] no-underline group cursor-pointer relative shadow-2xl shadow-[#f2b5d4]/30 rounded-full p-px text-xs font-semibold leading-6 text-[#f9f2f4] inline-block hover:shadow-[#f2b5d4]/50 transition-all duration-300"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(242,181,212,0.6)_0%,rgba(242,181,212,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gradient-to-r from-[#131730] to-[#263039] py-3 px-6 ring-1 ring-[#f2b5d4]/30">
                      <span className="font-mono font-bold">Disconnect</span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#f2b5d4]/0 via-[#f2b5d4]/90 to-[#f2b5d4]/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>
                </div>
              )}
            </div>
            
            <div className='mt-[50px] text-center'>
              <TextEffect preset="fade" className="text-[#eff7f6]">
                Voices amplified, power stays decentralized..
              </TextEffect>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#073943]/80 backdrop-blur-sm"
            onClick={() => setShowWalletModal(false)}
          ></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-[#084dblue45]/95 border border-[#7bdff2] p-6 sm:p-8 max-w-sm sm:max-w-md w-full mx-4 rounded-xl shadow-2xl shadow-[#7bdff2]/20">
            <div className="text-center mb-6">
              <h2 className="text-[#eff7f6] text-2xl font-bold mb-2 font-mono">Connect Wallet</h2>
              <p className="text-[#b2f7ef] text-sm">Choose your preferred wallet</p>
            </div>
            
            {connectors.length === 0 ? (
              <div className="space-y-5 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-[#7bdff2]/60 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-black text-[#eff7f6]">No Wallet Detected</h3>
                </div>
                
                <div className="space-y-4 text-[#b2f7ef]">
                  <p className="text-base text-[#eff7f6]/80 leading-relaxed font-mono">
                    No wallet extension found on your device.
                  </p>
                  <p className="text-sm text-[#b2f7ef]/80 leading-relaxed">
                    Please install MetaMask, Phantom, or another Web3 wallet to continue.
                  </p>
                </div>
                
                <div className="space-y-3 pt-3">
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-[#7bdff2] to-[#b2f7ef] text-[#073943] px-6 py-3 text-sm font-bold rounded-lg hover:from-[#3aceec] hover:to-[#64efdf] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    INSTALL METAMASK
                  </a>
                  <a 
                    href="https://phantom.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-transparent text-[#eff7f6] border border-[#7bdff2] px-6 py-3 text-sm font-bold rounded-lg hover:bg-[#7bdff2] hover:text-[#073943] transition-all duration-300 transform hover:scale-105"
                  >
                    INSTALL PHANTOM
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid || connector.id}
                    onClick={() => handleConnectWallet(connector)}
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-[#7bdff2] to-[#b2f7ef] text-[#073943] px-6 py-3 text-sm font-bold rounded-lg hover:from-[#3aceec] hover:to-[#64efdf] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isPending ? 'Connecting...' : connector.name}
                  </button>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 text-[#b2f7ef] hover:text-[#eff7f6] transition-colors duration-200 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Signup Form Modal */}
      {showSignupForm && (
        <SignupForm 
          onSubmit={handleSignupSubmit}
          onCancel={handleSignupCancel}
        />
      )}
    </div>
  )
}

export default Landing