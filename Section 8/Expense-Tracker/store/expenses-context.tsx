import { Action, Expense, ExpensesContextType } from "@/types";
import { createContext, useContext, useReducer } from "react";

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: () => {},
    deleteExpense: () => {},
    updateExpense: () => {},
});

// Initial dummy data
const DUMMY_EXPENSES: Expense[] = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-01-10')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e6',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e7',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
];

const expensesReducer = (state: Expense[], action: Action): Expense[] => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        case "UPDATE":
            return state.map((expense) => expense.id === action.payload.id ? action.payload : expense);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
    const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData: { description: string, amount: number, date: Date }) => {
        const newExpense: Expense = {
            id: Math.random().toString(),
            ...expenseData,
        };
        dispatch({ type: 'ADD', payload: newExpense });
    };

    const deleteExpense = (id: string) => {
        dispatch({ type: 'DELETE', payload: id });
    };

    const updateExpense = (id: string, expenseData: { description: string, amount: number, date: Date }) => {
        const updatedExpense: Expense = {
            id,
            ...expenseData,
        };
        dispatch({ type: 'UPDATE', payload: updatedExpense });
    };

    const value = {
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (context === undefined) {
        throw new Error("useExpenses must be used within a ExpensesContextProvider");
    }
    return context;
}
