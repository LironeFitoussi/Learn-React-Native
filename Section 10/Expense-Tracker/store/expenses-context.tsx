import { Action, Expense, ExpensesContextType } from "@/types";
import { createContext, useContext, useReducer } from "react";
import api from "@/api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: async () => {},
    deleteExpense: async () => {},
    updateExpense: async () => {},
});

// No dummy data; start empty and populate from API
const INITIAL_EXPENSES: Expense[] = [];

const expensesReducer = (state: Expense[], action: Action): Expense[] => {
    switch (action.type) {
        case "SET":
            return action.payload;
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
    const [expenses, dispatch] = useReducer(expensesReducer, INITIAL_EXPENSES);
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const response = await api.get('/expenses');
            const fetched: Expense[] = (response.data || []).map((item: any) => ({
                id: item._id ?? item.id,
                description: item.description,
                amount: Number(item.amount),
                date: new Date(item.date),
            }));
            dispatch({ type: 'SET', payload: fetched });
            return fetched;
        },
        staleTime: 60_000,
    });

    const addExpense = async (expenseData: { description: string, amount: number, date: Date }) => {
        try {
            const payload = {
                description: expenseData.description,
                amount: expenseData.amount.toString(),
                date: expenseData.date.toISOString(),
            };
            const response = await api.post('/expenses', payload);
            const created: Expense = {
                id: response.data._id ?? response.data.id,
                description: response.data.description,
                amount: Number(response.data.amount),
                date: new Date(response.data.date),
            };
            dispatch({ type: 'ADD', payload: created });
            await queryClient.invalidateQueries({ queryKey: ['expenses'] });
        } catch (err: any) {
            const serverErrors = err?.response?.data?.errors as ({ msg: string } | undefined)[] | undefined;
            const message = serverErrors?.map(e => e?.msg).filter(Boolean).join('\n') || 'Failed to create expense';
            throw new Error(message);
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            await api.delete(`/expenses/${id}`);
            dispatch({ type: 'DELETE', payload: id });
            await queryClient.invalidateQueries({ queryKey: ['expenses'] });
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to delete expense';
            throw new Error(message);
        }
    };

    const updateExpense = async (id: string, expenseData: { description: string, amount: number, date: Date }) => {
        try {
            const payload = {
                description: expenseData.description,
                amount: expenseData.amount.toString(),
                date: expenseData.date.toISOString(),
            };
            const response = await api.put(`/expenses/${id}`, payload);
            const updatedExpense: Expense = {
                id: response.data._id ?? response.data.id,
                description: response.data.description,
                amount: Number(response.data.amount),
                date: new Date(response.data.date),
            };
            dispatch({ type: 'UPDATE', payload: updatedExpense });
            await queryClient.invalidateQueries({ queryKey: ['expenses'] });
        } catch (err: any) {
            const serverErrors = err?.response?.data?.errors as ({ msg: string } | undefined)[] | undefined;
            const message = serverErrors?.map(e => e?.msg).filter(Boolean).join('\n') || 'Failed to update expense';
            throw new Error(message);
        }
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
