const selectorOrden = document.getElementById('orden');
const listaDisponibles = document.getElementById('listaDisponibles');

selectorOrden.addEventListener('change', function () {
    const tarjetas = Array.from(listaDisponibles.children);

    tarjetas.sort(function (a, b) {
        const precioA = parseFloat(a.dataset.precio);
        const precioB = parseFloat(b.dataset.precio);
        const tamanoA = parseInt(a.dataset.tamano, 10);
        const tamanoB = parseInt(b.dataset.tamano, 10);

        if (selectorOrden.value === 'precio-desc') {
            return precioB - precioA;
        }
        if (selectorOrden.value === 'tamano') {
            return (tamanoB - tamanoA) || (precioA - precioB);
        }
        return precioA - precioB;
    });

    tarjetas.forEach(function (tarjeta) {
        listaDisponibles.appendChild(tarjeta);
    });
});