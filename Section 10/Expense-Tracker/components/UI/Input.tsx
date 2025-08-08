import { GlobalStyles } from "@/constants/styles";
import { useState } from "react";
import { Animated, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  isValid?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  textInputConfig?: TextInputProps;
}

export default function Input({ 
  label, 
  isValid = true, 
  style, 
  inputStyle,
  textInputConfig,
  ...textInputProps 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleValue, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TextInput
          style={[
            styles.input,
            !isValid && styles.invalidInput,
            isFocused && styles.focusedInput,
            inputStyle
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          {...textInputConfig}
          {...textInputProps}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 12,
  },
  label: {
    fontSize: 13,
    color: GlobalStyles.colors.primary100,
    marginBottom: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    minHeight: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 0.8)",
    borderWidth: 2,
  },
  focusedInput: {
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
  },
});