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

  // ---------- Filtros ----------
  $scope.categoriaSeleccionada = "";  // "" = todas las categorías
  $scope.busqueda = "";               // texto del buscador por nombre

  // ---------- Ordenamiento ----------
  $scope.opcionOrden = "nombre-asc";
  $scope.campoOrden = "title";
  $scope.ordenInverso = false;

  const mapaOrden = {
    "nombre-asc": { campo: "title", inverso: false },
    "nombre-desc": { campo: "title", inverso: true },
    "precio-asc": { campo: "price", inverso: false },
    "precio-desc": { campo: "price", inverso: true }
  };

  $scope.actualizarOrden = function () {
    const config = mapaOrden[$scope.opcionOrden];
    if (config) {
      $scope.campoOrden = config.campo;
      $scope.ordenInverso = config.inverso;
    }
  };

  $scope.filtroPorCategoria = function (producto) {
    return ProductoService.coincideCategoria(producto, $scope.categoriaSeleccionada);
  };

  $scope.etiquetaCategoria = function () {
    return $scope.categoriaSeleccionada || "Todas las categorías";
  };

  // ---------- Detalles y carrito (los usan José y Josué) ----------
  $scope.productoSeleccionado = null; // producto que se ve en el modal de detalles
  $scope.carrito = [];                // productos agregados: { producto, cantidad }

  // ---------- Carga de productos ----------
  ProductoService.obtenerProductos()
    .then(function (productos) {
      $scope.productos = productos;
      $scope.categorias = ProductoService.obtenerCategoriasUnicas(productos);
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

  // ---------- Carrito de compras (Josué) ----------

  // Agregar un producto al carrito
  $scope.agregarAlCarrito = function (producto) {

    var encontrado = $scope.carrito.find(function (item) {
      return item.producto.id === producto.id;
    });

    if (encontrado) {
      // Si ya existe, aumentar la cantidad
      encontrado.cantidad++;
    } else {
      // Si no existe, agregarlo al carrito
      $scope.carrito.push({
        producto: producto,
        cantidad: 1
      });
    }
  };

  // Calcular el total de la compra
  $scope.totalCarrito = function () {
    var total = 0;

    $scope.carrito.forEach(function (item) {
      total += item.producto.price * item.cantidad;
    });

    return total;
  };

  // Eliminar un producto del carrito
  $scope.eliminarDelCarrito = function (indice) {
    $scope.carrito.splice(indice, 1);
  };

  // Realizar el pago simulado
  $scope.pagar = function () {

    // Comprobar si hay productos
    if ($scope.carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Obtener el total
    var total = $scope.totalCarrito();

    // Pedir confirmación al cliente
    var confirmar = confirm(
      "¿Deseas confirmar tu compra por $" +
      total.toFixed(2) + "?"
    );

    // Si confirma, finalizar la compra
    if (confirmar) {
      $scope.carrito = [];

      // Cerrar el modal del carrito
      $("#modalCarrito").modal("hide");

      // Mostrar mensaje de éxito
      alert("¡Compra realizada exitosamente!");
    }
  };

});
