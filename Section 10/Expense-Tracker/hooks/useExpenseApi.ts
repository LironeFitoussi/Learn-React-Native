import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { Expense } from '@/types';

function mapExpense(item: any): Expense {
  return {
    id: item._id ?? item.id,
    description: item.description,
    amount: Number(item.amount),
    date: new Date(item.date),
  };
}

export function useExpenseApi() {
  const queryClient = useQueryClient();

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: async (): Promise<Expense[]> => {
      const response = await api.get('/expenses');
      return (response.data || []).map(mapExpense);
    },
    staleTime: 60_000,
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (expenseData: { description: string; amount: number; date: Date }) => {
      const payload = {
        description: expenseData.description,
        amount: expenseData.amount.toString(),
        date: expenseData.date.toISOString(),
      };
      const response = await api.post('/expenses', payload);
      return mapExpense(response.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: async ({ id, expenseData }: { id: string; expenseData: { description: string; amount: number; date: Date } }) => {
      const payload = {
        description: expenseData.description,
        amount: expenseData.amount.toString(),
        date: expenseData.date.toISOString(),
      };
      const response = await api.put(`/expenses/${id}`, payload);
      return mapExpense(response.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/expenses/${id}`);
      return id;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  return {
    expensesQuery,
    addExpenseMutation,
    updateExpenseMutation,
    deleteExpenseMutation,
  };
}

