class UI {
    constructor() {

         //Instanciar la API
         this.api = new API();

         //Crear los markers con LayerGroup
         this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimiento(){
        this.api.obtenerDatos()
            .then( datos => {
                //console.log(datos);
                const resultado = datos.respuestaJSON.results;

                //Ejecutar la función para mostrar los pines
                this.mostrarPines(resultado);
            });
    }

    mostrarPines(datos){
        //console.log(datos);
        //Limpiar los markers
        this.markers.clearLayers();

        //Recorrer los establecimientos
        datos.forEach(dato => {
            // Destructuring
            const {latitude, longitude, calle, regular, premium } = dato;

            //Crear Popup
            const opcionesPopUp = L.popup()
                .setContent(`<p><b>Calle:</b> ${calle}</p>
                             <p><b>Regular:</b> ${regular}</p>
                             <p><b>Premium:</b> ${premium}</p>
                
                `);
            //Agregar el PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
    //Buscador
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then( datos => {
                //Obtener los datos
                const resultados = datos.respuestaJSON.results;

                //Enviar el JSON y la búsqueda para el filtrado
                this.filtrarSugerencias(resultados, busqueda);
            });
    }

    //Filtra las suguerencias en base al input
    filtrarSugerencias(resultado, busqueda){
        //Filtrar con .filter

        //Mostrar los pines

    }
}