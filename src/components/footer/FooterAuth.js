/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");
  let linkColor = useColorModeValue({ base: "gray.400", lg: "white" }, "white");
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "0px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}>
        {" "}

        <Text as='span' fontWeight='500' ms='4px'>


        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>

        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>

        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>

        </ListItem>
        <ListItem>
          <Link
            fontWeight='500'
            color={linkColor}
            href='https://www.blog.simmmple.com/?ref=horizon-chakra-free'>

          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
