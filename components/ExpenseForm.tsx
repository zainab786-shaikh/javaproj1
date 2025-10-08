
import React, { useState } from 'react';
import { Expense, Category } from '../types';

interface ExpenseFormProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<Category>(Category.Groceries);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date) {
            setError('All fields are required.');
            return;
        }
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        onAddExpense({
            description,
            amount: numericAmount,
            category,
            date,
        });

        // Reset form
        setDescription('');
        setAmount('');
        setCategory(Category.Groceries);
        setDate(new Date().toISOString().split('T')[0]);
        setError('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-600">Description</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Coffee with friends"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-600">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-600">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {Object.values(Category).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-600">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
