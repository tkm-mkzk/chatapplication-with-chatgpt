'use client'

import React, { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { db } from '../firebase'
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useAppContext } from '../context/AppContext'

type Room = {
  id: string
  name: string
  createdAt: Timestamp
}

const SideBar = () => {
  const { user, userId, setSelectedRoom } = useAppContext()

  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    if (user) {
      const fetchRooms = async () => {
        const roomCollectionRef = collection(db, 'rooms')
        const q = query(
          roomCollectionRef,
          where('userId', '==', userId),
          orderBy('createdAt')
        )
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newRooms: Room[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            createdAt: doc.data().createdAt,
          }))
          setRooms(newRooms)
        })

        return () => {
          unsubscribe()
        }
      }

      fetchRooms()
    }
  }, [userId])

  const selectRoom = (roomId: string) => {
    setSelectedRoom(roomId)
  }

  return (
    <div className="bg-custom-blue h-full overflow-y-auto px-5 flex flex-col">
      <div className="flex-grow">
        <div
          // onClick={addNewRoom}
          className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150"
        >
          <span className="text-white p-4 text-2xl">＋</span>
          <h1 className="text-white text-xl font-semibold p-4">New Chat</h1>
        </div>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.id}
              className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 "
              onClick={() => selectRoom(room.id)}
            >
              {room.name}
            </li>
          ))}
          {/* <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Room 2
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Room 3
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Room 4
          </li> */}
        </ul>
      </div>

      <div
        // onClick={() => handleLogout()}
        className="text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700 duration-150"
      >
        <BiLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  )
}

export default SideBar
