import { NavigationProp, RouteProp } from "@react-navigation/native";

// Core Expense Types
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

// Context Types
export type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: { description: string, amount: number, date: Date }) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, expenseData: { description: string, amount: number, date: Date }) => Promise<void>;
};

// Reducer Action Types
export type Action =
  | { type: 'SET'; payload: Expense[] }
  | { type: 'ADD'; payload: Expense }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: Expense };

// Navigation Types
export type RootStackParamList = {
  ManageExpenses: { expenseId?: string } | undefined;
};

// Component Props Types
export type ExpensesOutputProps = {
  expenses?: Expense[];
  periodName?: string;
};

export type ExpensesSummaryProps = {
  periodName: string;
  expenses: Expense[];
};

export type ExpensesListProps = {
  expenses: Expense[];
};

export type ExpenseItemProps = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type ManageExpensesProps = {
  route: RouteProp<RootStackParamList, "ManageExpenses">;
  navigation: NavigationProp<RootStackParamList>;
};

// Form Data Types
export type ExpenseFormData = {
  description: string;
  amount: number;
  date: Date;
};

export type ExpenseFormProps = {
  onSubmit: (expenseData: ExpenseFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  defaultValues?: ExpenseFormData;
};

// UI Component Props
export type InputProps = {
  label: string;
  isValid?: boolean;
  style?: any;
  inputStyle?: any;
  textInputConfig?: any;
};

export type DateInputProps = {
  label: string;
  value: Date;
  onDateChange: (date: Date) => void;
  isValid?: boolean;
  style?: any;
  maximumDate?: Date;
  minimumDate?: Date;
};

// Utility Types
export type ExpenseId = string; 