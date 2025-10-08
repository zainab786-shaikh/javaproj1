package com.example.expenseapi.service;

import com.example.expenseapi.model.Expense;
import com.example.expenseapi.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> findAll() {
        return repository.findAll();
    }

    public Optional<Expense> findById(Long id) {
        return repository.findById(id);
    }

    public Expense save(Expense expense) {
        return repository.save(expense);
    }

    public Expense update(Long id, Expense updatedExpense) {
        return repository.findById(id)
                .map(expense -> {
                    expense.setDescription(updatedExpense.getDescription());
                    expense.setAmount(updatedExpense.getAmount());
                    expense.setCategory(updatedExpense.getCategory());
                    expense.setDate(updatedExpense.getDate());
                    return repository.save(expense);
                })
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
