export type dataFormat = {
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
    quick_bio: {
        sport: string;
        experience: string;
        level: string;
        other_activity: string;
    };
};
