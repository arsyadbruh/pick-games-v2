import React from "react";
import { Box, Button, Divider, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { Linking } from "react-native";
import { Header } from "../components";

class AboutScreen extends React.PureComponent {
  handleOpenLink = () => {
    Linking.openURL("https://www.freetogame.com/");
  };

  render() {
    return (
      <>
        <Header title={"About"} />
        <ScrollView bg={"#2a2e33"} px={3} py={5}>
          <Box>
            <Text color={"white"} textAlign={"justify"} fontSize={"16px"} lineHeight={"xl"}>
              An react native application that is used for mobile application development courses.
              This application using free API from www.freetogame.com
            </Text>
          </Box>
          <Box my={5}>
            <Heading color={"white"}>What is FreeToGame all about?</Heading>
            <Text textAlign={"justify"} color={"white"} mt={3} fontSize={"16px"} lineHeight={"xl"}>
              Games Store that everything is free, We built FreeToGame to create an ecosystem that
              brings all the best Free-to-Play Games and MMO Games into one place while rewarding
              gamers with free premium in-game loot, special offers and exclusive perks. Our vision
              is to create the most exciting and rewarding gaming experience by breaking the
              inflexible concept of digital storefronts. You get more value... and it's all still
              completely free.
            </Text>
          </Box>
          <Divider bg="gray.600" thickness="2" mt={5} />
          <Box mt={3} mb={5}>
            <Heading color={"white"}>App Info</Heading>
            <VStack my={3}>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Version
                </Text>
                <Text color={"white"} fontSize={"18px"}>
                  v2.0.1
                </Text>
              </HStack>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Update on
                </Text>
                <Text color={"white"} fontSize={"18px"}>
                  Desember, 20 2022
                </Text>
              </HStack>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Created By
                </Text>
                <Text color={"white"} fontSize={"18px"}>
                  Team 2
                </Text>
              </HStack>
              <HStack my={1} justifyContent={"space-between"}>
                <Text color={"gray.400"} fontSize={"18px"} fontWeight={"bold"}>
                  Release on
                </Text>
                <Text color={"white"} fontSize={"18px"}>
                  Januari, 03 2022
                </Text>
              </HStack>
            </VStack>
          </Box>
          <Box mb={5}>
            <Button bg={"#1984b9"} onPress={() => handleOpenLink()} mb={5}>
              <Text color={"white"}>Open www.freetogame.com</Text>
            </Button>
          </Box>
        </ScrollView>
      </>
    );
  }
}

export default AboutScreen;
