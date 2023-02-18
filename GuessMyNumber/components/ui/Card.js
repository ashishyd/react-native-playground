import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, // Android only
    shadowColor: "black", // iOS
    shadowOffset: { width: 0, height: 2 }, //iOS
    shadowRadius: 6, // iOS
    shadowOpacity: 0.25, // iOS
  },
});

export default Card;
