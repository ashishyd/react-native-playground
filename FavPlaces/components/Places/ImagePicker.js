import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Text, Image, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  async function verifyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.Alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use the feature"
      );
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  let imagePreview = <Text>No images taken yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default ImagePicker;
