import React from "react";
import { Box, SimpleGrid, Text, Flex, Icon } from "@chakra-ui/react";
import {
  MdLocalShipping,
  MdCheckCircle,
  MdHourglassEmpty,
} from "react-icons/md";

export default function Settings() {
  // Sample data for package history
  const packageHistory = [
    {
      id: 1,
      date: "2024-05-10",
      source: "Source Location 1",
      destination: "Destination 1",
      state: "Picked Up",
      weight: "5 kg",
      estimatedPrice: "$50",
      deliveryPerson: "John Doe",
      deliveryTime: "2024-05-11",
    },
    {
      id: 2,
      date: "2024-05-11",
      source: "Source Location 2",
      destination: "Destination 2",
      state: "Delivered",
      weight: "3 kg",
      estimatedPrice: "$30",
      deliveryPerson: "Jane Doe",
      deliveryTime: "2024-05-12",
    },
    {
      id: 3,
      date: "2024-05-12",
      source: "Source Location 3",
      destination: "Destination 3",
      state: "Not Yet",
      weight: "2 kg",
      estimatedPrice: "$20",
      estimatedDeliveryTime: "2024-05-13",
    },
  ];

  // Function to get appropriate icon based on state
  const getStateIcon = (state) => {
    switch (state) {
      case "Picked Up":
        return <MdLocalShipping />;
      case "Delivered":
        return <MdCheckCircle />;
      default:
        return <MdHourglassEmpty />;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
        {packageHistory.map((packageItem) => (
          <Box
            key={packageItem.id}
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            bg="white"
            p="4"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              shadow: "xl",
            }}
          >
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {packageItem.date}
            </Text>
            <Text>
              <b>Source:</b> {packageItem.source}
            </Text>
            <Text>
              <b>Destination:</b> {packageItem.destination}
            </Text>
            <Text>
              <b>State:</b>{" "}
              <Flex alignItems="center">
                {getStateIcon(packageItem.state)}
                <Text ml="2">{packageItem.state}</Text>
              </Flex>
            </Text>
            <Text>
              <b>Weight:</b> {packageItem.weight}
            </Text>
            <Text>
              <b>Estimated Price:</b> {packageItem.estimatedPrice}
            </Text>
            {packageItem.state === "Picked Up" ||
            packageItem.state === "Delivered" ? (
              <Text>
                <b>Delivery Person:</b> {packageItem.deliveryPerson}
              </Text>
            ) : (
              <Text>
                <b>Delivery Time:</b> {packageItem.estimatedDeliveryTime}
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
