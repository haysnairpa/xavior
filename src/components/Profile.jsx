import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastAction } from "../components/ui/toast";
import { FileText, Loader2, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { doc, getDoc, setDoc, serverTimestamp , collection, query, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged, updateProfile, getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../hooks/useAuth";

export const Profile = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [profilePictureURL, setProfilePictureURL] = useState(
        user?.photoURL || ""
    );

    const [personalInfo, setPersonalInfo] = useState({
        fullname: "",
        username: "",
        email: "youremail@gmail.com",
        profession: "",
    });

    const [uploadHistory, setUploadHistory] = useState([]);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchuserData(user.uid);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUploadHistory = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userRef = doc(db, "Users", user.uid);
                    const historyRef = collection(userRef, "uploadHistory");
                    const q = query(historyRef, orderBy("uploadDate", "desc"));
                    const querySnapshot = await getDocs(q);
                    const history = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Fetched history:", history); // Untuk debugging
                    setUploadHistory(history);
                } catch (error) {
                    console.error("Error fetching upload history:", error);
                }
            }
        };

        fetchUploadHistory();
    }, []);

    const fetchuserData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "Users", uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setPersonalInfo((prevState) => ({
                    ...prevState,
                    fullname: userData.fullname || "",
                    username: userData.username || "",
                    email: userData.email || "",
                    profession: userData.profession || "",
                }));
                setProfilePictureURL(userData.profilePictureURL || "");
            }
        } catch (error) {
            console.log("Error fetching user data: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: e.target.value,
        });
    };

  const handleUpdate = async () => {
    const user = auth.currentUser
    if (user) {
      try {
        await setDoc(doc (db, "Users", user.uid), {
          ...personalInfo,
          profilePictureURL: profilePictureURL
        }, {merge: true})
        toast({
          title: 'Data updated successfully',
          description: 'Your data has been successfully updated',
          variant: 'success'
        })
      } catch (error) {

        toast({
          title: 'Error updating data',
          description: error.message,
          variant: 'destructive'
        })
      }
    }
    console.log('Data Updated:', personalInfo);
  };

    const handlePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            try {
                setLoading(true);
                await uploadProfilePicture(file);
            } catch (error) {
                console.error("Error updating profile picture: ", error);
                toast({
                    title: "Gagal memperbarui foto profil",
                    description:
                        "Terjadi kesalahan saat memperbarui foto profil. Silakan coba lagi.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        } else {
            toast({
                title: "Format file tidak didukung",
                description: "Harap pilih file gambar (JPG, PNG, dll).",
                variant: "destructive",
            });
        }
    };

    const uploadProfilePicture = async (file) => {
        const storage = getStorage();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) throw new Error("No user logged in");

        const storageRef = ref(storage, `profilePictures/${user.uid}`);

        // Upload file
        await uploadBytes(storageRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update user profile
        await updateProfile(user, { photoURL: downloadURL });

        // Update Firestore
        await setDoc(
            doc(db, "Users", user.uid),
            { profilePictureURL: downloadURL },
            { merge: true }
        );

        // Update local state
        setProfilePictureURL(downloadURL);

        toast({
            title: "Profile picture updated successfully",
            description: "Your profile picture has been successfully updated",
            variant: "success",
        });
    };

    const handleViewDetails = (item) => {
        // Logic for file detail
        console.log("View details for:", item);
        // Misal, file di klik, ada modal yang nampilin detail file, let's see later
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-10 w-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen dark:bg-[#252525] text-white p-4 lg:p-8 gap-4 lg:gap-8 overflow-auto">
            <Card className="w-full lg:w-64 bg-gray-100 dark:bg-[#1b1b23] border-none">
                <CardContent className="flex flex-col items-center p-6">
                    {profilePictureURL ? (
                        <img
                            src={profilePictureURL}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4"
                        />
                    ) : (
                        <UserIcon className="w-24 h-24 rounded-full mb-4 dark:text-white text-dark" />
                    )}
                    <h2 className="text-lg font-semibold mb-1">
                        {personalInfo.fullname}
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                        {personalInfo.profession}
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                    />
                    <Button
                        onClick={() => fileInputRef.current.click()}
                        className="w-full hover:bg-[#444] text-white"
                    >
                        Change Picture
                    </Button>
                    {loading && (
                        <Loader2 className="h-10 w-10 animate-spin mt-2" />
                    )}
                </CardContent>
            </Card>

            <Card className="flex-1 bg-gray-100 dark:bg-[#1b1b23] border-none overflow-auto">
                <CardContent className="p-4 lg:p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm mb-1">
                                Full name
                            </label>
                            <Input
                                name="fullname"
                                value={personalInfo.fullname}
                                onChange={handleInputChange}
                                className="dark:bg-transparent  dark:border-gray-600 "
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Username
                            </label>
                            <Input
                                name="username"
                                value={personalInfo.username}
                                onChange={handleInputChange}
                                className="dark:bg-transparent  dark:border-gray-600 "
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <Input
                                name="email"
                                value={personalInfo.email}
                                onChange={handleInputChange}
                                className="dark:bg-transparent  dark:border-gray-600 "
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Profession
                            </label>
                            <Input
                                name="profession"
                                value={personalInfo.profession}
                                onChange={handleInputChange}
                                className="dark:bg-transparent  dark:border-gray-600 "
                            />
                        </div>
                    </div>
                    <Button
                        onClick={handleUpdate}
                        className="hover:bg-[#444] w-full sm:w-auto text-white mb-4"
                    >
                        Update
                    </Button>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Upload History</h2>
                    <ScrollArea className="h-[200px]">
                        {uploadHistory.length > 0 ? (
                            uploadHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border border-gray-400 rounded-lg mb-2"
                                >
                                    <div className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4" />
                                        <div>
                                            <span className="font-medium">{item.fileName}</span>
                                            <p className="text-xs text-gray-400">
                                                {item.uploadDate ? new Date(item.uploadDate.toDate()).toLocaleString() : 'Date not available'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-blue-400 hover:text-blue-300"
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p>No upload history available.</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
