import { StyleSheet, Text } from "react-native";
interface TitleProps {
  children: React.ReactNode;
}

function Title({ children }: TitleProps) {
  return (
    <Text style={styles.title}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 4,
    borderColor: "white",
    padding: 12,
  }
});
export default Title;   