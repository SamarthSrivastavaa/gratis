"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ProfileCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const {
    name = "Sarthak Harsh",
    title = "Gratisor for almost a year now",
    description = "Passionate about pets and coding , I am trying to build a community of pet lovers and coders",
    imageUrl = "/WhatsApp Image 2025-08-30 at 14.40.31_a903baa5.jpg",
    githubUrl = "#",
    twitterUrl = "#",
    youtubeUrl = "#",
    linkedinUrl = "#",
    className,
  } = props;

  const socialIcons = [
    { icon: Github, url: githubUrl, label: "GitHub" },
    { icon: Twitter, url: twitterUrl, label: "Twitter" },
    { icon: Youtube, url: youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: linkedinUrl, label: "LinkedIn" },
  ];

  const handleButtonClick = (type, title) => {
    setModalType(type);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalTitle('');
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop */}
      <div className='hidden md:flex relative items-center'>
        {/* Square Image */}
        <div
          className='w-[360px] h-[300px] rounded-3xl overflow-hidden bg-gray-200 border-2 border-cyan-400 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className='w-full h-full object-cover'
            draggable={false}
            priority />
        </div>
        {/* Overlapping Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='bg-white dark:bg-card rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              {name}
            </h2>

            <p className='text-sm font-medium text-gray-700 dark:text-gray-500'>
              {title}
            </p>
          </div>

          <p className='text-black dark:text-white text-base leading-relaxed mb-8'>
            {description}
          </p>

                     <div className='flex space-x-6'>
             <button 
               onClick={() => handleButtonClick('following', 'Following')}
               className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               300 following
             </button>
             <button 
               onClick={() => handleButtonClick('followers', 'Followers')}
               className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               200 followers
             </button>
             <button 
               onClick={() => handleButtonClick('liked', 'Liked Posts')}
               className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               Liked 
             </button>
           </div>
        </motion.div>
      </div>
      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='md:hidden max-w-sm mx-auto text-center bg-transparent'>
        {/* Square Mobile Image */}
        <div
          className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6 flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className='w-full h-full object-cover'
            draggable={false}
            priority />
        </div>

        <div className='px-4'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
            {name}
          </h2>

          <p className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-4'>
            {title}
          </p>

          <p className='text-black dark:text-white text-sm leading-relaxed mb-6'>
            {description}
          </p>

                     <div className='flex justify-center space-x-6'>
             <button 
               onClick={() => handleButtonClick('following', 'Following')}
               className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               300 following
             </button>
             <button 
               onClick={() => handleButtonClick('followers', 'Followers')}
               className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               200 followers
             </button>
             <button 
               onClick={() => handleButtonClick('liked', 'Liked Posts')}
               className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium'
             >
               liked post
             </button>
           </div>
                 </div>
       </motion.div>

       {/* Modal */}
       {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             onClick={closeModal}
           ></div>
           
           <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                 {modalTitle}
               </h3>
               <button
                 onClick={closeModal}
                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xl"
               >
                 ✕
               </button>
             </div>

             {/* Content */}
             <div className="p-6 max-h-[60vh] overflow-y-auto">
               {modalType === 'following' && (
                 <div className="space-y-4">
                   {Array.from({ length: 10 }, (_, i) => (
                     <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                       <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                         <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                           {String.fromCharCode(65 + i)}
                         </span>
                       </div>
                       <div className="flex-1">
                         <p className="text-gray-900 dark:text-white font-medium">User {i + 1}</p>
                         <p className="text-gray-500 dark:text-gray-400 text-sm">@user{i + 1}</p>
                       </div>
                       <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                         View Profile
                       </button>
                     </div>
                   ))}
                 </div>
               )}

               {modalType === 'followers' && (
                 <div className="space-y-4">
                   {Array.from({ length: 8 }, (_, i) => (
                     <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                       <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                         <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                           {String.fromCharCode(65 + i)}
                         </span>
                       </div>
                       <div className="flex-1">
                         <p className="text-gray-900 dark:text-white font-medium">Follower {i + 1}</p>
                         <p className="text-gray-500 dark:text-gray-400 text-sm">@follower{i + 1}</p>
                       </div>
                       <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                         View Profile
                       </button>
                     </div>
                   ))}
                 </div>
               )}

               {modalType === 'liked' && (
                 <div className="space-y-4">
                   {Array.from({ length: 6 }, (_, i) => (
                     <div key={i} className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                       <div className="flex items-center space-x-3 mb-2">
                         <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                           <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                             {String.fromCharCode(65 + i)}
                           </span>
                         </div>
                         <div className="flex-1">
                           <p className="text-gray-900 dark:text-white font-medium">Post {i + 1}</p>
                           <p className="text-gray-500 dark:text-gray-400 text-sm">@author{i + 1}</p>
                         </div>
                       </div>
                       <p className="text-gray-700 dark:text-gray-300 text-sm">
                         "This is a sample liked post content that shows what the user has liked..."
                       </p>
                       <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                         <span>❤️ 24</span>
                         <span>💬 8</span>
                         <span>🔄 3</span>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }
