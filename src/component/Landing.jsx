import React from 'react'
import LampDemo from '@/components/ui/lamp'
import { TextEffect } from '@/components/ui/text-effect'

const Landing = () => {
  return (
    <div className="relative min-h-screen mt-0">
      <LampDemo />
      <div className="absolute inset-0 mt-[40px] z-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Decentralized Voice, <br /> central to you
          </h1>
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-[40px]">
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>
                    Create Account
                  </span>
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
            
            <div className='mt-[50px] text-center'>
              <TextEffect preset="fade" className="text-white">
                Voices amplified, power stays decentralized..
              </TextEffect>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing