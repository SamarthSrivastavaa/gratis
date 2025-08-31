'use client'
import React, { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

const SignupForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    age: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { address } = useAccount()
  const { writeContractAsync, isPending, error: contractError } = useWriteContract()
  
  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters'
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
      newErrors.age = 'Age must be between 13 and 120'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    if (!address) {
      setErrors({ general: 'Please connect your wallet first' })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Call smart contract to register user
      const { hash } = await writeContractAsync({
        address: '0x3C578e9768b09f237C256ef3F8ec003BAbE505e3', // Replace with your smart contract address
        abi: [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"UsersBalance","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"UsersMapping","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"username","type":"string","internalType":"string"},{"name":"age","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"contractOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"User","inputs":[{"name":"_username","type":"string","internalType":"string"},{"name":"_age","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"followers","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"following","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"sendPayout","inputs":[{"name":"_to","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"sendSubscriptionAmount","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawPayout","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"},{"name":"withdrawAddress","type":"address","internalType":"address payable"},{"name":"_accountOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"}],
        functionName: 'User',
        args: [formData.username, parseInt(formData.age)]
      })
      
      console.log('Transaction hash:', hash)
      
      // Redirect to home page immediately after transaction is sent
      // (regardless of whether it succeeds or fails)
      onSubmit(formData)
      
    } catch (error) {
      console.error('Smart contract error:', error)
      // Even if there's an error, still redirect to home page
      onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Note: We now redirect immediately after transaction is sent
  // The useEffect for waiting for transaction success is no longer needed

  const isLoading = isPending || isConfirming || isSubmitting

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0  bg-slate-950/80 backdrop-blur-lg"
        onClick={onCancel}
      ></div>
      
      <div className="relative max-w-md w-full mx-4 rounded-2xl shadow-2xl shadow-black/40">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 p-px"></div>
        <div className="relative bg-gradient-to-br  bg-black rounded-2xl p-8 border-1 border-cyan-400">
          
          {/* Glowing Header */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-400/20 blur-xl rounded-full"></div>
            <h2 className="text-white text-3xl font-bold mb-3 font-mono relative z-10">Welcome!</h2>
            <p className="text-cyan-400 text-sm relative z-10 font-mono">Complete your profile to get started</p>
          </div>

          {/* General Error Display */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm font-mono">{errors.general}</p>
            </div>
          )}

          {/* Contract Error Display */}
          {contractError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm font-mono">
                Contract Error: {contractError.message}
              </p>
            </div>
          )}

          {/* Transaction Status */}
          {isPending && (
            <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p className="text-blue-400 text-sm font-mono">
                🔄 Sending transaction to blockchain...
              </p>
            </div>
          )}
          
          {isConfirming && (
            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-400 text-sm font-mono">
                ⏳ Waiting for blockchain confirmation...
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-white text-sm font-medium mb-2 font-mono">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.username 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-gray-600 focus:border-yellow-500'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-2 text-red-400 text-sm font-mono">{errors.username}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className="block text-white text-sm font-medium mb-2 font-mono">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.age 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-gray-600 focus:border-yellow-500'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your age"
                min="13"
                max="120"
              />
              {errors.age && (
                <p className="mt-2 text-red-400 text-sm font-mono">{errors.age}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-mono ${
                isLoading 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-cyan-400 text-black hover:from-yellow-600 hover:to-yellow-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  <span>
                    {isPending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Processing...'}
                  </span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Close Button */}
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`absolute top-4 right-4 transition-colors duration-200 text-xl ${
              isLoading ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'
            }`}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
