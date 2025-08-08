"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { Atom, Braces, BrainCircuit, Code2, Database, ImagePlus, Pencil, Save, ShieldCheck, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const {user}=useAuth();
  const [form, setForm] = useState({
    username: "john_doe",
    email: "john@example.com",
    phone: "9876543210",
    isVerified: true,
    profileImage: "/profile_male.png",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const handleSaveImage = () => {
    setForm(prev => ({ ...prev, profileImage: selectedImage }));
    setSelectedImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 px-2 sm:px-4">
      <Card className="overflow-hidden shadow-lg relative border border-gray-200">
        <Button className="absolute top-4 right-4 bg-red-700 text-white hover:text-red-700 cursor-pointer" variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-1" /> Log Out
        </Button>

        <CardHeader className="flex flex-col items-center gap-4 pt-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md">
            <Image
              src={selectedImage || form.profileImage}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="mt-2 flex flex-col items-center gap-2">
            <label htmlFor="upload-profile" className="cursor-pointer flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline">
              <ImagePlus className="w-4 h-4" />
              {form.profileImage === "/profile_male.png" ? "Upload Profile Image" : "Update Profile Image"}
            </label>
            <input
              id="upload-profile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {selectedImage && (
              <Button onClick={handleSaveImage} className="text-sm" size="sm">
                <Save className="w-4 h-4 mr-2" /> Save Image
              </Button>
            )}
          </div>

          <div className={`flex items-center gap-2 text-base sm:text-lg font-medium  mt-2 ${user.isVerified ? 'text-green-500' : 'text-yellow-500'}`}>
            <ShieldCheck className={`w-5 h-5 ${user.isVerified ? 'text-green-500' : 'text-yellow-500'}`} />
            {user.isVerified ? "Account Verified" : "Account Not Verified"}
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-6 pb-8">
          {/* Personal Details */}
          <div className="w-full bg-white py-4 px-2 rounded-sm border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-600">Personal Details</h3>
              {/* <Button variant="ghost" size="icon" className="text-indigo-600 hover:bg-indigo-50">
                <Pencil className="w-5 h-5" />
              </Button> */}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500 font-medium">Username</span>
                <span className="text-gray-800 font-semibold">{user.username}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="text-gray-800 font-semibold">{user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Phone</span>
                <span className="text-gray-800 font-semibold">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Horizontal Cards Section */}
          <div className="mt-10 w-full pb-2 px-2">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Your Questions by Subject</h2>
            <div className="flex sm:flex-row flex-col gap-2 sm:gap-4 items-center justify-between overflow-x-auto">
              {[
                { icon: <Atom className="w-8 h-8 text-indigo-500" />, label: "React.js", count: user.reactjs },
                { icon: <Braces className="w-8 h-8 text-pink-500" />, label: "JavaScript", count: user.javascript },
                { icon: <Database className="w-8 h-8 text-green-500" />, label: "SQL", count: user.sql },
                { icon: <BrainCircuit className="w-8 h-8 text-yellow-500" />, label: "DSA", count: user.dsa },
                { icon: <Code2 className="w-8 h-8 text-purple-500" />, label: "Node.js", count: user.nodejs },
              ].map((item, index) => (
                <Card key={index} className="sm:w-32 min-w-[8rem] w-full flex flex-col gap-2 items-center p-2 shadow-none rounded-2xl">
                  {item.icon}
                  <p className="text-sm font-medium text-gray-600 capitalize">{item.label}</p>
                  <span className="text-lg font-bold text-gray-800">{item.count}</span>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
