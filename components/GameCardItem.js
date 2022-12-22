import React from "react";
import {
  Box,
  Center,
  Text,
  Image,
  Spinner,
  FlatList,
  AspectRatio,
  View,
  Heading,
  HStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GameCardItem = (props) => {
  const game = props.data;
  const navigation = useNavigation();
  return (
    <View p={5} key={game.id}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("GameDetailScreen", {
            gameID: game.id,
          })
        }>
        <Box>
          <AspectRatio w={"100%"} ratio={16 / 8}>
            <Image source={{ uri: game.thumbnail }} alt="Game Thumbnail" borderTopRadius={"xl"} />
          </AspectRatio>
          <Box bg={"#32383e"} py={3} px={5} borderBottomRadius={"xl"}>
            <Heading size={"xl"} color={"white"}>
              {game.title}
            </Heading>
            <Text color={"white"} textAlign={"justify"}>
              {game.short_description}
            </Text>
            <HStack mt={2}>
              <Text
                bg={"#7a8288"}
                color={"#4e5459"}
                fontWeight={"bold"}
                p={1}
                borderRadius={"lg"}
                mr={2}>
                {game.genre}
              </Text>
              <Text
                bg={game.platform == "Web Browser" ? "#3fa75f" : "#1984b9"}
                color={"white"}
                fontWeight={"bold"}
                p={1}
                borderRadius={"lg"}>
                {game.platform}
              </Text>
            </HStack>
          </Box>
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export default GameCardItem;
