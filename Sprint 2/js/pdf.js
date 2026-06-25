const CashFlowPDF = (() => {
    const PDF_SYMBOLS = {
        INR: 'Rs.',
        USD: '$',
        EUR: 'EUR ',
        GBP: 'GBP '
    };

    function getPdfSymbol() {
        const currency = CashFlowCurrency.getCurrent();
        return PDF_SYMBOLS[currency] || currency + ' ';
    }

    function generateReport() {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            showToast('PDF library not loaded. Please try again.', 'error');
            return;
        }

        const doc = new jsPDF();
        const state = CashFlowState.getState();
        const pdfSymbol = getPdfSymbol();
        const rate = CashFlowCurrency.getRate();
        const currencyCode = CashFlowCurrency.getCurrent();

        const salary = state.salary * rate;
        const totalExpenses = CashFlowState.getTotalExpenses() * rate;
        const balance = CashFlowState.getRemainingBalance() * rate;

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        doc.setFillColor(30, 27, 75);
        doc.rect(0, 0, 210, 45, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text('Cash-Flow', 20, 22);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(180, 180, 220);
        doc.text('Salary & Expense Report', 20, 32);

        doc.setFontSize(9);
        doc.setTextColor(160, 160, 200);
        doc.text('Generated: ' + dateStr + ' at ' + timeStr, 210 - 20, 32, { align: 'right' });
        doc.text('Currency: ' + currencyCode, 210 - 20, 22, { align: 'right' });

        let yPos = 60;

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 27, 75);
        doc.text('Financial Summary', 20, yPos);

        yPos += 5;
        doc.setDrawColor(139, 92, 246);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);

        yPos += 12;

        const summaryData = [
            ['Total Salary', pdfSymbol + formatNum(salary)],
            ['Total Expenses', pdfSymbol + formatNum(totalExpenses)],
            ['Remaining Balance', pdfSymbol + formatNum(balance)]
        ];

        doc.autoTable({
            startY: yPos,
            head: [['Description', 'Amount']],
            body: summaryData,
            margin: { left: 20, right: 20 },
            theme: 'grid',
            headStyles: {
                fillColor: [139, 92, 246],
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                fontSize: 10,
                textColor: [30, 30, 50]
            },
            alternateRowStyles: {
                fillColor: [245, 243, 255]
            },
            columnStyles: {
                1: { halign: 'right', fontStyle: 'bold' }
            }
        });

        yPos = doc.lastAutoTable.finalY + 20;

        if (state.expenses.length > 0) {
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 27, 75);
            doc.text('Expense Breakdown', 20, yPos);

            yPos += 5;
            doc.setDrawColor(139, 92, 246);
            doc.line(20, yPos, 190, yPos);

            yPos += 8;

            const expenseRows = state.expenses.map((exp, idx) => [
                (idx + 1).toString(),
                exp.name,
                pdfSymbol + formatNum(exp.amount * rate)
            ]);

            doc.autoTable({
                startY: yPos,
                head: [['#', 'Expense Name', 'Amount']],
                body: expenseRows,
                margin: { left: 20, right: 20 },
                theme: 'striped',
                headStyles: {
                    fillColor: [244, 63, 94],
                    textColor: 255,
                    fontStyle: 'bold',
                    fontSize: 10
                },
                bodyStyles: {
                    fontSize: 9.5,
                    textColor: [40, 40, 60]
                },
                alternateRowStyles: {
                    fillColor: [255, 245, 247]
                },
                columnStyles: {
                    0: { halign: 'center', cellWidth: 15 },
                    2: { halign: 'right', fontStyle: 'bold' }
                }
            });
        }

        if (CashFlowState.isThresholdBreached()) {
            const warningY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : yPos + 15;
            doc.setFillColor(254, 226, 226);
            doc.roundedRect(20, warningY, 170, 14, 3, 3, 'F');
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(185, 28, 28);
            doc.text('WARNING: Remaining balance is below 10% of salary!', 105, warningY + 9, { align: 'center' });
        }

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 170);
            doc.text(
                'Cash-Flow Report - Page ' + i + ' of ' + pageCount,
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );
        }

        doc.save('cashflow-report-' + now.toISOString().slice(0, 10) + '.pdf');

        if (typeof showToast === 'function') {
            showToast('Report downloaded successfully!', 'success');
        }
    }

    function formatNum(num) {
        return num.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return { generateReport };
})();
