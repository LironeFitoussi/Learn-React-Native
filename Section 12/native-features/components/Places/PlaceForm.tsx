import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";

// Components
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [pickedLocation, setPickedLocation] = useState<{lat: number, lng: number} | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    function changeTitleHandler(enteredText: string) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri: string) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location: {lat: number, lng: number}) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        console.log(enteredTitle);
        console.log(selectedImage);
        console.log(pickedLocation);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker onTakeImage={takeImageHandler}/>
            <LocationPicker onPickLocation={pickLocationHandler}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
})