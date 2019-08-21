const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimiento();
});

//Habilitar búsqueda de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    console.log('Escribiendo...', buscador.value);
    if(buscador.value.length > 5 ){
        //Buscar en la API
        ui.obtenerSugerencias(buscador.value);
    }
});
