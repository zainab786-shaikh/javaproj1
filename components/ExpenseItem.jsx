import React from 'react';
import { Category } from '../types';

const categoryColorMap = {
    [Category.Groceries]: 'bg-green-100 text-green-800',
    [Category.Utilities]: 'bg-blue-100 text-blue-800',
    [Category.Entertainment]: 'bg-purple-100 text-purple-800',
    [Category.Transport]: 'bg-yellow-100 text-yellow-800',
    [Category.Health]: 'bg-red-100 text-red-800',
    [Category.Other]: 'bg-slate-100 text-slate-800',
};

const ExpenseItem = ({ expense, onDelete }) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(expense.amount);
    
    const formattedDate = new Date(expense.date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-0">{expense.description}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{formattedAmount}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 hidden sm:table-cell">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColorMap[expense.category]}`}>
                    {expense.category}
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 hidden md:table-cell">{formattedDate}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete expense: ${expense.description}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;