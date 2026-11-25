// =========================================
// Servicio que consume el servicio web de productos (JSON del docente)
// Se usa $http, que es el servicio de AngularJS para hacer peticiones
// =========================================

app.factory("ProductoService", function ($http) {
  const URL_PRODUCTOS = "https://fakestoreapi.com/products";

  return {
    // Devuelve una promesa con la lista de productos
    obtenerProductos: function () {
      return $http.get(URL_PRODUCTOS).then(function (respuesta) {
        return respuesta.data;
      });
    }
  };
});
