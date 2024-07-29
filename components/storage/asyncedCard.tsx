import React, { useState } from "react";
import { View, Text, Pressable, Linking } from "react-native";
import ExpoImage from "@/components/expo-image";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { StoredCard } from "@/utils/interface";
import icondata from "@/utils/data/icondata";
import bgImageData from "@/utils/data/bgimagedata";

interface AsyncedCardProps {
  cards: StoredCard[];
}

export default function AsyncedCard({ cards }: AsyncedCardProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const getSNSIcon = (snsId: string) => {
    const sns = icondata.find(
      (icon) => icon.name.toLowerCase() === snsId.toLowerCase(),
    );
    return sns ? sns.source : require("@/assets/logos/sns/empty.png");
  };

  const getSNSLink = (snsId: string, userId: string) => {
    const sns = icondata.find(
      (icon) => icon.name.toLowerCase() === snsId.toLowerCase(),
    );
    return sns ? sns.baseLink + userId : "";
  };

  return (
    <View className='relative'>
      {cards.map((card, index) => (
        <Pressable
          key={card.id}
          className={`absolute left-0 right-0 h-60 border border-input bg-white ${
            index === expandedIndex ? "z-10" : `z-${cards.length - index}`
          }`}
          style={{
            top: index * 4,
          }}
          onPress={() => setExpandedIndex(index)}>
          {card.background_url && (
            <ExpoImage
              source={card.background_url}
              className='absolute left-0 top-0 h-full w-full'
            />
          )}
          <View className='mx-auto mt-4 flex h-full w-10/12 flex-col'>
            <Text className='mr-auto text-xl font-semibold'>
              {card.double_name?.replace(" ", "") || ""}
            </Text>
            <View className='mr-auto mt-5 flex flex-row items-start gap-x-6'>
              <Avatar className='h-25 w-25'>
                {card.avatar_url ? (
                  <AvatarImage
                    source={{ uri: card.avatar_url }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <AvatarFallback>
                    {card.name?.slice(0, 2) || ""}
                  </AvatarFallback>
                )}
              </Avatar>
              <View className='flex flex-col'>
                <View className='mb-4 flex flex-row items-center gap-x-3'>
                  <Text className='text-2xl'>{card.name || ""}</Text>
                </View>
                {card.sns.map((sns, snsIndex) => (
                  <View
                    key={`sns-${snsIndex}`}
                    className={`${
                      snsIndex !== 0 ? "mt-1.5" : ""
                    } flex flex-row items-center gap-1.5`}>
                    <ExpoImage
                      source={getSNSIcon(sns.sns_id)}
                      className='h-6 w-6'
                    />
                    {sns.user_id && (
                      <Pressable
                        onPress={() =>
                          Linking.openURL(getSNSLink(sns.sns_id, sns.user_id))
                        }>
                        <Text className='text-base'>
                          @
                          {sns.sns_id === "discord"
                            ? sns.user_id.slice(19, 30)
                            : sns.sns_id === "line"
                              ? sns.user_id.slice(21, 35)
                              : sns.user_id}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Pressable>
      ))}
      <View style={{ height: cards.length * 4 + 240 }} />
    </View>
  );
}
