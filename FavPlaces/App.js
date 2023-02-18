import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import AddPlace from "./screens/AddPlace";
import AllPLaces from "./screens/AllPlaces";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPLaces}
            options={({ navigation }) => ({
              title: "Your fav places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a new place" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: "Loading title ..." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
