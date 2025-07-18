// ...existing code...

document.getElementById('sendEmailBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value;
    const canvas = document.getElementById('barChart');
    if (!canvas || !email) return alert('Please enter a valid email and generate the chart first.');
    const image = canvas.toDataURL('image/png');
    const response = await fetch('http://localhost:3000/send-chart-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, image })
    });
    if (response.ok) {
        alert('Chart sent to your email!');
    } else {
        alert('Failed to send email.');
    }
});

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
//     index
// }


// const cars = [
//     { id: 1, manufacturer: 'Toyota', model: 'Camry', year: 2020, price: 24000 },
//     { id: 2, manufacturer: 'Honda', model: 'Accord', year: 2019, price: 22000 },
//     { id: 3, manufacturer: 'Ford', model: 'Mustang', year: 2021, price: 35000 },
//     { id: 4, manufacturer: 'Chevrolet', model: 'Malibu', year: 2018, price: 18000 },
//     { id: 5, manufacturer: 'Tesla', model: 'Model 3', year: 2022, price: 42000 },
//     { id: 6, manufacturer: 'BMW', model: '3 Series', year: 2020, price: 41000 },
//     { id: 7, manufacturer: 'Audi', model: 'A4', year: 2019, price: 39000 },
//     { id: 8, manufacturer: 'Hyundai', model: 'Elantra', year: 2021, price: 20000 },
//     { id: 9, manufacturer: 'Kia', model: 'Optima', year: 2018, price: 17000 },
//     { id: 10, manufacturer: 'Nissan', model: 'Altima', year: 2022, price: 25000 }
// ];


// An array of 10 cars with the following properties : Type, Manufacturer, Model, Year, Price
// const cars = [
//     { type: 'Sedan', manufacturer: 'Toyota', model: 'Camry', year: 2020, price: 24000 },
//     { type: 'Sedan', manufacturer: 'Honda', model: 'Accord', year: 2019, price: 22000 },
//     { type: 'Coupe', manufacturer: 'Ford', model: 'Mustang', year: 2021, price: 35000 },
//     { type: 'Sedan', manufacturer: 'Chevrolet', model: 'Mal  ibu', year: 2018, price: 18000 },
//     { type: 'Electric', manufacturer: 'Tesla', model: 'Model 3', year: 2022, price: 42000 },
//     { type: 'Sedan', manufacturer: 'BMW', model: '3 Series', year: 2020, price: 41000 },

// ...existing code...
// Username validation with Bootstrap feedback
const usernameInput = document.getElementById('username');
const validationElem = document.getElementById('username-validation');
const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

usernameInput.addEventListener('input', () => {
    const username = usernameInput.value;
    if (usernameRegex.test(username)) {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
        if (validationElem) {
            validationElem.style.display = 'none';
            validationElem.textContent = '';
        }
    } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.add('is-invalid');
        if (validationElem) {
            validationElem.style.display = 'block';
            validationElem.textContent = 'Username must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let chartInstance = null;
    let chartInitialized = false;

    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    // Helper: Read all input fields and return data object
    const getMonthlyIncomeExpenses = () => {
        const data = {};
        months.forEach(month => {
            const income = parseFloat(document.getElementById(`income-${month}`)?.value) || 0;
            const expenses = parseFloat(document.getElementById(`expenses-${month}`)?.value) || 0;
            data[month] = { income, expenses };
        });
        return data;
    };

    // Chart update helper
    const updateChartData = chart => {
        const monthlyData = getMonthlyIncomeExpenses();
        const incomeData = months.map(m => monthlyData[m].income);
        const expensesData = months.map(m => monthlyData[m].expenses);
        chart.data.datasets[0].data = incomeData;
        chart.data.datasets[1].data = expensesData;
        chart.update();
    };

    // Handle chart tab click
    document.getElementById('chart-tab').addEventListener('click', () => {
        setTimeout(() => {
            if (!chartInitialized) {
                const ctxElem = document.getElementById('barChart');
                if (!ctxElem) return;
                const ctx = ctxElem.getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
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
            if (chartInstance) {
                updateChartData(chartInstance);
            }
        }, 100);
    });

    // Add listeners to update chart when inputs change (if chart is visible)
    const addInputListeners = () => {
        months.forEach(month => {
            const incomeInput = document.getElementById(`income-${month}`);
            const expensesInput = document.getElementById(`expenses-${month}`);
            incomeInput?.addEventListener('input', () => {
                if (chartInstance) updateChartData(chartInstance);
            });
            expensesInput?.addEventListener('input', () => {
                if (chartInstance) updateChartData(chartInstance);
            });
        });
    };

    addInputListeners();
});

// Download chart as image
document.getElementById('downloadBtn').addEventListener('click', () => {
    const canvas = document.getElementById('barChart');
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
});
