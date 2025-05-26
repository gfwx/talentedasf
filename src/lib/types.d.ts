export type EventData = {
  championship_name: string | null;
  event_date: string;
  event_id: string;
  event_name: string | null;
  results: any | null;
  sport: string | null;
  uuid: string;
  athlete_id: string;
};

export type dataFormat = {
  id: string;
  name: string;
  age: string;
  gender: string;
  nationality: string;
  languages: string;
  highest_level: string;
  photo: string | null;
  bio: string;
  sponsorship_current: number;
  sponsorship_goal: number;
  username: string;
  quick_bio: {
    sport: string;
    experience: string;
    level: string;
    other_activity: string;
  };
  events?: EventData[];
  socials?: Socials;
};

export type OnboardingFormData = {
  sport: string;
  experience: string;
  level: string;
  otherActivity: string;
  name: string;
  age: string;
  gender: string;
  nationality: string;
  languages: string;
  highestLevel: string;
  photo: File | null;
  sponsorship_current: number;
  sponsorship_goal: number;
  username: string;
  bio: string;
};

export type Socials = {
  instagram: {
    url: string,
    follower_count: number,
  }
  twitter: {
    url: string,
    follower_count: number,
  }
  facebook: {
    url: string,
    follower_count: number,
  }
  youtube: {
    url: string,
    follower_count: number,
  }
};
