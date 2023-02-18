import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#3f2f25",
  },
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              // options={{
              //   headerRight: () => {
              //     return <Button title="Tap me!" />;
              //   },
              // }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </FavoritesContextProvider> */}
      </Provider>
    </>
  );
}
