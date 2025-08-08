import { GlobalStyles } from "@/constants/styles";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    mode?: "flat" | "filled";
    style?: StyleProp<ViewStyle>;
}

export default function Button({ children, onPress, mode = "flat", style }: ButtonProps) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, mode === "flat" && styles.flat]}>
                    <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: "transparent",
    },
    filled: {
        backgroundColor: GlobalStyles.colors.primary500,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    },
})