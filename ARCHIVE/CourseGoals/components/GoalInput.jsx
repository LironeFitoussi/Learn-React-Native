import { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native'

function GoalInput({ onAdd, showModal, setShowModal }) {
    const [goalInput, setGoalInput] = useState('');

    function goalInputHandler(enteredText) {
        // console.log(enteredText);
        setGoalInput(enteredText);
    }

    function addGoalHandler() {
        onAdd(goalInput);
        setShowModal()
        setGoalInput('')
    }

    return (
        <Modal visible={showModal} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Your course goal!'
                    onChangeText={goalInputHandler}
                    value={goalInput}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={() => setShowModal()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        padding: 16
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
        padding: 8
    },
    buttonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    button: {
        width: 100,
        padding: 8
    }
})