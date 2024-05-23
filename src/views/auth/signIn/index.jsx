import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Cookies from "js-cookie";

function SignIn() {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const { jwt } = response.data;
      console.log(jwt); // Log the JWT token to the console
      Cookies.set("token", jwt); // Storing JWT as a cookie

      const userResponse = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const { message } = userResponse.data;

      console.log(message);

      if (message === "Admin page") {
        history.push("/admin/dashboard");
      } else if (message === "Driver page") {
        history.push("/driver/dashboard");
      } else {
        history.push("/client/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  const navigateToSignUp = () => {
    history.push("/auth/sign-up/client");
  };
  const navigateToSignUpdriver = () => {
    history.push("/auth/sign-up/driver");
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW="50%"
        w={{ base: "100%", md: "80%" }}
        mx={{ base: "auto", lg: "30px" }}
        me="auto"
        h="110%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "5px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
        borderRadius="25px"
        p="10px"
      >
        <Box me="auto">
          <Heading color="#4e88a0" fontSize="36px" mb="10px" ml={"120px"}>
            Connexion
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form onSubmit={handleSubmit}>
            <Flex align="center" mb="25px">
              <HSeparator />
              <Text color="gray.400" mx="14px"></Text>
              <HSeparator />
            </Flex>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color="navy.700"
                mb="8px"
              >
                Email<Text color="brand.500">*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="mail@example.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color="navy.700"
                display="flex"
              >
                Mot de passe<Text color="brand.500">*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 caractères"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color="gray.400"
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
              {error && <Text color="red.500">{error}</Text>}
              <Button
                type="submit"
                backgroundColor="#4e88a0"
                fontSize="sm"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text fontSize="sm">
                Don't have an account yet?{" "}
                <Text
                  as="span"
                  color="#4e88a0"
                  fontWeight="500"
                  cursor="pointer"
                  onClick={navigateToSignUp}
                >
                  Become a client
                </Text>{" "}
                <Text as="span"> or </Text>{" "}
                <Text
                  as="span"
                  color="#4e88a0"
                  fontWeight="500"
                  cursor="pointer"
                  onClick={navigateToSignUpdriver}
                >
                  Become a driver
                </Text>
              </Text>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
