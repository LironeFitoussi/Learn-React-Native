import { GlobalStyles } from "@/constants/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Animated, Modal, Platform, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface DateInputProps {
  label: string;
  value: Date;
  onDateChange: (date: Date) => void;
  isValid?: boolean;
  style?: StyleProp<ViewStyle>;
  maximumDate?: Date;
  minimumDate?: Date;
}

export default function DateInput({
  label,
  value,
  onDateChange,
  isValid = true,
  style,
  maximumDate,
  minimumDate
}: DateInputProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  function handleDateChange(event: any, selectedDate?: Date) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  }

  function closeDatePicker() {
    setShowDatePicker(false);
  }

  function handlePress() {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setShowDatePicker(true);
  }
  
  function handleOverlayPress() {
    setShowDatePicker(false);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable 
          onPress={handlePress}
          style={[
            styles.dateInput,
            !isValid && styles.invalidInput
          ]}
        >
          <Text style={styles.dateText}>{value.toLocaleDateString()}</Text>
        </Pressable>
      </Animated.View>
      
      {showDatePicker && Platform.OS === "ios" && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={closeDatePicker}
        >
          <Pressable style={styles.modalOverlay} onPress={handleOverlayPress}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={closeDatePicker}>
                  <Text style={styles.modalButton}>Done</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={value}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={styles.datePicker}
              />
            </View>
          </Pressable>
        </Modal>
      )}
      
      {showDatePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  dateInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  invalidInput: {
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 0.8)",
    borderWidth: 2,
  },
  dateText: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area padding for iOS
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalButton: {
    color: GlobalStyles.colors.primary500,
    fontSize: 17,
    fontWeight: "600",
  },
  datePicker: {
    height: 200,
  },
});