"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { OnboardingFormData } from "@/lib/types";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName =
    formData.get("firstName")?.toString() +
    " " +
    formData.get("lastName")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        name: fullName,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    let user = data.user;
    if (!user)
      return encodedRedirect("error", "/sign-up", "User signup failed.");
    const { error } = await supabase.from("users").insert({
      id: user.id,
      full_name: user.user_metadata.full_name ?? "John Doe",
      email_id: user.email,
      user_role: "user",
      is_active: true,
    });

    console.log(error);

    return encodedRedirect("success", "/onboarding", "");
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Email is required"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

const validateIfUserExists = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getUser();
  return error || !data.user ? false : true;
};

export const finishOnboarding = async (
  onboardingFormData: OnboardingFormData
) => {
  const res = onboardingFormData;
  const supabase = await createClient();
  if (!validateIfUserExists) {
    console.log("Something went wrong.");
    return redirect("/error");
  }

  const user = (await supabase.auth.getUser()).data.user ?? null;

  if (user) {
    let storageUploadSuccess = true;
    const path = `avatars/${user.id}/pfp.png`;
    if (res.photo) {
      const { error } = await supabase.storage
        .from("pfp")
        .upload(path, res.photo, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        storageUploadSuccess = false;
        console.log(`Upload error: ${error.message}`);
      }
    }

    const { data, error } = await supabase.from("athletes").insert({
      name: res.name,
      id: user.id,
      nationality: res.nationality,
      sponsorship_goal: res.sponsorship_goal,
      sponsorship_current: res.sponsorship_current,
      bio: res.bio,
      highest_level: res.highestLevel,
      username: res.username,
      age: res.age,
      gender: res.gender,
      photo: storageUploadSuccess ? path : null,
      quick_bio: {
        sport: res.sport,
        experience: res.experience,
        level: res.level,
        other_activity: res.otherActivity,
      },
    });

    if (error) {
      console.log(error.message);
    }
    return data;
  } else {
    console.log("User error");
  }
};

export const doSomething = async () => {
  console.log("Do something!");
};

export const completeUserCreation = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { user } = data;

  if (user) {
    await supabase.from("users").insert({
      id: user.id,
      full_name: user.user_metadata.fullName,
      email_id: user.email,
      user_role: "user",
      is_active: true,
    });
  }
};
