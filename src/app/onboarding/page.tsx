"use client";

import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import Image from "next/image";
import {
    doSomething,
    finishOnboarding,
    type OnboardingFormData,
} from "../actions";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [photoPreview, setPhotoPreview] = useState<string>("");
    const [formData, setFormData] = useState<OnboardingFormData>({
        sport: "",
        experience: "",
        level: "",
        otherActivity: "",
        name: "",
        age: "",
        gender: "",
        nationality: "",
        languages: "",
        highestLevel: "",
        photo: null,
        username: "",
        sponsorship_current: 0,
        sponsorship_goal: 0,
        bio: "",
    });

    const totalSteps = 6;
    const progress = (step / totalSteps) * 100;

    const handleInputChange = (
        field: keyof OnboardingFormData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                photo: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.sport.trim() !== "";
            case 2:
                return formData.experience.trim() !== "";
            case 3:
                return formData.level.trim() !== "";
            case 4:
                return formData.otherActivity.trim() !== "";
            case 5:
                return (
                    formData.name.trim() !== "" &&
                    formData.age.trim() !== "" &&
                    formData.gender.trim() !== "" &&
                    formData.nationality.trim() !== "" &&
                    formData.languages.trim() !== "" &&
                    formData.highestLevel.trim() !== ""
                );

            case 6:
                return (
                    formData.bio.trim() !== "" &&
                    formData.username.trim() !== "" &&
                    formData.sponsorship_goal !== 0
                );

            default:
                return false;
        }
    };

    const handleNext = () => {
        if (step < totalSteps && isStepValid()) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (fdata: FormData) => {
        if (isStepValid()) {
            await finishOnboarding(formData);
            router.push("/");
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-4">
            <form className="w-full max-w-2xl space-y-8">
                <div className="space-y-2 text-center">
                    {step < 6 ? (
                        <>
                            <h1 className="text-3xl font-bold">
                                Before we move forward,
                            </h1>
                            <h2 className="text-2xl">
                                Let's complete your profile.
                            </h2>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold">
                                We're almost done!
                            </h1>
                        </>
                    )}
                </div>

                <Card className="w-full">
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">
                                    {step < 5
                                        ? "1. Give us a quick intro"
                                        : step < 6
                                          ? "2. Basic Information"
                                          : "3. Finishing touches"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {step < 5
                                        ? "Sum up you in 4 short questions. This will be displayed on your profile."
                                        : step < 6
                                          ? "Information that will make up the foundations of your profile."
                                          : "Information that will help sponsors understand you better."}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="sport">
                                            What sport are you competing in?
                                        </Label>
                                        <Input
                                            id="sport"
                                            placeholder="In one word"
                                            value={formData.sport}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "sport",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="experience">
                                            How long have you been competing in
                                            the sport?
                                        </Label>
                                        <Input
                                            id="experience"
                                            placeholder="For the last __ years"
                                            value={formData.experience}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "experience",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="level">
                                            What championship / level are you
                                            currently competing in?
                                        </Label>
                                        <Input
                                            id="level"
                                            placeholder="Enter your current level"
                                            value={formData.level}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "level",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="otherActivity">
                                            What is the one thing that you're
                                            doing outside of sports?
                                        </Label>
                                        <Input
                                            id="otherActivity"
                                            placeholder="Tell us about your other interests"
                                            value={formData.otherActivity}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "otherActivity",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex gap-6">
                                                <div className="w-1/3">
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative h-[200px] overflow-hidden">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            onChange={
                                                                handleFileChange
                                                            }
                                                        />
                                                        {photoPreview ? (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <Image
                                                                    src={
                                                                        photoPreview
                                                                    }
                                                                    alt="Profile preview"
                                                                    fill
                                                                    style={{
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Pencil className="w-6 h-6 text-gray-400" />
                                                                <span className="text-sm text-gray-500">
                                                                    Add a photo
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-2/3 space-y-4">
                                                    <div>
                                                        <Label htmlFor="name">
                                                            Full Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            value={
                                                                formData.name
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label htmlFor="age">
                                                                Age
                                                            </Label>
                                                            <Input
                                                                id="age"
                                                                type="number"
                                                                value={
                                                                    formData.age
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        "age",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="gender">
                                                                Gender
                                                            </Label>
                                                            <Input
                                                                id="gender"
                                                                value={
                                                                    formData.gender
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        "gender",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="nationality">
                                                        Nationality
                                                    </Label>
                                                    <Input
                                                        id="nationality"
                                                        value={
                                                            formData.nationality
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "nationality",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="languages">
                                                        Languages
                                                    </Label>
                                                    <Input
                                                        id="languages"
                                                        value={
                                                            formData.languages
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "languages",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="highestLevel">
                                                        Highest Level Achieved
                                                    </Label>
                                                    <Input
                                                        id="highestLevel"
                                                        value={
                                                            formData.highestLevel
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "highestLevel",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {step === 6 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-6">
                                            <div>
                                                <Label htmlFor="username">
                                                    "Create a username (not
                                                    validated)
                                                </Label>
                                                <Input
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "username",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="bio">Bio</Label>
                                                <Input
                                                    type="textarea"
                                                    id="bio"
                                                    value={formData.bio}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "bio",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="sponsorship_goal">
                                                    Sponsorship Goal
                                                </Label>
                                                <Input
                                                    id="sponsorship_goal"
                                                    value={
                                                        formData.sponsorship_goal
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "sponsorship_goal",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                            className="bg-primary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 1}
                        >
                            Go back
                        </Button>
                        {step < 6 ? (
                            <Button
                                onClick={handleNext}
                                disabled={!isStepValid()}
                            >
                                Continue
                            </Button>
                        ) : (
                            <SubmitButton
                                formAction={handleSubmit}
                                disabled={!isStepValid()}
                            >
                                Submit
                            </SubmitButton>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
