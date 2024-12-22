import { SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/lib/global-providers";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
