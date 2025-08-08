import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '@/constants/styles';
import { getFormattedDate } from '@/utils/date';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ManageExpenses: { expenseId?: string } | undefined;
};

type ExpenseItemProps = {
    id: string;
    description: string;
    amount: number;
    date: Date;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, description, amount, date }) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpenses', {
            expenseId: id
        });
    }

    return (
        <Pressable
            onPress={expensePressHandler}
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={[styles.textBase]}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    expenseItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3, // Android shadow
        // iOS shadow
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.75,
    }
});

export default ExpenseItem;
