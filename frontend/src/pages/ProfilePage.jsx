import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User, Pen, File, CircleX } from "lucide-react";
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { updateUserDetails } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Editing the user details
  const [isUpdate, setUpdate] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: authUser?.fullName,
    email: authUser?.email,
  });
  const handleDetailsChange = () => {
    const username = document.getElementById("name");
    const email = document.getElementById("email");
    const EditBtn = document.getElementById("EditBtn");
    EditBtn.classList.add("hidden");
    username.style.cursor = "text";
    email.style.cursor = "text";
    username.disabled = false;
    email.disabled = false;

    setUpdate(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const saveDetails = async () => {
    await updateUserDetails({
      fullName: userProfile.fullName,
      email: userProfile.email,
    });
    setUpdate(false);
    EditBtn.classList.remove("hidden");
  };

  const toggleEdit = () => {
    const EditBtn = document.getElementById("EditBtn");
    const username = document.getElementById("name");
    const email = document.getElementById("email");
    setUpdate(false);
    username.style.cursor = "not-allowed";
    email.style.cursor = "not-allowed";
    username.disabled = true;
    email.disabled = true;
    setUserProfile({
      fullName: authUser?.fullName,
      email: authUser?.email,
    });
    EditBtn.classList.remove("hidden");
  };

  return (
    <div className="h-scren pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "user.webp  "}
                  className="size-32 rounded-full object-cover border-4"
                  alt="Profile"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full
                    cursor-pointer transition-all duration-200 ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none"
                        : ""
                    } `}
                >
                  <Camera className="size-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>
            {/* User Info Section */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm  text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full name
                </div>
                <input
                  className="px-4 py-2.5 text-left  w-full  hover:cursor-not-allowed bg-base-200 rounded-lg border"
                  type="text"
                  id="name"
                  name="fullName"
                  onChange={handleChange}
                  disabled="true"
                  value={userProfile.fullName}
                />
              </div>
              <div className="space-y-1.5 ">
                <div className="text-sm  text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <input
                  className="px-4 py-2.5 text-left float-left w-full  hover:cursor-not-allowed bg-base-200 rounded-lg border"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  value={userProfile.email}
                  name="email"
                  disabled="true"
                />
              </div>
              <button
                onClick={handleDetailsChange}
                id="EditBtn"
                className="btn btn-outline btn-primary float-end"
              >
                <Pen className="w-4 h-4" /> Edit
              </button>
              {isUpdate && (
                <>
                  <button
                    onClick={toggleEdit}
                    className="btn btn-outline btn-primary mx-4 float-end"
                  >
                    <CircleX className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={saveDetails}
                    className="btn btn-outline btn-primary float-end"
                  >
                    <File className="w-4 h-4" /> Save
                  </button>
                </>
              )}
            </div>

            <div className="mt-36 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
