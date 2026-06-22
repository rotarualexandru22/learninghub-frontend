import React, { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Award, BookOpen, Clock, Camera } from "lucide-react";
import Cropper from "react-easy-crop";
import axios from "axios";

const AccountPanel = () => {
  const { user, loginUser } = useAuth(); 

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div className="pt-32 text-center text-muted-foreground font-mono">
        Access denied. Please authenticate to view account parameters.
      </div>
    );
  }

  const getInitials = () => {
    const firstLetter = user.firstName ? user.firstName[0] : "";
    const lastLetter = user.lastName ? user.lastName[0] : "";
    return (firstLetter + lastLetter).toUpperCase() || "U";
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        alert("Security limit breached: File size must not exceed 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setIsCropping(true); 
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImageBase64 = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return canvas.toDataURL("image/jpeg", 0.85);
    } catch {
      return null;
    }
  };

  const handleUploadAvatar = async () => {
    setUploadLoading(true);
    const base64Image = await createCroppedImageBase64();

    if (!base64Image) {
      alert("Failed to compile cropped canvas matrix.");
      setUploadLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("learninghub_token") || ""; 
      const response = await axios.put(
        "http://localhost:5000/api/user/update-avatar",
        { avatar: base64Image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.user) {
        loginUser(response.data.user); 
      }

      setIsCropping(false);
      setImageSrc(null);
    } catch {
      alert("Failed to commit avatar override transaction to remote storage.");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header panou profil */}
        <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-col md:flex-row text-center md:text-left">
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative w-20 h-20 border-4 border-background rounded-2xl flex items-center justify-center font-black text-3xl font-mono shadow-xl overflow-hidden cursor-pointer bg-primary text-primary-foreground select-none shrink-0"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px]" />
              ) : (
                <span className="transition-all duration-300 group-hover:blur-[2px]">{getInitials()}</span>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                <Camera className="w-6 h-6 text-white stroke-[2.5px] animate-in zoom-in-75 duration-200" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground tracking-tight capitalize">
                {user.firstName} {user.lastName || ""}
              </h2>
              <p className="text-sm text-muted-foreground font-mono mt-1">@{user.username || "username"}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl text-primary text-xs font-bold uppercase tracking-wider font-mono">
            <Shield className="w-4 h-4" /> Role: {user.role || "User"}
          </div>
        </div>

        {/* Modal-ul de Crop */}
        {isCropping && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <h3 className="text-lg font-bold font-mono">Position your profile signature</h3>
                <p className="text-xs text-muted-foreground mt-1">Adjust crop matrix coordinates bounds perfectly inside the node viewport.</p>
              </div>

              <div className="relative w-full h-64 bg-muted rounded-xl overflow-hidden border border-border">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} 
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="rect"
                  showGrid={false}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-muted-foreground">
                  <span>ZOOM</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-primary bg-muted rounded-lg appearance-none h-2 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => { setIsCropping(false); setImageSrc(null); }}
                  disabled={uploadLoading}
                  className="w-full py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors font-mono cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadAvatar}
                  disabled={uploadLoading}
                  className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm font-mono tracking-wide hover:opacity-95 cursor-pointer disabled:opacity-50"
                >
                  {uploadLoading ? "Saving matrix..." : "Save image"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coloana stângă - Detalii utilizator */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground">Account Ledger</h3>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="capitalize">{user.firstName || "Not provided"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coloana dreaptă - Dinamizată cu Badges și Track-uri din baza de date */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Secțiunea de Credentials / Badges */}
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Earned Credentials / Badges
                </h3>
                <span className="text-xs font-mono font-bold bg-muted px-2 py-1 rounded-md text-foreground">
                  Count: {user.completedCourses?.length || 0}
                </span>
              </div>

              {user.completedCourses && user.completedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Întotdeauna deblocat dacă are cel puțin un curs activ/înrolat */}
                  <div className="p-4 bg-muted/30 border border-primary/20 rounded-xl flex items-center gap-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-full" />
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-bold">First Steps</p>
                      <p className="text-xs text-muted-foreground">Enrolled & Active</p>
                    </div>
                  </div>
                  
                  {/* Se deblochează la 5 cursuri terminate */}
                  {user.completedCourses.length >= 5 && (
                    <div className="p-4 bg-muted/30 border border-amber-500/20 rounded-xl flex items-center gap-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-full" />
                      <Award className="w-8 h-8 text-amber-500" />
                      <div>
                        <p className="text-sm font-bold">Knowledge Seeker</p>
                        <p className="text-xs text-muted-foreground">5 Cursuri terminate</p>
                      </div>
                    </div>
                  )}

                  {/* Se deblochează la 10 cursuri terminate */}
                  {user.completedCourses.length >= 10 && (
                    <div className="p-4 bg-muted/30 border border-purple-500/20 rounded-xl flex items-center gap-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/5 rounded-bl-full" />
                      <Award className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="text-sm font-bold">Elite Champion</p>
                        <p className="text-xs text-muted-foreground">10 Cursuri terminate</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-border rounded-xl bg-muted/10 select-none">
                  <Award className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">No badges earned yet</p>
                  <p className="text-xs text-muted-foreground mt-1 font-sans">Continue learning and parsing course blocks to unlock official credentials.</p>
                </div>
              )}
            </div>

            {/* Secțiunea de Active Learning Tracks */}
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Active Learning Tracks
              </h3>
              
              {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                <div className="p-4 bg-muted/30 border border-border rounded-xl">
                  <p className="text-xs font-mono text-primary font-bold uppercase tracking-wider">System pipeline active</p>
                  <p className="text-sm text-foreground mt-1">You are currently tracking {user.enrolledCourses.length} course nodes.</p>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-border rounded-xl bg-muted/10">
                  <Clock className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">No courses started yet</p>
                  <p className="text-xs text-muted-foreground mt-1 font-sans">Enrolled course nodes will map matrix paths inside this node.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountPanel;