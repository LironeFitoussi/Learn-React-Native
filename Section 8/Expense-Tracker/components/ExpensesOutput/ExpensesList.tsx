import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Components
import ExpenseItem from './ExpenseItem';


type Expense = {
    id: string;
    description: string;
    amount: number;
    date: Date;
};

type ExpensesListProps = {
    expenses: Expense[];
};

const renderExpenseItem = (itemData: any) => {
    return (
        <ExpenseItem
            {...itemData.item}
        />
    );
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {    
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    );
};

export default ExpensesList;
