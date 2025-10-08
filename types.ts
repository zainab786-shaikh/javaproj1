
export enum Category {
  Groceries = 'Groceries',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Transport = 'Transport',
  Health = 'Health',
  Other = 'Other',
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
}

export interface SortConfig {
    key: keyof Expense | '';
    direction: 'ascending' | 'descending';
}