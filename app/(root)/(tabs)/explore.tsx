import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import NoResult from "@/components/no-result";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-providers";
import { useAppwrite } from "@/lib/useAppwrite";
import { useLocalSearchParams, router } from "expo-router";

const Explore = () => {
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter,
      query: params.query,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter,
      query: params.query,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResult />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flow-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
