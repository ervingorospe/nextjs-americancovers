import React from 'react'

export async function HeroLayout({ children, textBottomColor = "text-white" }) {
  return (
    <>
      <div className="absolute inset-0 bg-black opacity-40 z-1"></div>
      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>

      { children }

      <div className="h-[8vw] bg-blue-800 relative z-10">
        <svg className={`fill-current w-full absolute left-0 bottom-0 ${textBottomColor}`} viewBox="0 0 1000 120">
          <path d="M 0 120 Q 500 0 1000 120 Z"/>
        </svg>
      </div>
    </>
  )
}
