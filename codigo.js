window.addEventListener('DOMContentLoaded', event => {

    // Ativa o Bootstrap scrollspy no elemento de navegação principal
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Recolher a barra de navegação responsiva quando o botão de alternância estiver visível
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
document.addEventListener('DOMContentLoaded', function () {
    // Carregar o arquivo JSON com a lista de medicamentos ao carregar a página
    fetch('medicamentos.json')
        .then(response => response.json())
        .then(data => {
            // Guardar a lista de medicamentos numa varivel
            const medicamentos = data.medicamentos;

            //Obter o campo de entrada, o botão de procura e o conteiner de resultados
            const inputMedicamento = document.getElementById('medicamento');
            const buscarBtn = document.getElementById('bt1');
            const resultado = document.getElementById('resultado');

            // Adicionar um evento onclick ao botão de procura para realizar a pesquisa
            buscarBtn.addEventListener('click', function () {
                const query = inputMedicamento.value.trim().toLowerCase();
                resultado.innerHTML = '';

                if (query !== '') {
                    // Filtrar os medicamentos que coincidem com a consulta
                    const coincidencias = medicamentos.filter(medicamento =>
                        medicamento.toLowerCase().startsWith(query)
                    );

                    // Mostrar os medicamentos coincidentes
                    if (coincidencias.length > 0) {
                        const lista = document.createElement('ul');
                        coincidencias.forEach(coincidencia => {
                            const item = document.createElement('li');
                            item.textContent = coincidencia;
                            lista.appendChild(item);
                        });
                        resultado.appendChild(lista);
                    } else {
                        resultado.textContent = 'Não foram encontrados medicamentos correspondentes.';
                    }
                } else {
                    resultado.textContent = 'Por favor, escreva uma palavra para procurar.';
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o archivo JSON:', error));
});
   