// ===== Datos de la reserva =====
const HABITACIONES = {
    doble: { nombre: 'Habitación doble', cama: '2 camas individuales', precioNoche: 45 },
    triple: { nombre: 'Habitación triple', cama: '2 camas individuales / cama supletoria', precioNoche: 60 }
};
const NOCHES = 2;
const DESCUENTO_WEB = 0.10;

const habitacion = HABITACIONES[new URLSearchParams(window.location.search).get('hab')] || HABITACIONES.doble;
const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

const bruto = habitacion.precioNoche * NOCHES;
const descuento = bruto * DESCUENTO_WEB;
const total = bruto - descuento;

// ===== Resumen de la reserva =====
document.getElementById('resHabitacion').textContent = habitacion.nombre;
document.getElementById('resCama').textContent = habitacion.cama;
document.getElementById('resNoches').textContent = NOCHES + ' noches × ' + euros.format(habitacion.precioNoche);
document.getElementById('resBruto').textContent = euros.format(bruto);
document.getElementById('resDescuento').textContent = '-' + euros.format(descuento);
document.getElementById('resTotal').textContent = euros.format(total);

const textoBotonPago = 'Pagar ' + euros.format(total) + ' y confirmar';
const botonPago = document.getElementById('botonPago');
botonPago.textContent = textoBotonPago;

// ===== Formulario y pago simulado =====
const formulario = document.getElementById('formReserva');
const campoTarjeta = document.getElementById('tarjeta');
const campoCaducidad = document.getElementById('caducidad');
const campoCvv = document.getElementById('cvv');
const modalElemento = document.getElementById('modalConfirmacion');
const modalConfirmacion = new bootstrap.Modal(modalElemento);

campoTarjeta.addEventListener('input', function () {
    const digitos = campoTarjeta.value.replace(/\D/g, '').slice(0, 16);
    campoTarjeta.value = digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
    campoTarjeta.setCustomValidity(digitos.length === 16 ? '' : 'Tarjeta no valida');
});

campoCaducidad.addEventListener('input', function () {
    const digitos = campoCaducidad.value.replace(/\D/g, '').slice(0, 4);
    campoCaducidad.value = digitos.length > 2 ? digitos.slice(0, 2) + '/' + digitos.slice(2) : digitos;

    let valida = false;
    if (digitos.length === 4) {
        const mes = parseInt(digitos.slice(0, 2), 10);
        const anio = 2000 + parseInt(digitos.slice(2), 10);
        // Dia 0 del mes siguiente = ultimo dia del mes de caducidad
        const finDeMes = new Date(anio, mes, 0, 23, 59, 59);
        valida = mes >= 1 && mes <= 12 && finDeMes >= new Date();
    }
    campoCaducidad.setCustomValidity(valida ? '' : 'Caducidad no valida');
});

campoCvv.addEventListener('input', function () {
    campoCvv.value = campoCvv.value.replace(/\D/g, '').slice(0, 4);
    campoCvv.setCustomValidity(campoCvv.value.length >= 3 ? '' : 'CVV no valido');
});

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
        evento.stopPropagation();
        formulario.classList.add('was-validated');
        return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const ultimosDigitos = campoTarjeta.value.slice(-4);
    const codigo = 'HCL-' + Math.floor(100000 + Math.random() * 900000);

    botonPago.disabled = true;
    botonPago.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Procesando pago...';

    setTimeout(function () {
        document.getElementById('textoConfirmacion').textContent =
            'Gracias, ' + nombre + '. Hemos enviado la confirmación a ' + email + '.';
        document.getElementById('textoPago').textContent =
            'Pago de ' + euros.format(total) + ' realizado con la tarjeta terminada en ' + ultimosDigitos;
        document.getElementById('codigoReserva').textContent = codigo;

        modalConfirmacion.show();

        botonPago.disabled = false;
        botonPago.textContent = textoBotonPago;
    }, 2000);
});

modalElemento.addEventListener('hidden.bs.modal', function () {
    window.location.href = 'index.html';
});