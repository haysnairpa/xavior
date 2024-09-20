import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { FileText } from "lucide-react";
import { useTheme } from "next-themes"

export const Profile = () => {

  const { theme } = useTheme()
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    profession: 'Designer'
  });

  const handleInputChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Data disimpan:', personalInfo);
  };

  const handlePictureChange = () => {
    console.log('Memicu dialog unggah file');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen dark:bg-[#252525] text-white p-4 lg:p-8 gap-4 lg:gap-8">
      <Card className="w-full lg:w-64 dark:bg-[#1b1b23] border-none">
        <CardContent className="flex flex-col items-center p-6">
          <img src="/path-to-profile-image.jpg" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-lg font-semibold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h2>
          <p className="text-sm text-gray-400 mb-4">{personalInfo.profession}</p>
          <Button onClick={handlePictureChange} className="w-full  hover:bg-[#444] text-white">
            Change Picture
          </Button>
        </CardContent>
      </Card>

      <Card className="flex-1 dark:bg-[#1b1b23] border-none">
        <CardContent className="p-4 lg:p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm mb-1">First name</label>
              <Input name="firstName" value={personalInfo.firstName} onChange={handleInputChange} 
                     className="dark:bg-transparent border-gray-400 dark:border-gray-600 " />
            </div>
            <div>
              <label className="block text-sm mb-1">Last name</label>
              <Input name="lastName" value={personalInfo.lastName} onChange={handleInputChange} 
                     className="dark:bg-transparent border-gray-400 dark:border-gray-600 " />
            </div>
            <div>
              <label className="block text-sm mb-1">Username</label>
              <Input name="username" value={personalInfo.username} onChange={handleInputChange} 
                     className="dark:bg-transparent border-gray-400 dark:border-gray-600 " />
            </div>
            <div>
              <label className="block text-sm mb-1">Profession</label>
              <Input name="profession" value={personalInfo.profession} onChange={handleInputChange} 
                     className="dark:bg-transparent border-gray-400 dark:border-gray-600 " />
            </div>
          </div>
          <Button onClick={handleUpdate} className="hover:bg-[#444] sm:w-full lg:w-auto text-white">Update</Button>

          <h2 className="text-xl font-semibold mt-8 mb-4">Upload History</h2>
          <ScrollArea className="h-[200px]">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border border-gray-400 rounded-lg mb-2">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <div>
                    <span className="font-medium">First Essay</span>
                    <p className="text-xs text-gray-400">firstessay.docx</p>
                  </div>
                </div>
                <Button variant="link" className="text-blue-400 hover:text-blue-300">Click to see more</Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
