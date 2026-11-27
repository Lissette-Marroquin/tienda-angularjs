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
    },

    // Lista de categorías sin repetir, ordenada alfabéticamente
    obtenerCategoriasUnicas: function (productos) {
      const categorias = [];
      productos.forEach(function (producto) {
        if (categorias.indexOf(producto.category) === -1) {
          categorias.push(producto.category);
        }
      });
      categorias.sort();
      return categorias;
    },

    // Criterio de filtro por categoría ("" = todas)
    coincideCategoria: function (producto, categoriaSeleccionada) {
      if (!categoriaSeleccionada) {
        return true;
      }
      return producto.category === categoriaSeleccionada;
    },

    // Criterio de filtro por nombre (opcional; en la vista también se usa filter:{title: busqueda})
    coincideNombre: function (producto, texto) {
      if (!texto) {
        return true;
      }
      return producto.title.toLowerCase().indexOf(texto.toLowerCase()) !== -1;
    }
  };
});