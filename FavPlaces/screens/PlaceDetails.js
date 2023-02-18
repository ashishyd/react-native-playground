import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/ui/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceDetails() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceDetails();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallbackText}>
        <Text>Loading place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  fallbackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: 16,
  },
});
export default PlaceDetails;
