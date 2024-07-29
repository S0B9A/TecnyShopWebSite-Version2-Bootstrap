
const labels = valores.map(item => item.Nombre);
const colors = valores.map(item => item.color);

const graph = document.querySelector("#grafica");

const data = {
    labels: labels,
    datasets: [{
        data: valores.map(() => 100 / valores.length), // Distribuir porcentajes equitativamente
        backgroundColor: colors
    }]
};

const config = {
    type: 'pie',
    data: data,
};

new Chart(graph, config);