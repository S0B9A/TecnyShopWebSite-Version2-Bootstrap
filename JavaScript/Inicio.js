const labels = ['Atención al Cliente', 'Calidad del Producto', 'Satisfacción del Cliente'];
const colors = ['rgb(255,165,0)', 'rgb(255,140,0)', 'rgb(255,99,71)'];

const graph = document.querySelector("#grafica");

const data = {
    labels: labels,
    datasets: [{
        data: [33, 33, 34], // Los porcentajes suman 100%
        backgroundColor: colors
    }]
};

const config = {
    type: 'pie',
    data: data,
};

new Chart(graph, config);
