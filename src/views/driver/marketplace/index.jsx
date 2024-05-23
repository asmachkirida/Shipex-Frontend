import React, { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "85vh",
  marginTop: "70px"
};
const rightPanelStyle = {
  width: "30%",
  height: "100%",
  float: "right",
  padding: "20px",
  boxSizing: "border-box",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  marginTop:"-600px", 
  marginRight:"-20px"
};

const inputStyle = {
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width:"90%"
};

const buttonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginRight: "10px"
};

const center = {
  lat: 31.7917, // Approximate latitude for the center of Morocco
  lng: -7.0926, // Approximate longitude for the center of Morocco
};

const packages = [
  { id: 6, source: { lat: 34.6779, lng: -1.9282 }, destination: { lat: 47.3769, lng: 8.5417 }, weight: 4, articles: ["Toiletries", "Cosmetics"], photo: "https://i.pinimg.com/originals/0f/dc/ed/0fdcede729cb715f5715dd4a8a43ea7e.jpg" }, // Package in Oujda
  { id: 7, source: { lat: 48.8566, lng: 2.3522 }, destination: { lat: 31.6295, lng: -7.9811 }, weight: 9, articles: ["Jewelry", "Perfume"], photo: "https://i.pinimg.com/originals/0f/dc/ed/0fdcede729cb715f5715dd4a8a43ea7e.jpg" }, // Package in Paris
];

const Marketplace = () => {
  const [route, setRoute] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [startInput, setStartInput] = useState("");
  const [citiesInput, setCitiesInput] = useState("");
  const [cities, setCities] = useState([]);
  const [estimatedStartDate, setEstimatedStartDate] = useState("");
  const [estimatedArrivalDate, setEstimatedArrivalDate] = useState("");
  const [acceptedPackages, setAcceptedPackages] = useState([]);

  const handleEstimatedStartDateChange = (event) => {
    const startDate = event.target.value;
    console.log("Estimated Start Date:", startDate);
    setEstimatedStartDate(startDate);
  };

  const handleEstimatedArrivalDateChange = (event) => {
    const arrivalDate = event.target.value;
    console.log("Estimated Arrival Date:", arrivalDate);
    setEstimatedArrivalDate(arrivalDate);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAiAtl04BKVjttrmhf8QBvlU7i9C7S2YhE",
    region: "MA", // Specify the region (Morocco in this case)
  });

  const handleInputSubmit = async () => {
    const geocoder = new window.google.maps.Geocoder();
    const cityNames = citiesInput.split(",").map(city => city.trim());
    
    // Set the start point based on the first city in the CSV
    const startPoint = await getCityPosition(cityNames[0], geocoder);
  
    // Remove the startInput state setting
  
    const newCities = [];
    for (const cityName of cityNames) {
      const position = await getCityPosition(cityName, geocoder);
      newCities.push({ name: cityName, position: position });
    }
    setCities(newCities);
  
    // Call calculateRoute after setting newCities
    calculateRoute(startPoint, newCities);
  };
  
  

  const getCityPosition = (cityName, geocoder) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: cityName }, (results, status) => {
        if (status === "OK" && results[0]) {
          const position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          resolve(position);
        } else {
          console.error("Geocode was not successful for the following reason:", status);
          reject(status);
        }
      });
    });
  };

  const calculateRoute = async (startPoint, cities) => {
    if (isLoaded && cities && cities.length > 0) { // Check if cities is not null and is an array with at least one element
      const sortedCities = [...cities];
      const selectedCities = [sortedCities.shift()]; // Start with Marrakech
  
      while (sortedCities.length > 0) {
        let closestCityIndex = -1;
        let closestDistance = Infinity;
  
        selectedCities.forEach((selectedCity, index) => {
          sortedCities.forEach((city, cityIndex) => {
            const distance = calculateDistance(selectedCity.position, city.position);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestCityIndex = cityIndex;
            }
          });
        });
  
        const closestCity = sortedCities.splice(closestCityIndex, 1)[0];
        closestCity.label = (selectedCities.length + 1).toString();
        selectedCities.push(closestCity);
      }
  
      const waypoints = selectedCities.map(city => ({ location: city.position }));
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
  
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setRoute(result);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    } else {
      console.error("Cities array is empty or not iterable");
    }
  };
  

  useEffect(() => {
    calculateRoute();
  }, [isLoaded]); // Call calculateRoute whenever isLoaded changes

  const calculateDistance = (pos1, pos2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(pos2.lat - pos1.lat);
    const dLng = deg2rad(pos2.lng - pos1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const handlePackageClick = (packageId) => {
    const clickedPackage = packages.find(pkg => pkg.id === packageId);
    setSelectedPackage(clickedPackage);
  };
  const acceptedPackageStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  

  const handleDecline = () => {

    console.log("Package declined");
  };

  const filteredPackages = packages.filter(pkg => {
    return pkg.source && pkg.destination; 
  });
  const handleStartInputChange = (event) => {
    setStartInput(event.target.value);
  };

  const handleCitiesInputChange = (event) => {
    setCitiesInput(event.target.value);
    };

    const handleAccept = () => {
      setAcceptedPackages(prevPackages => [...prevPackages, selectedPackage]);
    };
    
    
    const tripDetailLabelStyle = {
      fontWeight: "bold",
    };
    
    const estimatedDateStyle = {
      marginTop: "10px",
    };
    
    const TripDetails = ({ onEstimatedStartDateChange, onEstimatedArrivalDateChange }) => (
      <div style={tripDetailsStyle}>
        <h3>Trip Details</h3>
        <div style={inputContainerStyle}>
          <label htmlFor="estimatedStartDate" style={labelStyle}>Estimated Start Date:</label>
          <input
  type="date"
  id="estimatedStartDate"
  style={inputStyle}
  value={estimatedStartDate} // Update value prop here
  onChange={handleEstimatedStartDateChange}
  placeholder="YYYY-MM-DD"
/>
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="estimatedArrivalDate" style={labelStyle}>Estimated Arrival Date:</label>
          <input
  type="date"
  id="estimatedArrivalDate"
  style={inputStyle}
  value={estimatedArrivalDate} // Update value prop here
  onChange={handleEstimatedArrivalDateChange}
  placeholder="YYYY-MM-DD"
/>
  {/* Display accepted packages */}
{/* Display accepted packages */}
<div style={{ maxHeight: "200px", marginTop: "20px", marginBottom: "20px", border: "1px solid black", overflowY: "auto" }}>
  {acceptedPackages.map((acceptedPackage, index) => (
    <div key={index} style={acceptedPackageStyle}>
      <h4>Accepted Package {index + 1}</h4>
      <p>Source: {acceptedPackage.source.lat}, {acceptedPackage.source.lng}</p>
      <p>Destination: {acceptedPackage.destination.lat}, {acceptedPackage.destination.lng}</p>
      <p>Weight: {acceptedPackage.weight} kg</p>
      <p>Articles: {acceptedPackage.articles.join(", ")}</p>
    </div>
  ))}
</div>


        </div>
      </div>
    );
    
    const tripDetailsStyle = {
      marginBottom: "20px",
    };
    
    const inputContainerStyle = {
      marginBottom: "10px",
    };
    
    const labelStyle = {
      marginRight: "10px",
      fontSize: "14px",
      color: "#333",
    };
    
    const inputStyle = {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
    };
    
  
    
    return (
    <div>
    {isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
    {route && <DirectionsRenderer directions={route} />}
    {cities.length > 0 &&
    cities.map((city, index) => (
    <Marker key={index} position={city.position} label={city.name.charAt(0)} />
    ))
    }
    {filteredPackages.map(pkg => (
    pkg.source && (
    <Marker
    key={pkg.id}
    position={pkg.source}
    onClick={() => handlePackageClick(pkg.id)}
    icon={{
    url: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    scaledSize: new window.google.maps.Size(32, 32)
    }}
    />
    )
    ))}
    {selectedPackage && (
    <InfoWindow
    position={selectedPackage.source}
    onCloseClick={() => setSelectedPackage(null)}
    >
    <div>
    <h3>Package Details</h3>
    <p>Source: {selectedPackage.source.lat}, {selectedPackage.source.lng}</p>
    <p>Destination: {selectedPackage.destination.lat}, {selectedPackage.destination.lng}</p>
    <p>Weight: {selectedPackage.weight} kg</p>
    <p>Articles: {selectedPackage.articles.join(", ")}</p>
    <img src={selectedPackage.photo} alt="Package" style={{ maxWidth: "200px" }} />
    <button onClick={handleAccept} style={{ backgroundColor: "green", color: "white", padding: "10px 20px", margin: "10px", borderRadius: "5px" }}>Accept</button>
    <button onClick={handleDecline} style={{ backgroundColor: "red", color: "white", padding: "10px 20px", margin: "10px", borderRadius: "5px" }}>Decline</button>
    </div>
    </InfoWindow>
    )}
    </GoogleMap>
    ) : (
    <div>Loading...</div>
    )}
<div style={rightPanelStyle}>
<label htmlFor="estimatedStartDate" style={labelStyle}>Cities to visit:</label>

<input type="text" style={inputStyle} placeholder="Cities input" value={citiesInput} onChange={handleCitiesInputChange} />

  <TripDetails 
    onEstimatedStartDateChange={handleEstimatedStartDateChange}
    onEstimatedArrivalDateChange={handleEstimatedArrivalDateChange}
  />
  <div>
    <button style={buttonStyle} onClick={handleInputSubmit}>View route</button>
  </div>
</div>
    </div>
    );
    };
    
    export default Marketplace;
