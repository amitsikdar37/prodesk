const CashFlowState = (() => {
    const STORAGE_KEY = 'cashflow-data';

    let state = {
        salary: 0,
        expenses: [],
        currency: 'INR'
    };

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    }

    function saveToLocalStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    }

    function loadFromLocalStorage() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                state.salary = typeof parsed.salary === 'number' ? parsed.salary : 0;
                state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
                state.currency = parsed.currency || 'INR';
            }
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
        }
    }

    function clearAll() {
        state.salary = 0;
        state.expenses = [];
        saveToLocalStorage();
    }

    function setSalary(amount) {
        state.salary = amount;
        saveToLocalStorage();
    }

    function addExpense(name, amount) {
        const expense = {
            id: generateId(),
            name: name.trim(),
            amount: amount
        };
        state.expenses.push(expense);
        saveToLocalStorage();
        return expense;
    }

    function removeExpense(id) {
        state.expenses = state.expenses.filter(exp => exp.id !== id);
        saveToLocalStorage();
    }

    function getTotalExpenses() {
        return state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    }

    function getRemainingBalance() {
        return state.salary - getTotalExpenses();
    }

    function isThresholdBreached() {
        if (state.salary <= 0) return false;
        return getRemainingBalance() < (state.salary * 0.10);
    }

    function getSalary() {
        return state.salary;
    }

    function getExpenses() {
        return [...state.expenses];
    }

    function getCurrency() {
        return state.currency;
    }

    function setCurrency(currency) {
        state.currency = currency;
        saveToLocalStorage();
    }

    function getState() {
        return { ...state, expenses: [...state.expenses] };
    }

    return {
        loadFromLocalStorage,
        saveToLocalStorage,
        clearAll,
        setSalary,
        addExpense,
        removeExpense,
        getTotalExpenses,
        getRemainingBalance,
        isThresholdBreached,
        getSalary,
        getExpenses,
        getCurrency,
        setCurrency,
        getState
    };
})();
