import React, { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import GoogleIcon from '../assets/icons8-google-48.png';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user } = useAuth();
	const navigate = useNavigate();

	const {toast} = useToast()

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login succcessfully',
        description: 'You are now logged in to your account',
        variant: 'success',
      })

			navigate('/');
		} catch (error) {
			console.log(error);
      toast({
        title: 'Login Failed',
        description: 'Please check your email and password',
        variant: 'destructive'
      })
		}
	}

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider)
			
			toast({
				title: 'Login with Google Successfully',
				description: 'You are now logged in to your account',
				variant: 'success'
			})

			navigate('/')
				} catch (error) {
					console.log(error)
			toast({
				title: 'Login Failed',
				description: 'Please check your goggle account.',
				variant: 'destructive'
			})
		}
	}

	const logOut = async () => {
		try {
			await signOut(auth)
      toast({
        title: 'Logout successfully',
        description: 'See yaa ~',
        variant: 'default'
      })
		} catch (error) {
			console.log(error)
		} 
	}

	return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#252525] p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#1B1B23] p-4 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold mb-2 text-center">Welcome Back, Essaier!</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-400 text-center">
              We are excited to have you back. Log in now and access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username or Email</Label>
                <Input
                  id="email"
                  placeholder="youremail@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white border-[#333] focus:border-[#0066ff]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white border-[#333] focus:border-[#0066ff]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-xs sm:text-sm text-gray-400">Remember me</label>
                </div>
                <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-gray-300">Forgot your password?</a>
              </div>
              {!user ? (
                <>
                  <Button className="w-full bg-[#0066ff] hover:bg-[#0052cc]" onClick={signIn}>
                    Log In
                  </Button>
                  <div className="text-center text-gray-400 my-3">or</div>
                  <Button
                    variant="outline"
                    className="w-full border-[#333] hover:bg-[rgba(255,255,255,0.05)] text-white"
                    onClick={signInWithGoogle}
                  >
                    <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
                    Sign in with Google
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-[#333] hover:bg-[rgba(255,255,255,0.05)] text-white mt-3"
                  onClick={logOut}
                >
                  <LogoutRoundedIcon className="mr-2" /> Log Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Don't have an account yet? <a href="/register" className="text-white hover:text-gray-300">Register here</a>
          </p>
        </div>
      </div>
    </div>
	);
}