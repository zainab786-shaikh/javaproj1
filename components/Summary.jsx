import React, { useMemo } from 'react';

const Summary = ({ expenses }) => {
    const total = useMemo(() => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }, [expenses]);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(total);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                    <p className="text-slate-600">Total Expenses:</p>
                    <p className="text-2xl font-bold text-indigo-600">{formattedTotal}</p>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="text-slate-600">Number of Transactions:</p>
                    <p className="text-xl font-semibold text-slate-800">{expenses.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;