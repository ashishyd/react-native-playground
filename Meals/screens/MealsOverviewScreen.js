import { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";
import { CATEGORIES, MEALS } from "../data/dummy-data";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(catId)
  );

  // use it if component is still loading and we need to handle side effect
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
