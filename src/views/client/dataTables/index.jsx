import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text, Flex, Image } from "@chakra-ui/react";
import Cookies from 'js-cookie';

export default function Settings() {
  const [packageHistory, setPackageHistory] = useState([]);
  const BASE_IMAGE_URL = "http://localhost:8000/colis_images";

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found in cookies');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/mycolislist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPackageHistory(data);
      } catch (error) {
        console.error("Error fetching package history:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt="80px">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="20px">
        {Array.isArray(packageHistory) && packageHistory.map((packageItem) => (
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
            mb="4"
          >
            {packageItem.image && (
              <Image 
                src={`${BASE_IMAGE_URL}/${packageItem.image.split('/').pop()}`} 
                alt="Package" 
                w="260px" 
                h="300px" 
                mb="4"
              />
            )}
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {packageItem.date}
              </Text>
              <Text>
                <b>Source:</b> {packageItem.source}
              </Text>
              <Text>
                <b>Destination:</b> {packageItem.destination}
              </Text>
              <Text>
                <b>State:</b> {packageItem.state}
              </Text>
              {/* Add more details as needed */}
              <Text>
                <b>Weight:</b> {packageItem.weight} lbs
              </Text>
              <Text>
                <b>Estimated Price:</b> ${packageItem.estimatedPrice}
              </Text>
              {packageItem.state === "Picked Up" || packageItem.state === "Delivered" ? (
                <Text>
                  <b>Delivery Person:</b> {packageItem.deliveryPerson}
                </Text>
              ) : (
                <Text>
                  <b>Estimated Delivery Time:</b> {packageItem.estimatedTime}
                </Text>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
  
}
