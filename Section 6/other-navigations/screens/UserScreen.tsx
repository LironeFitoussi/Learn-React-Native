import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface UserScreenProps {
    navigation: DrawerNavigationProp<any, 'User'>;
}

function UserScreen({ navigation }: UserScreenProps): React.JSX.Element {
    function openDrawerHandler() {
        navigation.toggleDrawer();
    }


    return (
        <View style={styles.rootContainer}>
            <Text> 
                This is the <Text style={styles.highlight}>"User"</Text> screen!
            </Text>
            <Button title="Open Drawer" onPress={openDrawerHandler} />
        </View>
    );
}

export default UserScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlight: {
        fontWeight: 'bold',
        color: '#eb1064',
    },
});