
import React from 'react';
import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
    expenses: Expense[];
    onDeleteExpense: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
    if (expenses.length === 0) {
        return <p className="text-center text-slate-500 mt-8">No expenses found. Try adjusting your filters or adding a new expense!</p>;
    }

    return (
        <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-slate-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Description</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Amount</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 hidden sm:table-cell">Category</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 hidden md:table-cell">Date</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {expenses.map(expense => (
                                <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExpenseList;