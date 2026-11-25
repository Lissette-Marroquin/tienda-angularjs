// =========================================
// Controlador principal de la tienda
// Carga los productos del servicio web y los muestra en las cards
// =========================================

app.controller("TiendaController", function ($scope, ProductoService) {

  // ---------- Datos de la tienda ----------
  $scope.productos = [];        // lista de productos del JSON
  $scope.categorias = [];       // nombres de las categorías (sin repetir)
  $scope.cargando = true;       // muestra el mensaje "Cargando..."
  $scope.error = "";            // mensaje si falla el servicio web

  // ---------- Filtros (los usa Fernando) ----------
  $scope.categoriaSeleccionada = "";  // "" = todas las categorías
  $scope.busqueda = "";               // texto del buscador por nombre

  // ---------- Detalles y carrito (los usan José y Josué) ----------
  $scope.productoSeleccionado = null; // producto que se ve en el modal de detalles
  $scope.carrito = [];                // productos agregados: { producto, cantidad }

  // ---------- Carga de productos ----------
  ProductoService.obtenerProductos()
    .then(function (productos) {
      $scope.productos = productos;

      // Se sacan las categorías de los productos, sin repetirlas
      productos.forEach(function (producto) {
        if ($scope.categorias.indexOf(producto.category) === -1) {
          $scope.categorias.push(producto.category);
        }
      });
    })
    .catch(function () {
      $scope.error = "No se pudieron cargar los productos. Revise su conexión a internet.";
    })
    .finally(function () {
      $scope.cargando = false;
    });

  // Guarda el producto que se eligió para mostrarlo en el modal de detalles
  $scope.verDetalles = function (producto) {
    $scope.productoSeleccionado = producto;
    // PENDIENTE (José): abrir el modal de detalles, por ejemplo con $("#modalDetalles").modal("show")
  };

  // PENDIENTE (Josué): funciones del carrito
  // agregarAlCarrito(producto), totalCarrito() y pagar()
  $scope.totalCarrito = function () {
    return 0;
  };
});
