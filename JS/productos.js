const { useState, useEffect } = React;

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    fetch("./Data/productos.json")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar ./Data/productos.json", err));
  }, []);

  function agregar(prod) {
    setCarrito(prev => {
      const existe = prev.find(p => p.nombre === prod.nombre);
      if (existe) {
        return prev.map(p =>
          p.nombre === prod.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...prod, cantidad: 1 }];
    });
  }

  function cambiarCantidad(nombre, delta) {
    setCarrito(prev =>
      prev
        .map(p =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + delta } : p
        )
        .filter(p => p.cantidad > 0)
    );
  }

  const total = carrito.reduce((acc, item) => {
    const precioNum = parseFloat(item.precio.replace("S/. ", ""));
    return acc + precioNum * item.cantidad;
  }, 0);

  return (
    <>
      <header className="w-full bg-orange-500 flex flex-wrap justify-between items-center px-4 md:px-8 py-3 text-white">

        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => (window.location.href = "index.html")}
        >
          <img
            src="imagenes/logo.jpg"
            alt="Logo"
            className="h-12 w-12 md:h-20 md:w-20 rounded-full p-1"
          />
          <h1 className="font-[Fredoka_One] text-lg md:text-2xl">Happy Paws</h1>
        </div>

        <nav className="flex overflow-x-auto space-x-3 md:space-x-6 text-sm md:text-lg mt-3 md:mt-0">
          <button
            onClick={() => (window.location.href = "index.html")}
            className="hover:bg-white hover:text-black px-3 py-1 rounded-lg font-semibold"
          >
            Home
          </button>

          <button className="bg-white text-black px-3 py-1 rounded-lg font-semibold">
            Productos
          </button>

          <button
            onClick={() => (window.location.href = "contactanos.html")}
            className="hover:bg-white hover:text-black px-3 py-1 rounded-lg font-semibold"
          >
            Contáctanos
          </button>

          <button
            onClick={() => (window.location.href = "nosotros.html")}
            className="hover:bg-white hover:text-black px-3 py-1 rounded-lg font-semibold"
          >
            Nosotros
          </button>

          <button
            onClick={() => (window.location.href = "blog.html")}
            className="hover:bg-white hover:text-black px-3 py-1 rounded-lg font-semibold"
          >
            Blog
          </button>

          <button
            onClick={() => (window.location.href = "juego.html")}
            className="hover:bg-white hover:text-black px-3 py-1 rounded-lg font-semibold"
          >
            Juego
          </button>
        </nav>


        <div className="flex items-center space-x-3 mt-3 md:mt-0">
          <button
            onClick={() => setCarritoAbierto(true)}
            className="bg-white text-black px-3 py-1 rounded-md font-semibold"
          >
            🛒 Carrito
          </button>
        </div>
      </header>


      <main className="px-4 md:px-10 py-10">
        <h1 className="text-2xl md:text-4xl font-[Fredoka_One] text-center mb-12 text-black">
          PRODUCTOS PARA LOS ENGREÍDOS DEL HOGAR
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {productos.map((prod, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-4 w-[260px] md:w-[280px] flex flex-col items-center hover:scale-105 transition-transform duration-200"
            >
              <img
                src={/imagenes/${prod.imagen}}
                alt={prod.nombre}
                className="h-44 md:h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{prod.nombre}</h3>
              <p className="text-sm text-gray-700 mb-3 text-center">{prod.descripcion}</p>

              <div className="flex justify-between items-center w-full">
                <span className="text-gray-800 font-semibold">{prod.precio}</span>
                <button
                  className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
                  onClick={() => agregar(prod)}
                >
                  AÑADIR
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full bg-gray-900 text-white py-10 px-4 md:px-8 flex flex-wrap justify-between gap-6">
        <div className="min-w-[200px]">
          <h2 className="font-[Fredoka_One] text-xl mb-2">Happy Paws</h2>
          <p className="text-xs md:text-sm leading-relaxed">
            Tu tienda de confianza para consentir a tus mascotas.
            <br />
            Productos de calidad, amor y cuidado para cada patita feliz.
          </p>
        </div>

        <div className="min-w-[180px]">
          <h2 className="font-[Fredoka_One] text-xl mb-2">Encuéntranos en:</h2>
          <ul className="space-y-1 text-xs md:text-sm">
            <li>📍 Calle mascotitas 333</li>
            <li>📞 +51 999 888 777</li>
            <li>✉ happypaws@contact.pe</li>
          </ul>
        </div>

        <div className="min-w-[160px]">
          <h2 className="font-[Fredoka_One] text-xl mb-2">Síguenos en:</h2>
          <div className="flex space-x-4 text-xl md:text-2xl">
            <a href="#" className="hover:text-orange-400">📘</a>
            <a href="#" className="hover:text-orange-400">📷</a>
            <a href="#" className="hover:text-orange-400">🐦</a>
            <a href="#" className="hover:text-orange-400">💬</a>
          </div>
        </div>
      </footer>

      {carritoAbierto && (
        <div className="fixed top-0 right-0 w-full sm:w-[380px] h-full bg-white shadow-2xl p-5 flex flex-col z-50">
          <h2 className="text-2xl font-bold mb-4">🛒 Carrito</h2>

          <div className="flex-1 overflow-y-auto">
            {carrito.map((item, i) => {
              const precioNum = parseFloat(item.precio.replace("S/. ", ""));
              return (
                <div key={i} className="flex justify-between items-center mb-4 border-b pb-2">
                  <div className="w-2/3">
                    <p className="font-semibold">{item.nombre}</p>
                    <p className="text-sm">S/. {precioNum.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="bg-gray-300 px-2 rounded" onClick={() => cambiarCantidad(item.nombre, -1)}>
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button className="bg-gray-300 px-2 rounded" onClick={() => cambiarCantidad(item.nombre, 1)}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="font-bold text-xl">Total: S/. {total.toFixed(2)}</p>

            <button
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => {
                if (carrito.length === 0) return alert("Tu carrito está vacío.");
                alert("¡Gracias por tu compra! 🐾");
                setCarrito([]);
              }}
            >
              Finalizar Compra
            </button>

            <button
              className="w-full mt-2 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
              onClick={() => setCarritoAbierto(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);


