const DOM = {
    form: document.getElementById('expenseForm'),
    salaryInput: document.getElementById('salaryInput'),
    expenseNameInput: document.getElementById('expenseNameInput'),
    expenseAmountInput: document.getElementById('expenseAmountInput'),
    salaryGroup: document.getElementById('salaryGroup'),
    expenseNameGroup: document.getElementById('expenseNameGroup'),
    expenseAmountGroup: document.getElementById('expenseAmountGroup'),
    salaryError: document.getElementById('salaryError'),
    expenseNameError: document.getElementById('expenseNameError'),
    expenseAmountError: document.getElementById('expenseAmountError'),
    submitBtn: document.getElementById('submitBtn'),

    salaryValue: document.getElementById('salaryValue'),
    expensesValue: document.getElementById('expensesValue'),
    balanceValue: document.getElementById('balanceValue'),
    balanceCard: document.getElementById('balanceCard'),

    expenseList: document.getElementById('expenseList'),
    expenseCount: document.getElementById('expenseCount'),
    emptyState: document.getElementById('emptyState'),

    downloadReport: document.getElementById('downloadReport'),
    clearAll: document.getElementById('clearAll'),
    currencySelect: document.getElementById('currencySelect'),

    alertBanner: document.getElementById('alertBanner'),
    alertDismiss: document.getElementById('alertDismiss'),

    toastContainer: document.getElementById('toastContainer')
};

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    const iconMap = {
        success: 'check-circle',
        error: 'alert-circle',
        info: 'info'
    };

    toast.innerHTML = `
        <i data-lucide="${iconMap[type] || 'info'}"></i>
        <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);
    lucide.createIcons({ nodes: [toast] });

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function formatNumber(num) {
    const converted = CashFlowCurrency.convert(num);
    return converted.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

function formatDisplay(num) {
    const symbol = CashFlowCurrency.getSymbol();
    return `${symbol}${formatNumber(num)}`;
}

function clearErrors() {
    [DOM.salaryGroup, DOM.expenseNameGroup, DOM.expenseAmountGroup].forEach(g => {
        g.classList.remove('error');
    });
    [DOM.salaryError, DOM.expenseNameError, DOM.expenseAmountError].forEach(e => {
        e.textContent = '';
    });
}

function setError(group, errorEl, message) {
    group.classList.add('error');
    errorEl.textContent = message;
}

function validateForm() {
    clearErrors();
    let isValid = true;

    const salaryVal = DOM.salaryInput.value.trim();
    const expNameVal = DOM.expenseNameInput.value.trim();
    const expAmtVal = DOM.expenseAmountInput.value.trim();

    if (salaryVal === '') {
        setError(DOM.salaryGroup, DOM.salaryError, 'Salary is required.');
        isValid = false;
    } else if (isNaN(salaryVal) || Number(salaryVal) < 0) {
        setError(DOM.salaryGroup, DOM.salaryError, 'Salary must be a positive number.');
        isValid = false;
    }

    if (expNameVal === '') {
        setError(DOM.expenseNameGroup, DOM.expenseNameError, 'Expense name is required.');
        isValid = false;
    }

    if (expAmtVal === '') {
        setError(DOM.expenseAmountGroup, DOM.expenseAmountError, 'Expense amount is required.');
        isValid = false;
    } else if (isNaN(expAmtVal) || Number(expAmtVal) <= 0) {
        setError(DOM.expenseAmountGroup, DOM.expenseAmountError, 'Amount must be a positive number.');
        isValid = false;
    }

    return isValid;
}

function renderStats() {
    const salary = CashFlowState.getSalary();
    const totalExp = CashFlowState.getTotalExpenses();
    const balance = CashFlowState.getRemainingBalance();

    animateValue(DOM.salaryValue, formatNumber(salary));
    animateValue(DOM.expensesValue, formatNumber(totalExp));
    animateValue(DOM.balanceValue, formatNumber(balance));

    const symbol = CashFlowCurrency.getSymbol();
    document.querySelectorAll('.currency-symbol').forEach(el => {
        el.textContent = symbol;
    });

    checkThreshold();
}

function animateValue(element, newValue) {
    element.style.opacity = '0.5';
    element.style.transform = 'translateY(-2px)';
    setTimeout(() => {
        element.textContent = newValue;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 120);
}

function renderExpenses() {
    const expenses = CashFlowState.getExpenses();

    DOM.expenseCount.textContent = expenses.length;

    if (expenses.length === 0) {
        DOM.emptyState.classList.remove('hidden');
        DOM.expenseList.innerHTML = '';
        return;
    }

    DOM.emptyState.classList.add('hidden');

    DOM.expenseList.innerHTML = expenses.map((exp, index) => `
        <tr class="border-b border-[#e5e7eb] hover:bg-[#f8f9fa] transition-colors expense-item" data-id="${exp.id}">
            <td class="py-4 pl-2 text-[#6b7280]">${index + 1}</td>
            <td class="py-4 font-medium text-[#1f2937] expense-item__name">${escapeHTML(exp.name)}</td>
            <td class="py-4 text-right font-mono-data text-[#1f2937] expense-item__amount">${formatDisplay(exp.amount)}</td>
            <td class="py-4 text-center pr-2">
                <button class="expense-item__delete mx-auto" data-id="${exp.id}" aria-label="Delete ${escapeHTML(exp.name)}">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </td>
        </tr>
    `).join('');

    lucide.createIcons({ nodes: [DOM.toastContainer] });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

let alertDismissed = false;

function checkThreshold() {
    const breached = CashFlowState.isThresholdBreached();

    if (breached) {
        DOM.balanceCard.classList.add('warning');
        if (!alertDismissed) {
            DOM.alertBanner.classList.add('visible');
        }
    } else {
        DOM.balanceCard.classList.remove('warning');
        DOM.alertBanner.classList.remove('visible');
        alertDismissed = false;
    }
}

function updateUI() {
    renderStats();
    renderExpenses();

    const balance = CashFlowState.getRemainingBalance();
    const totalExp = CashFlowState.getTotalExpenses();

    const rate = CashFlowCurrency.getRate();
    CashFlowChart.update(balance * rate, totalExp * rate);
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const salary = Number(DOM.salaryInput.value);
    const expName = DOM.expenseNameInput.value.trim();
    const expAmount = Number(DOM.expenseAmountInput.value);

    CashFlowState.setSalary(salary);
    CashFlowState.addExpense(expName, expAmount);

    updateUI();

    DOM.expenseNameInput.value = '';
    DOM.expenseAmountInput.value = '';
    DOM.expenseNameInput.focus();

    clearErrors();
    showToast(`Added "${expName}" — ${formatDisplay(expAmount)}`, 'success');
}

function handleExpenseDelete(e) {
    const deleteBtn = e.target.closest('.expense-item__delete');
    if (!deleteBtn) return;

    const id = deleteBtn.dataset.id;
    const item = deleteBtn.closest('.expense-item');

    item.classList.add('removing');
    setTimeout(() => {
        CashFlowState.removeExpense(id);
        updateUI();
        showToast('Expense removed.', 'info');
    }, 300);
}

function handleCurrencyChange(e) {
    CashFlowCurrency.setCurrency(e.target.value);
    updateUI();
}

function handleDownloadReport() {
    if (CashFlowState.getSalary() <= 0 && CashFlowState.getExpenses().length === 0) {
        showToast('No data to export. Add salary and expenses first.', 'error');
        return;
    }
    CashFlowPDF.generateReport();
}

function handleClearAll() {
    if (CashFlowState.getSalary() <= 0 && CashFlowState.getExpenses().length === 0) {
        showToast('Nothing to clear.', 'info');
        return;
    }

    CashFlowState.clearAll();
    DOM.salaryInput.value = '';
    DOM.expenseNameInput.value = '';
    DOM.expenseAmountInput.value = '';
    alertDismissed = false;
    updateUI();
    showToast('All data cleared.', 'info');
}

function handleAlertDismiss() {
    alertDismissed = true;
    DOM.alertBanner.classList.remove('visible');
}

function handleInputFocus(e) {
    const group = e.target.closest('.form__group');
    if (group) {
        group.classList.remove('error');
        const errorEl = group.querySelector('.form__error');
        if (errorEl) errorEl.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    CashFlowState.loadFromLocalStorage();

    CashFlowChart.init();
    CashFlowCurrency.init();

    const savedSalary = CashFlowState.getSalary();
    if (savedSalary > 0) {
        DOM.salaryInput.value = savedSalary;
    }

    const savedCurrency = CashFlowState.getCurrency();
    if (savedCurrency && DOM.currencySelect) {
        DOM.currencySelect.value = savedCurrency;
    }

    updateUI();
    lucide.createIcons();

    DOM.form.addEventListener('submit', handleFormSubmit);
    DOM.expenseList.addEventListener('click', handleExpenseDelete);
    DOM.currencySelect.addEventListener('change', handleCurrencyChange);
    DOM.downloadReport.addEventListener('click', handleDownloadReport);
    DOM.clearAll.addEventListener('click', handleClearAll);
    DOM.alertDismiss.addEventListener('click', handleAlertDismiss);

    [DOM.salaryInput, DOM.expenseNameInput, DOM.expenseAmountInput].forEach(input => {
        input.addEventListener('focus', handleInputFocus);
    });

    document.querySelectorAll('.stat-value').forEach(el => {
        el.style.transition = 'all 120ms ease';
    });
});
