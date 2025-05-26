"use client";

import { useState, useEffect } from "react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Socials } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

import { formatNumber } from "@/lib/utils";

type SocialMediaProps = {
  socials?: Socials;
  size?: "sm" | "md" | "lg";
  showFollowerCount?: boolean;
  className?: string;
};

export function SocialMediaLink({
  socials,
  size = "md",
  showFollowerCount = true,
  className = "",
}: SocialMediaProps) {
  if (!socials) return null;

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const badgeSizes = {
    sm: "text-xs py-0 px-1.5",
    md: "text-sm py-0.5 px-2",
    lg: "text-md py-1 px-2.5",
  };

  const iconSize = iconSizes[size];
  const badgeSize = badgeSizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.instagram?.url && (
        <div className="flex items-center gap-1">
          <a
            href={socials.instagram.url.startsWith('http') ? socials.instagram.url : `https://${socials.instagram.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 transition-colors"
          >
            <Instagram size={iconSize} />
          </a>
          {showFollowerCount && socials.instagram.follower_count > 0 && (
            <Badge variant="outline" className={badgeSize}>
              {formatNumber(socials.instagram.follower_count)}
            </Badge>
          )}
        </div>
      )}

      {socials.twitter?.url && (
        <div className="flex items-center gap-1">
          <a
            href={socials.twitter.url.startsWith('http') ? socials.twitter.url : `https://${socials.twitter.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Twitter size={iconSize} />
          </a>
          {showFollowerCount && socials.twitter.follower_count > 0 && (
            <Badge variant="outline" className={badgeSize}>
              {formatNumber(socials.twitter.follower_count)}
            </Badge>
          )}
        </div>
      )}

      {socials.facebook?.url && (
        <div className="flex items-center gap-1">
          <a
            href={socials.facebook.url.startsWith('http') ? socials.facebook.url : `https://${socials.facebook.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Facebook size={iconSize} />
          </a>
          {showFollowerCount && socials.facebook.follower_count > 0 && (
            <Badge variant="outline" className={badgeSize}>
              {formatNumber(socials.facebook.follower_count)}
            </Badge>
          )}
        </div>
      )}

      {socials.youtube?.url && (
        <div className="flex items-center gap-1">
          <a
            href={socials.youtube.url.startsWith('http') ? socials.youtube.url : `https://${socials.youtube.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            <Youtube size={iconSize} />
          </a>
          {showFollowerCount && socials.youtube.follower_count > 0 && (
            <Badge variant="outline" className={badgeSize}>
              {formatNumber(socials.youtube.follower_count)}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export function SocialMediaEditor({
  socials,
  onChange,
}: {
  socials?: Socials;
  onChange: (socials: Socials) => void;
}) {
  const [socialData, setSocialData] = useState<Socials>({
    instagram: { url: "", follower_count: 0 },
    twitter: { url: "", follower_count: 0 },
    facebook: { url: "", follower_count: 0 },
    youtube: { url: "", follower_count: 0 },
  });

  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({
    instagram: false,
    twitter: false,
    facebook: false,
    youtube: false,
  });

  useEffect(() => {
    if (socials) {
      setSocialData(socials);
    }
  }, [socials]);

  const handleInputChange = (
    platform: keyof Socials,
    value: string
  ) => {
    setSocialData((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        url: value,
      },
    }));

    onChange({
      ...socialData,
      [platform]: {
        ...socialData[platform],
        url: value,
      },
    });
  };

  const fetchFollowerCount = async (platform: keyof Socials) => {
    setLoading((prev) => ({ ...prev, [platform]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // No official API so need to simul here
      let followerCount = 0;
      switch (platform) {
        case "instagram":
          followerCount = Math.floor(Math.random() * 1000000) + 10000;
          break;
        case "twitter":
          followerCount = Math.floor(Math.random() * 500000) + 5000;
          break;
        case "facebook":
          followerCount = Math.floor(Math.random() * 2000000) + 20000;
          break;
        case "youtube":
          followerCount = Math.floor(Math.random() * 300000) + 1000;
          break;
      }

      const updatedSocials = {
        ...socialData,
        [platform]: {
          ...socialData[platform],
          follower_count: followerCount,
        },
      };

      setSocialData(updatedSocials);
      onChange(updatedSocials);
    } catch (error) {
      console.error(`Error fetching ${platform} follower count:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Instagram size={20} className="text-pink-600" />
          <label htmlFor="instagram" className="text-sm font-medium">
            Instagram
          </label>
        </div>
        <div className="flex gap-2">
          <input
            id="instagram"
            type="text"
            placeholder="https://instagram.com/username"
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            value={socialData.instagram.url}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
          />
          <button
            className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            onClick={() => fetchFollowerCount("instagram")}
            disabled={!socialData.instagram.url || loading.instagram}
          >
            {loading.instagram ? "Loading..." : "Fetch Count"}
          </button>
        </div>
        {socialData.instagram.follower_count > 0 && (
          <p className="text-xs text-gray-500">
            Followers: {formatNumber(socialData.instagram.follower_count)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Twitter size={20} className="text-blue-400" />
          <label htmlFor="twitter" className="text-sm font-medium">
            Twitter
          </label>
        </div>
        <div className="flex gap-2">
          <input
            id="twitter"
            type="text"
            placeholder="https://twitter.com/username"
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            value={socialData.twitter.url}
            onChange={(e) => handleInputChange("twitter", e.target.value)}
          />
          <button
            className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            onClick={() => fetchFollowerCount("twitter")}
            disabled={!socialData.twitter.url || loading.twitter}
          >
            {loading.twitter ? "Loading..." : "Fetch Count"}
          </button>
        </div>
        {socialData.twitter.follower_count > 0 && (
          <p className="text-xs text-gray-500">
            Followers: {formatNumber(socialData.twitter.follower_count)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Facebook size={20} className="text-blue-600" />
          <label htmlFor="facebook" className="text-sm font-medium">
            Facebook
          </label>
        </div>
        <div className="flex gap-2">
          <input
            id="facebook"
            type="text"
            placeholder="https://facebook.com/username"
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            value={socialData.facebook.url}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
          />
          <button
            className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            onClick={() => fetchFollowerCount("facebook")}
            disabled={!socialData.facebook.url || loading.facebook}
          >
            {loading.facebook ? "Loading..." : "Fetch Count"}
          </button>
        </div>
        {socialData.facebook.follower_count > 0 && (
          <p className="text-xs text-gray-500">
            Followers: {formatNumber(socialData.facebook.follower_count)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Youtube size={20} className="text-red-600" />
          <label htmlFor="youtube" className="text-sm font-medium">
            YouTube
          </label>
        </div>
        <div className="flex gap-2">
          <input
            id="youtube"
            type="text"
            placeholder="https://youtube.com/c/channelname"
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            value={socialData.youtube.url}
            onChange={(e) => handleInputChange("youtube", e.target.value)}
          />
          <button
            className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            onClick={() => fetchFollowerCount("youtube")}
            disabled={!socialData.youtube.url || loading.youtube}
          >
            {loading.youtube ? "Loading..." : "Fetch Count"}
          </button>
        </div>
        {socialData.youtube.follower_count > 0 && (
          <p className="text-xs text-gray-500">
            Subscribers: {formatNumber(socialData.youtube.follower_count)}
          </p>
        )}
      </div>
    </div>
  );
}
