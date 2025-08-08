import React from 'react';
import { FlatList } from 'react-native';

// Components
import { ExpensesListProps } from '@/types';
import ExpenseItem from './ExpenseItem';

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
