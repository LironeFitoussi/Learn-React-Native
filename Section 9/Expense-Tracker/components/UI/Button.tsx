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
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary400,
        minHeight: 56,
        justifyContent: "center",
        alignItems: "center",
    },
    flat: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    filled: {
        backgroundColor: GlobalStyles.colors.primary500,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    flatText: {
        color: "white",
        opacity: 0.95,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
})