const CashFlowCurrency = (() => {
    const API_BASE = 'https://api.frankfurter.dev/v1/latest';

    const SYMBOLS = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£'
    };

    let currentCurrency = 'INR';
    let rates = {};
    let conversionRate = 1;
    let isFetching = false;

    function getSymbol(currency) {
        return SYMBOLS[currency || currentCurrency] || currentCurrency;
    }

    function getCurrent() {
        return currentCurrency;
    }

    function getRate() {
        return conversionRate;
    }

    function convert(amountINR) {
        return amountINR * conversionRate;
    }

    function formatAmount(amount) {
        const converted = convert(amount);
        return `${getSymbol()}${converted.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })}`;
    }

    async function fetchRates() {
        if (isFetching) return;
        isFetching = true;

        const selector = document.getElementById('currencySelector');
        if (selector) selector.classList.add('loading');

        try {
            const response = await fetch(`${API_BASE}?base=INR&symbols=USD,EUR,GBP`);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            rates = data.rates || {};
            isFetching = false;

            if (selector) selector.classList.remove('loading');
            return rates;
        } catch (error) {
            console.warn('Currency API error:', error);
            isFetching = false;
            if (selector) selector.classList.remove('loading');

            if (typeof showToast === 'function') {
                showToast('Currency API unavailable. Using base currency.', 'error');
            }
            return null;
        }
    }

    async function setCurrency(currency) {
        currentCurrency = currency;
        CashFlowState.setCurrency(currency);

        if (currency === 'INR') {
            conversionRate = 1;
            updateAllDisplays();
            return;
        }

        if (rates[currency]) {
            conversionRate = rates[currency];
            updateAllDisplays();
            return;
        }

        const fetched = await fetchRates();
        if (fetched && fetched[currency]) {
            conversionRate = fetched[currency];
        } else {
            conversionRate = 1;
            currentCurrency = 'INR';
            const select = document.getElementById('currencySelect');
            if (select) select.value = 'INR';
        }

        updateAllDisplays();
    }

    function updateAllDisplays() {
        const symbol = getSymbol();
        document.querySelectorAll('.currency-symbol').forEach(el => {
            el.textContent = symbol;
        });

        if (typeof renderStats === 'function') {
            renderStats();
        }

        if (typeof renderExpenses === 'function') {
            renderExpenses();
        }

        if (typeof updateUI === 'function') {
            updateUI();
        }
    }

    function init() {
        const saved = CashFlowState.getCurrency();
        if (saved && saved !== 'INR') {
            currentCurrency = saved;
            fetchRates().then(() => {
                if (rates[saved]) {
                    conversionRate = rates[saved];
                    const select = document.getElementById('currencySelect');
                    if (select) select.value = saved;
                    updateAllDisplays();
                }
            });
        }
    }

    return {
        init,
        getSymbol,
        getCurrent,
        getRate,
        convert,
        formatAmount,
        setCurrency,
        fetchRates
    };
})();
