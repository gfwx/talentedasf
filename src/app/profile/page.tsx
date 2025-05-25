"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";

type QuickBio = {
  sport: string;
  experience: string;
  level: string;
  other_activity: string;
};

type ProfileData = {
  id: string;
  name: string;
  age: string;
  gender: string;
  nationality: string;
  languages: string;
  highest_level: string;
  photo: string | null;
  sponsorship_current: number;
  sponsorship_goal: number;
  username: string;
  quick_bio: QuickBio;
};

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }

      setProfileData(data);

      if (data.photo) {
        const { data: imageData } = await supabase
          .storage
          .from("pfp")
          .getPublicUrl(data.photo);

        setImageUrl(imageData.publicUrl);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev =>
        prev ? {
          ...prev,
          [parent]: {
            ...prev[parent as keyof ProfileData] as object,
            [child]: value
          }
        } : null
      );
    } else {
      setProfileData(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!profileData) {
      setLoading(false);
      return;
    }

    // Upload new image if selected
    let photoPath = profileData.photo;
    if (selectedImage) {
      const path = `avatars/${profileData.id}/pfp.png`;
      const { error: uploadError } = await supabase.storage
        .from("pfp")
        .upload(path, selectedImage, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!uploadError) {
        photoPath = path;
      } else {
        console.error("Error uploading image:", uploadError);
      }
    }

    // Update profile data
    const { error } = await supabase
      .from("athletes")
      .update({
        ...profileData,
        photo: photoPath,
      })
      .eq("id", profileData.id);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p>Unable to load your profile information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleImageChange}
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profileData.username || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                value={profileData.age || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                value={profileData.gender || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                name="nationality"
                value={profileData.nationality || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                name="languages"
                value={profileData.languages || ""}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Athletic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quick_bio.sport">Sport</Label>
              <Input
                id="quick_bio.sport"
                name="quick_bio.sport"
                value={profileData.quick_bio?.sport || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quick_bio.experience">Experience (years)</Label>
              <Input
                id="quick_bio.experience"
                name="quick_bio.experience"
                value={profileData.quick_bio?.experience || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quick_bio.level">Current Level</Label>
              <Input
                id="quick_bio.level"
                name="quick_bio.level"
                value={profileData.quick_bio?.level || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highest_level">Highest Level Achieved</Label>
              <Input
                id="highest_level"
                name="highest_level"
                value={profileData.highest_level || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="quick_bio.other_activity">Other Activities</Label>
              <Textarea
                id="quick_bio.other_activity"
                name="quick_bio.other_activity"
                value={profileData.quick_bio?.other_activity || ""}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sponsorship Goals</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sponsorship_current">Current Sponsorship Amount</Label>
              <Input
                id="sponsorship_current"
                name="sponsorship_current"
                type="number"
                value={profileData.sponsorship_current || 0}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sponsorship_goal">Sponsorship Goal</Label>
              <Input
                id="sponsorship_goal"
                name="sponsorship_goal"
                type="number"
                value={profileData.sponsorship_goal || 0}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <div>Progress</div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${Math.min(100, ((profileData.sponsorship_current || 0) / (profileData.sponsorship_goal || 1)) * 100)}%`
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
