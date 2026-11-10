const botonesFiltro = document.querySelectorAll('[data-filtro]');
const tarjetasHabitacion = document.querySelectorAll('[data-tipo]');
const contador = document.getElementById('contador');

botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const filtro = boton.dataset.filtro;
        let visibles = 0;

        tarjetasHabitacion.forEach(function (tarjeta) {
            const mostrar = filtro === 'todas' || tarjeta.dataset.tipo === filtro;
            tarjeta.classList.toggle('d-none', !mostrar);
            if (mostrar) {
                visibles++;
            }
        });

        botonesFiltro.forEach(function (otro) {
            const activo = otro === boton;
            otro.classList.toggle('btn-dark', activo);
            otro.classList.toggle('btn-light', !activo);
            otro.classList.toggle('border', !activo);
            otro.setAttribute('aria-pressed', activo);
        });

        contador.textContent = visibles + (visibles === 1 ? ' tipo de habitación' : ' tipos de habitación');
    });
});