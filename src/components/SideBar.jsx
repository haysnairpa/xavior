"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { useToast } from '@/hooks/use-toast'
import { Toast, ToastAction } from './ui/toast'
import { UserCircle, FileText, Moon, Sun, LogOut } from "lucide-react"
import { useAuth } from '../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

export function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const {toast} = useToast()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
      toast({
        title: 'Logout Successfully',
        description: 'See yaa ~',
      })
    } catch (error) {
      console.error('Logout failed', error)
    }
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-[#252525] text-gray-900 dark:text-white transition-all duration-300 ease-in-out flex flex-col h-full border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 bottom-0 z-50`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className={`font-bold text-xl ${isOpen ? "block" : "hidden"}`}>Xavior</h1>
        <Button variant="ghost" className='dark:hover:bg-gray-700' size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </Button>
      </div>
      <div className="flex flex-col justify-between flex-grow overflow-y-auto">
        <ScrollArea className="flex-grow w-full">
          <nav className="space-y-2 p-2">
            <Link to="/profile" className="w-full block" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
                <UserCircle className="mr-2 h-4 w-4" />
                {isOpen && "Profile"}

              </Button>
            </Link>
            <Link to="/review" className="w-full block" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
                <FileText className="mr-2 h-4 w-4" />
                {isOpen && "Review"}
              </Button>
            </Link>
          </nav>
        </ScrollArea>
        <div className="p-4 space-y-2 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                {isOpen && "Light Mode"}
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                {isOpen && "Dark Mode"}
              </>
            )}
          </Button>
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
            <LogOut className="mr-2 h-4 w-4" />
            {isOpen && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  )
}