import {
    ArrowBackIcon,
    Box,
    HStack,
    Pressable,
    Text,
  } from "native-base";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  const Header = ({ title, withBackBtn }) => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView>
        <Box bg="#272b30" paddingX={15} paddingY={2}>
          <HStack alignItems="center">
              {withBackBtn && (
                <Pressable onPress={() => navigation.goBack()}>
                  <ArrowBackIcon color="white" size="md" marginRight="3" />
                </Pressable>
              )}
              <Text color="white" fontWeight="semibold" fontSize="2xl">
                {title}
              </Text>
          </HStack>
        </Box>
      </SafeAreaView>
    );
  };
  
  export default Header;
  