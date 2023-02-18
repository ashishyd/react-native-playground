import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function itemPressHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  if (!places) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onPress={itemPressHandler} />
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlacesList;
