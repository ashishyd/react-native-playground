import { useCallback, useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/Place";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changedTextHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changedTextHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    paddingHorizontal: 4,
    marginVertical: 8,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
