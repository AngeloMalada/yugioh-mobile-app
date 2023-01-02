import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { REACT_APP_SERVER_URL } from "@env";

type Card = {
  id: number;
  name: string;
  desc: string;
  image_url: string;
};

type Cards = {
  cards: Card[];
};

const HomeScreen = () => {
  const [data, setData] = React.useState<Cards>();

  const [click, setClick] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // fetch from api
      const res = await fetch(`${REACT_APP_SERVER_URL}/getCards`);
      const json = await res.json();

      setData(json);
    };
    fetchData();
  }, [click]);

  const handleClick = async (idFor: number) => {
    setClick((prev) => !prev);
    //do post method with fetch
    //set name against to be the card that does not match the name
    const idAgainst = data?.cards.filter((card) => card.id !== idFor)[0].id;
    const res = await fetch(
      `${REACT_APP_SERVER_URL}/vote?a=${idAgainst}&b=${idFor}`,
      {
        method: "POST",
      }
    );
  };

  return (
    <SafeAreaView className="flex flex-row justify-between  w-[100%] h-[100%] bg-whit flex-1">
      {data?.cards.map((card) => (
        <View
          key={card.id}
          className="w-5/12 mx-4 flex flex-col justify-center items-center"
        >
          <Text className="text-center break-all h-20 font-bold">
            {card.name}
          </Text>

          <Image
            source={{ uri: card.image_url }}
            className="w-[100%] aspect-square mx-auto rounded-lg "
          />
          <TouchableOpacity
            className="bg-[#222] text-white font-bold py-2 px-4 mt-4 rounded"
            onPress={() => handleClick(card.id)}
          >
            <Text className="text-center break-all text-white  text-xl">
              Vote
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default HomeScreen;
