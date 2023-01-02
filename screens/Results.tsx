import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { REACT_APP_SERVER_URL } from "@env";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "react-native-heroicons/solid";

type Result = {
  results: {
    name: string;
    desc: string;
    image_url: string;
    _count: {
      votesFor: number;
      votesAgainst: number;
    };
  }[];
};

const Results = () => {
  const [data, setData] = React.useState<Result>();
  useEffect(() => {
    const fetchData = async () => {
      // fetch from jsonplaceholder
      const res = await fetch(`${REACT_APP_SERVER_URL}/results`);
      const json = await res.json();

      setData(json);
    };
    fetchData();
  }, []);
  return (
    <View className="w-full bg-white flex-1 ">
      {/* if data doesnt exist display loading */}
      {data ? (
        <ScrollView
          className="mx-auto flex  mt-20 w-full "
          contentContainerStyle={{ alignItems: "center" }}
        >
          {data?.results.flatMap((card) => (
            <View
              className="w-[80%] flex flex-col space-y-10 my-4 rounded-md p-4 shadow-lg bg-gray-50  mx-auto items-center"
              key={card.name}
            >
              <Text className="font-bold text-center break-all w-full text-lg">
                {card.name}
              </Text>

              <Image
                source={{ uri: card.image_url }}
                className="w-40 aspect-square rounded-lg mx-auto "
              />
              <View className="flex flex-row space-x-4 mx-auto items-center justify-center  w-full">
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-center text-lg font-bold">
                    {card._count.votesFor}
                  </Text>
                  <HandThumbUpIcon className="w-6 h-6" color={"#222"} />
                </View>
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-lg font-bold">
                    {card._count.votesAgainst}
                  </Text>
                  <HandThumbDownIcon className="w-6 h-6" color={"#222"} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="flex items-center justify-center flex-1">
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default Results;
