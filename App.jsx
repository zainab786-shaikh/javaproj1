import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Category } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterControls from './components/FilterControls';
import Summary from './components/Summary';

const API_URL = 'http://localhost:8080/api/expenses';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

    useEffect(() => {
        const fetchExpenses = async () => {
            setIsLoading(true);
            setApiError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                }
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                setApiError(err.message || 'Failed to fetch expenses. Make sure the API server is running.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const mapCategoryToServer = (category) => {
        switch (category) {
            case Category.Groceries:
                return 'FOOD';
            case Category.Transport:
                return 'TRAVEL';
            case Category.Utilities:
                return 'UTILITIES';
            case Category.Entertainment:
                return 'ENTERTAINMENT';
            case Category.Health:
                return 'OTHER';
            case Category.Other:
                return 'OTHER';
            default:
                return 'OTHER';
        }
    };

    const addExpense = useCallback(async (expense) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...expense,
                    category: mapCategoryToServer(expense.category),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add expense.');
            }
            const newExpense = await response.json();
            setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
        } catch (error) {
            console.error('Error adding expense:', error);
            setApiError('Could not save the new expense. Please try again.');
        }
    }, []);

    const deleteExpense = useCallback(async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense.');
            }
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
            setApiError('Could not delete the expense. Please try again.');
        }
    }, []);

    const filteredAndSortedExpenses = useMemo(() => {
        let filtered = [...expenses];

        if (searchTerm) {
            filtered = filtered.filter(expense =>
                expense.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory) {
            filtered = filtered.filter(expense => expense.category === filterCategory);
        }
        
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [expenses, searchTerm, filterCategory, sortConfig]);

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-800">Expense Tracker</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 4H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2h-1" />
                    </svg>
                </div>
            </header>
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <Summary expenses={filteredAndSortedExpenses} />
                        <ExpenseForm onAddExpense={addExpense} />
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Your Expenses</h2>
                            <FilterControls
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                filterCategory={filterCategory}
                                setFilterCategory={setFilterCategory}
                                sortConfig={sortConfig}
                                setSortConfig={setSortConfig}
                            />
                            {isLoading && (
                                <div className="flex justify-center items-center h-40">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                </div>
                            )}
                            {apiError && (
                                <div className="text-center text-red-600 mt-8 bg-red-50 p-4 rounded-lg">
                                    <p className="font-semibold">An Error Occurred:</p>
                                    <p>{apiError}</p>
                                </div>
                            )}
                            {!isLoading && !apiError && (
                                <ExpenseList expenses={filteredAndSortedExpenses} onDeleteExpense={deleteExpense} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;