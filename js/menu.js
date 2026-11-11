const menuPrincipal = document.getElementById('menuPrincipal');

document.querySelectorAll('#menuPrincipal .nav-link').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        if (menuPrincipal.classList.contains('show')) {
            const desplegable = bootstrap.Collapse.getInstance(menuPrincipal)
                || new bootstrap.Collapse(menuPrincipal, { toggle: false });
            desplegable.hide();
        }
    });
});