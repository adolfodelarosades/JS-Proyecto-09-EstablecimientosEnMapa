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

            //Agregar el PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
}