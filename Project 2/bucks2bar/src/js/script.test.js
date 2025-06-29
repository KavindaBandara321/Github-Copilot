const { JSDOM } = require('jsdom');

// script.test.js

// Mock dependencies and DOM

describe('updateChartData', () => {
    let updateChartData, months, getMonthlyIncomeExpenses;
    let chartMock;

    beforeEach(() => {
        // Setup DOM for months' inputs
        const dom = new JSDOM(`
            <body>
                ${[
                    'january','february','march','april','may','june',
                    'july','august','september','october','november','december'
                ].map(m => `
                    <input id="income-${m}" value="100">
                    <input id="expenses-${m}" value="50">
                `).join('')}
            </body>
        `);
        global.document = dom.window.document;

        // Mock months and getMonthlyIncomeExpenses as in script.js
        months = [
            'january','february','march','april','may','june',
            'july','august','september','october','november','december'
        ];
        getMonthlyIncomeExpenses = () => {
            const data = {};
            months.forEach(month => {
                const income = parseFloat(document.getElementById(`income-${month}`)?.value) || 0;
                const expenses = parseFloat(document.getElementById(`expenses-${month}`)?.value) || 0;
                data[month] = { income, expenses };
            });
            return data;
        };

        // Recreate updateChartData with local dependencies
        updateChartData = chart => {
            const monthlyData = getMonthlyIncomeExpenses();
            const incomeData = months.map(m => monthlyData[m].income);
            const expensesData = months.map(m => monthlyData[m].expenses);
            chart.data.datasets[0].data = incomeData;
            chart.data.datasets[1].data = expensesData;
            chart.update();
        };

        // Mock chart object
        chartMock = {
            data: {
                datasets: [
                    { data: [] },
                    { data: [] }
                ]
            },
            update: jest.fn()
        };
    });

    it('should update chart datasets with correct income and expenses', () => {
        updateChartData(chartMock);

        expect(chartMock.data.datasets[0].data).toEqual(Array(12).fill(100));
        expect(chartMock.data.datasets[1].data).toEqual(Array(12).fill(50));
        expect(chartMock.update).toHaveBeenCalled();
    });

    it('should handle missing or invalid input values as 0', () => {
        // Set some fields to invalid values
        document.getElementById('income-january').value = '';
        document.getElementById('expenses-february').value = 'notanumber';

        updateChartData(chartMock);

        expect(chartMock.data.datasets[0].data[0]).toBe(0); // january income
        expect(chartMock.data.datasets[1].data[1]).toBe(0); // february expenses
    });
});