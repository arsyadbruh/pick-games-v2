import React, { useState } from "react";
import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";

/**
 * 
 * @param {string} text Text yang akan di tampilkan
 * @param {int} slice jumlah character yang akan ditampilkan saat mode truncate
 * @returns 
 */
const ReadMore = ({ text, slice=250 }) => {
  const [readMore, setReadMore] = useState(true);
  return (
    <View pr={3}>
      <Text color={"white"} textAlign={"justify"} fontSize={"16px"}>
        {readMore ? text.slice(0, slice) : text}
      </Text>
      <TouchableOpacity onPress={() => setReadMore(!readMore)}>
        <Text
          bg={"#4e5459"}
          color={"white"}
          fontWeight={"bold"}
          borderRadius={"lg"}
          px={3}
          width={"30%"}
          textAlign={"center"}>
          {readMore ? "read more" : "show less"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadMore;
