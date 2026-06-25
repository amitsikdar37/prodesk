const CashFlowChart = (() => {
    let chartInstance = null;

    const COLORS = {
        balance: '#2563eb',       // Royal Blue
        balanceHover: '#3b82f6',
        expenses: '#ef4444',      // Red
        expensesHover: '#f87171',
        empty: '#e5e7eb'          // Light gray
    };

    function init() {
        const canvas = document.getElementById('expenseChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Remaining Balance', 'Total Expenses'],
                datasets: [{
                    data: [1, 0],
                    backgroundColor: [COLORS.balance, COLORS.expenses],
                    hoverBackgroundColor: [COLORS.balanceHover, COLORS.expensesHover],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    borderRadius: 4,
                    spacing: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '72%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#1f2937',
                        bodyColor: '#6b7280',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        titleFont: {
                            family: "'Inter', sans-serif",
                            size: 13,
                            weight: 600
                        },
                        bodyFont: {
                            family: "'JetBrains Mono', monospace",
                            size: 12
                        },
                        callbacks: {
                            label: function(context) {
                                const symbol = CashFlowCurrency ? CashFlowCurrency.getSymbol() : '₹';
                                const val = context.parsed || 0;
                                return ` ${symbol}${formatChartNumber(val)}`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: false,
                    duration: 600,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    function formatChartNumber(num) {
        return num.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    function update(balance, totalExpenses) {
        if (!chartInstance) return;

        if (balance <= 0 && totalExpenses <= 0) {
            chartInstance.data.datasets[0].data = [1, 0];
            chartInstance.data.datasets[0].backgroundColor = [COLORS.empty, COLORS.expenses];
        } else {
            const displayBalance = Math.max(0, balance);
            chartInstance.data.datasets[0].data = [displayBalance, totalExpenses];
            chartInstance.data.datasets[0].backgroundColor = [COLORS.balance, COLORS.expenses];
        }

        chartInstance.update('active');
    }

    return { init, update };
})();
