let invest = document.getElementById('invest');
let invest_range = document.getElementById('invest_range');
let rate = document.getElementById('rate');
let rate_range = document.getElementById('rate_range');
let time = document.getElementById('time');
let time_range = document.getElementById('time_range');
let invest_amount = document.getElementById("invest_amount");
let est_return = document.getElementById("est_return");
let total_val = document.getElementById("total_val");

(() => {
    invest.value = invest_range.value;
    rate.value = rate_range.value;
    time.value = time_range.value;
})();

const handlechange = () => {
    invest.value = invest_range.value;
    rate.value = rate_range.value;
    time.value = time_range.value;
    calculate();

    if (invest.value == "0" || rate.value == "0" || time.value == "0") {
        confirm("Please enter a valid amount");
        invest.value = 100;
        rate.value = 5;
        time.value = 8;
    }
};

const handlechangerev = () => {
    invest_range.value = invest.value;
    rate_range.value = rate.value;
    time_range.value = time.value;
    calculate();

    if (invest.value == "0" || rate.value == "0" || time.value == "0") {
        confirm("Please enter a valid amount");
        invest.value = 500;
        rate.value = 5;
        time.value = 8;
    }
};

function calculate() {
    let P = parseFloat(invest.value);
    let r = parseFloat(rate.value) / 100 / 12;
    let n = parseFloat(time.value) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n)) return;

    let invested = P * n;
    let futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    let returns = futureValue - invested;

    invest_amount.innerText = `₹ ${invested.toLocaleString('en-IN')}`;
    est_return.innerText = `₹ ${returns.toLocaleString('en-IN')}`;
    total_val.innerText = `₹ ${(futureValue).toLocaleString('en-IN')}`;

    sipChart.data.datasets[0].data = [invested, returns];
    sipChart.update();
}

const ctx = document.getElementById('sipChart').getContext('2d');

const sipChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Invested amount', 'Est. returns'],
        datasets: [{
            label: 'SIP Chart',
            data: [3000000, 2600897],
            backgroundColor: ['#aefff4', '#4c6ef5'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#555',
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    }
});
