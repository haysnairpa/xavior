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

export function Sidebar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
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
        isCollapsed ? "w-16" : "w-64"
      } bg-white dark:bg-[#252525] text-gray-900 dark:text-white transition-all duration-300 ease-in-out flex flex-col h-full border-r border-gray-200 dark:border-gray-700 `}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className={`font-bold text-xl ${isCollapsed ? "hidden" : "block"}`}>AI Essay Review</h1>
        <Button variant="ghost" className='dark:hover:bg-gray-700' size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-2">
          <Link to="/profile">
            <Button variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
              <UserCircle className="mr-2 h-4 w-4" />
              {!isCollapsed && "Profile"}
            </Button>
          </Link>
          <Link to="/review">
            <Button variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              {!isCollapsed && "Review"}
            </Button>
          </Link>
        </nav>
      </ScrollArea>
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              {!isCollapsed && "Light Mode"}
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              {!isCollapsed && "Dark Mode"}
            </>
          )}
        </Button>
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start dark:hover:bg-gray-700">
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}