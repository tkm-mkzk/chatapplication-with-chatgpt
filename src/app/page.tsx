'use client'

import Chat from './components/Chat'
import SideBar from './components/SideBar'

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-full flex" style={{ width: '1280px' }}>
        <div className="w-1/5 h-full border-r">
          <SideBar />
        </div>
        <div className="w-4/5 h-full">
          <Chat />
        </div>
      </div>
    </div>
  )
}
