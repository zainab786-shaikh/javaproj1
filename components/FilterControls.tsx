
import React from 'react';
import { Category, SortConfig, Expense } from '../types';

interface FilterControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterCategory: Category | '';
    setFilterCategory: (category: Category | '') => void;
    sortConfig: SortConfig;
    setSortConfig: (config: SortConfig) => void;
}

const sortOptions: { label: string; value: keyof Expense | '' }[] = [
    { label: 'Date', value: 'date' },
    { label: 'Amount', value: 'amount' },
    { label: 'Description', value: 'description' },
];

const FilterControls: React.FC<FilterControlsProps> = ({
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    sortConfig,
    setSortConfig,
}) => {

    const handleSortChange = (key: keyof Expense | '') => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
                <label htmlFor="search" className="sr-only">Search</label>
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by description..."
                />
            </div>
            
            <div className="lg:col-span-1">
                <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
                <select
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as Category | '')}
                    className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All Categories</option>
                    {Object.values(Category).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="lg:col-span-1 flex items-center justify-start sm:justify-end space-x-2">
                 <span className="text-sm font-medium text-slate-600">Sort by:</span>
                {sortOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${sortConfig.key === option.value ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        {option.label}
                         {sortConfig.key === option.value && (
                            <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterControls;
