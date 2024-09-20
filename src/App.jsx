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
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <Router>
          <div className="h-screen flex items-center justify-center bg-white dark:bg-[#252525] text-foreground">
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/*' element={
                <ProtectedRoute>
                  <div className="flex w-full h-full">
                    <Sidebar />
                    <main className='flex-1 overflow-auto'>
                      <Routes>
                        <Route path='/review' element={<Review/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route index element={<Navigate to="/review" replace />} />
                      </Routes>
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
