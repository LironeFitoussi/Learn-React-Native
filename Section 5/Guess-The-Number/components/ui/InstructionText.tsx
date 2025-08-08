import Colors from "@/constants/colors";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface InstructionTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans",
        fontSize: 24,
        color: Colors.accent500,
    },
});