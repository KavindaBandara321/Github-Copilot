// Retrieve income and expenses for each month
function getMonthlyIncomeExpenses() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const data = {};
    months.forEach(month => {
        const incomeInput = document.getElementById(`income-${month}`);
        const expensesInput = document.getElementById(`expenses-${month}`);
        data[month] = {
            income: incomeInput ? Number(incomeInput.value) || 0 : 0,
            expenses: expensesInput ? Number(expensesInput.value) || 0 : 0
        };
    });
    return data;
}

// Example usage:
// const allData = getMonthlyIncomeExpenses();
// console.log(allData);
