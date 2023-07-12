new Chart(
    document.getElementById('grafico'),
    {
    type: 'bar',
    data: {
        labels: ['Games Played'],
        datasets: [
            {
                label: 'Acquisitions by year',
                data: [1,2,3,4,5]
            }
        ]
    }
    }
);

