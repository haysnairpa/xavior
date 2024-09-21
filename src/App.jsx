import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Review } from './components/Review';
import { Sidebar } from './components/SideBar';
import { Profile } from './components/Profile';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <Router>
          <div className="min-h-screen flex flex-col bg-white dark:bg-[#252525] text-foreground">
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/*' element={
                <ProtectedRoute>
                  <div className="flex h-full min-h-screen">
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className='flex-1 overflow-auto pl-16'>
                      <div className="p-4">
                        <Routes>
                          <Route path='/review' element={<Review/>}/>
                          <Route path='/profile' element={<Profile/>}/>
                          <Route index element={<Navigate to="/review" replace />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </ProtectedRoute>
              }/>
            </Routes>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
