"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

type EventData = {
  championship_name: string | null;
  event_date: string;
  event_id?: string;
  event_name: string | null;
  results: any | null;
  sport: string | null;
  uuid?: string;
  athlete_id?: string;
};

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [newEvent, setNewEvent] = useState<EventData>({
    championship_name: "",
    event_date: new Date().toISOString(),
    event_name: "",
    results: null,
    sport: "",
  });
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    async function fetchProfileAndEvents() {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch profile data
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
      
      // Fetch events data
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("athlete_id", user.id);
      
      if (eventsError) {
        console.error("Error fetching events:", eventsError);
      } else {
        setEvents(eventsData || []);
      }

      setLoading(false);
    }

    fetchProfileAndEvents();
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

  const handleEventInputChange = (field: keyof EventData, value: any) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEvent = async () => {
    if (!profileData) return;
    
    setLoadingEvents(true);
    
    const eventToAdd = {
      ...newEvent,
      athlete_id: profileData.id,
    };
    
    const { data, error } = await supabase
      .from("events")
      .insert(eventToAdd)
      .select();
      
    if (error) {
      toast.error("Failed to add event");
      console.error("Error adding event:", error);
    } else {
      toast.success("Event added successfully");
      setEvents(prev => [...prev, data[0]]);
      setNewEvent({
        championship_name: "",
        event_date: new Date().toISOString(),
        event_name: "",
        results: null,
        sport: "",
      });
    }
    
    setLoadingEvents(false);
  };
  
  const handleDeleteEvent = async (eventId: string) => {
    setLoadingEvents(true);
    
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("event_id", eventId);
      
    if (error) {
      toast.error("Failed to delete event");
      console.error("Error deleting event:", error);
    } else {
      toast.success("Event deleted successfully");
      setEvents(prev => prev.filter(event => event.event_id !== eventId));
    }
    
    setLoadingEvents(false);
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

    // Update user display name if full name has changed
    const { error: updateUserError } = await supabase.auth.updateUser({
      data: {
        full_name: profileData.name,
        name: profileData.name
      }
    });

    if (updateUserError) {
      console.error("Error updating user display name:", updateUserError);
    }

    // Update profile data
    const { error } = await supabase
      .from("athletes")
      .update({
        ...profileData,
        photo: photoPath,
      })
      .eq("id", profileData.id);

    if (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } else {
      toast.success("Profile updated successfully");
      // Refresh the home page data
      router.refresh();
    }

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
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
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No events added yet</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.event_id} className="border p-3 rounded-md relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => handleDeleteEvent(event.event_id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="font-medium">{event.event_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.championship_name} • {event.sport}
                        </div>
                        <div className="text-sm mt-1">
                          {new Date(event.event_date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event_name">Event Name</Label>
                    <Input
                      id="event_name"
                      value={newEvent.event_name || ""}
                      onChange={(e) => handleEventInputChange("event_name", e.target.value)}
                      placeholder="e.g. 100m Sprint Finals"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="championship_name">Championship</Label>
                    <Input
                      id="championship_name"
                      value={newEvent.championship_name || ""}
                      onChange={(e) => handleEventInputChange("championship_name", e.target.value)}
                      placeholder="e.g. World Athletics Championship"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Input
                      id="sport"
                      value={newEvent.sport || ""}
                      onChange={(e) => handleEventInputChange("sport", e.target.value)}
                      placeholder="e.g. Athletics"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newEvent.event_date ? (
                            format(new Date(newEvent.event_date), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(newEvent.event_date)}
                          onSelect={(date) => 
                            handleEventInputChange("event_date", date?.toISOString() || new Date().toISOString())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={handleAddEvent}
                    disabled={loadingEvents || !newEvent.event_name}
                    className="w-full"
                  >
                    {loadingEvents ? "Adding..." : "Add Event"}
                    {!loadingEvents && <PlusCircle className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
