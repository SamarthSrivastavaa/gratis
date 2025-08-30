'use client'
import React, { useState } from 'react'

const SignupForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    age: ''
  })
  const [errors, setErrors] = useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

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
                   className={`w-full px-4 py-2 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                     errors.username 
                       ? 'border-red-400 focus:border-red-400' 
                       : 'border-gray-600 focus:border-yellow-500'
                   }`}
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
                   className={`w-full px-4 py-2 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                     errors.age 
                       ? 'border-red-400 focus:border-red-400' 
                       : 'border-gray-600 focus:border-yellow-500'
                   }`}
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
                 className="w-full bg-cyan-400 text-black py-3 px-6 text-sm font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-mono"
               >
                 Create Account
               </button>
             </form>

             {/* Close Button */}
             <button
               onClick={onCancel}
               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-xl"
             >
               ✕
             </button>
         </div>
       </div>
    </div>
  )
}

export default SignupForm
