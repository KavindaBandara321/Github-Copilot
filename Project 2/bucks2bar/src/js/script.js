//input with id='username" on change event
document.getElementById('username').addEventListener('input', function () {
    var username = document.getElementById('username').value;
    var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var validationElem = document.getElementById('username-validation');
    if (regex.test(username)) {
        document.getElementById('username').classList.remove('is-invalid');
        document.getElementById('username').classList.add('is-valid');
        if (validationElem) {
            validationElem.style.display = 'none';
            validationElem.textContent = '';
        }
    } else {
        document.getElementById('username').classList.remove('is-valid');
        document.getElementById('username').classList.add('is-invalid');
        if (validationElem) {
            validationElem.style.display = 'block';
            validationElem.textContent = 'Username must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.';
        }
    }
})



document.addEventListener('DOMContentLoaded', function () {
    var chartInitialized = false;
    var chartInstance = null;

    // Helper: Read all input fields and return data object
    function getMonthlyIncomeExpenses() {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        const data = {};
        months.forEach(month => {
            const income = parseFloat(document.getElementById(`income-${month}`).value) || 0;
            const expenses = parseFloat(document.getElementById(`expenses-${month}`).value) || 0;
            data[month] = { income, expenses };
        });
        return data;
    }

    // Chart update helper
    function updateChartData(chartInstance) {
        const monthlyData = getMonthlyIncomeExpenses();
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        const incomeData = months.map(m => monthlyData[m].income);
        const expensesData = months.map(m => monthlyData[m].expenses);
        chartInstance.data.datasets[0].data = incomeData;
        chartInstance.data.datasets[1].data = expensesData;
        chartInstance.update();
    }

    // Handle chart tab click
    document.getElementById('chart-tab').addEventListener('click', function () {
        setTimeout(function () {
            if (!chartInitialized) {
                var ctx = document.getElementById('barChart');
                if (!ctx) return;
                ctx = ctx.getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                            {
                                label: 'Income',
                                data: Array(12).fill(0),
                                backgroundColor: 'rgba(54, 162, 235, 0.5)'
                            },
                            {
                                label: 'Expenses',
                                data: Array(12).fill(0),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
                chartInitialized = true;
            }
            // Always update chart data on tab click
            if (chartInstance) {
                updateChartData(chartInstance);
            }
        }, 100);
    });

    // Add listeners to update chart when inputs change (if chart is visible)
    function addInputListeners() {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        months.forEach(month => {
            const incomeInput = document.getElementById(`income-${month}`);
            const expensesInput = document.getElementById(`expenses-${month}`);
            if (incomeInput) {
                incomeInput.addEventListener('input', () => {
                    if (chartInstance) updateChartData(chartInstance);
                });
            }
            if (expensesInput) {
                expensesInput.addEventListener('input', () => {
                    if (chartInstance) updateChartData(chartInstance);
                });
            }
        });
    }

    addInputListeners();
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.getElementById('barChart');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
});
