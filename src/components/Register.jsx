import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { useToast } from '@/hooks/use-toast'
import {Toast, ToastAction} from './ui/toast'
import { auth, googleProvider, db } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import GoogleIcon from '../assets/icons8-google-48.png';

export const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [user, setUser] = useState("")

    const {toast} = useToast()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const signIn = async (e) => {
      e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user);
            await setDoc(doc(db, "Users", user.uid), {
              username: username,
              email: user.email,
            })
            toast({
              title: 'Your account has been created successfully',
              description: 'Go to login page to sign in to your account',
              variant: 'success',
              action: <ToastAction altText="Register Successfully">Got it!</ToastAction>
            })
        } catch (error) {
            console.log(error);
            toast({
              title: 'Create user failed',
              description: 'Please check your email and password',
              variant: 'destructive'
            })
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            toast({
              title: 'User signed in with Google successfully',
              description: 'You are now signed in to your Google account',
              variant: 'success'
            })
        } catch (error) {
            toast({
              title: 'Sign in with Google failed',
              description: 'Please check your Google account',
              variant: 'destructive'
            })
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)  
            toast({
              title: 'User signed out successfully',
              description: 'You are now signed out from your account',
              variant: 'success',
              action: <ToastAction altText="Sign out Successfully">Okay</ToastAction>
            })
        } catch (error) {
            toast({
              title: 'Sign out failed',
              description: 'Please check your account',
              variant: 'destructive'
            })
        } 
    }

    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#252525] p-4">
        <div className="w-full max-w-md">
          <Card className="bg-[#1B1B23] text-white shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white text-center">Welcome to Essaier!</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-400 text-center">
                Ready to prepare for your next job? Fill in the details below, and let the journey begin!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={signIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input id="username" placeholder="Create your username" onChange={(e) => setUsername(e.target.value)} className="bg-transparent text-white border-[#333]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" placeholder="youremail@gmail.com" onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-white border-[#333]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input id="password" type="password" placeholder="Create a strong password" onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-white border-[#333]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your password" onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-white border-[#333]" />
                </div>
                <Button type="submit" className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white">
                  Sign Up
                </Button>
              </form>
              <div className="text-center text-gray-400 my-2">or</div>
              <Button variant="outline" className="w-full border-[#333] text-white hover:bg-white/5" onClick={signInWithGoogle}>
                <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
                Sign Up with Google
              </Button>
            </CardContent>

          </Card>
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400 text-center">
              Already have an account? <a href="/login" className="text-white hover:text-gray-300">Login here.</a>
            </p>
          </div>
        </div>
      </div>
    );
}


