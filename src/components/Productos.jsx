import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';

const products = [
  { id: 1, name: 'D10', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd10%2Fd10-1-1.png&w=256&q=75', description: 'El sistema de iluminación solar para el hogar D10 de d.light brinda una iluminación moderna y sostenible a los hogares, ya que proporciona una luz brillante a dos habitaciones separadas con la comodidad de los interruptores montados en la pared. Diseñado para la eficiencia, el D10 también carga varios teléfonos móviles y pequeños accesorios a través de su puerto USB después de solo un día de carga solar. Con una batería recargable que ofrece hasta 24 horas de luz por carga completa, el D10 es 22 veces más brillante que las lámparas de queroseno tradicionales. El sistema está habilitado para PayGo, lo que permite un fácil pago en cuotas, y viene con una garantía de 2 años para mayor confiabilidad.' },
  { id: 2, name: 'D100', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd100%2Fd100-1.png&w=256&q=75', description: 'Los sistemas solares domésticos D100 de d.light son una solución energética flexible y potente diseñada para hogares y pequeñas empresas. Con la tecnología PayGo, el sistema proporciona una iluminación brillante y moderna sin tener que hacer frente a una carga financiera inicial, lo que permite realizar el pago en cómodas cuotas. El D100 incluye un panel solar, una unidad base habilitada para Pay-Go y tres luces LED solares que incluyen 1 tubo y 2 bombillas LED con interruptores montados en la pared, que ofrecen hasta 12 horas de iluminación continua con una sola carga. Con una luz 20 veces más brillante que el queroseno, el D100 es una solución asequible y sostenible para las necesidades de energía fuera de la red. Además, el sistema viene con una garantía limitada de 2 años para su tranquilidad.' },
  { id: 3, name: 'D200', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd200%2Fd200-1.png&w=256&q=75', description: 'El sistema solar doméstico D200 de d.light es una solución energética integral y versátil diseñada para hogares y pequeñas empresas. Este sistema, que utiliza la tecnología PayGo, ofrece una iluminación brillante y moderna sin necesidad de un gran compromiso financiero inicial, lo que permite el pago en cómodas cuotas. El D200 incluye un panel solar policristalino de 12 W, una batería LiFePo4 de 10 Ah, cuatro luces solares (dos tubos de luz y dos bombillas), una radio y una linterna para mayor comodidad. El D200 ofrece hasta 8 horas de iluminación continua con una sola carga y es 20 veces más brillante que las lámparas de queroseno, lo que lo convierte en una solución energética asequible y sostenible para áreas sin red eléctrica. Además, el sistema viene con una garantía limitada de 2 años para un rendimiento confiable y duradero.' },
  { id: 4, name: 'X100Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx1000%2Fx1000-1.png&w=256&q=75', description: 'El sistema solar doméstico d.light X1000 Pro es una solución energética versátil y potente diseñada para hogares y pequeñas empresas. Con la tecnología PayGo, permite un pago sencillo a plazos, eliminando la necesidad de grandes costos iniciales. El sistema incluye un panel solar policristalino de 40 W, una batería LiFePo4 de 128 Wh y cinco luces solares (un tubo de luz, tres bombillas y una luz de seguridad con sensor de movimiento). También cuenta con interruptores en cadena para el control individual de las luces en diferentes habitaciones y tecnología Bluetooth para actualizaciones inalámbricas de tokens PayGo. El X1000 Pro admite electrodomésticos como un televisor de hasta 32 pulgadas y un ventilador de pie o de mesa, lo que lo convierte en una solución energética integral fuera de la red. Con la capacidad de alimentar varios dispositivos y ofrecer hasta 100 horas de luz en configuraciones bajas, es 20 veces más brillante que las lámparas de queroseno y viene con una garantía limitada de 2 años.' },
  { id: 5, name: 'X200Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx2000%2Fx2000-1.png&w=256&q=75', description: 'El sistema solar doméstico X2000 Pro de d.light es una central eléctrica solar diseñada para proporcionar energía fiable a hogares y pequeñas empresas. Este sistema admite varios electrodomésticos, como un televisor de 32", un ventilador de pie o de mesa y teléfonos móviles, además de luces brillantes y personalizables. El X2000 Pro incluye dos tubos de luz, tres bombillas, una luz de seguridad con sensor de movimiento, una radio FM con reproducción de MP3 y una linterna recargable. Con interruptores en cadena, el sistema permite el control individual de cada luz, lo que añade flexibilidad para iluminar varias habitaciones. Además, la tokenización PayGo habilitada con Bluetooth simplifica el pago mediante la actualización inalámbrica de tokens PayGo. El panel solar de 80 W y la batería LiFePO4 de 153,6 Wh proporcionan energía de larga duración, y el sistema viene con una garantía limitada de 2 años.' },
  { id: 6, name: 'X300Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx3000%2Fx3000-1.png&w=256&q=75', description: 'The d.light X3000 Pro Solar Home Systems is a high-performance, solar-powered energy solution designed to meet the diverse needs of homes and small businesses. Equipped with a 230Wh battery and a 120W solar panel, this system powers multiple appliances, including a 32" TV, stand or table fan, mobile phones, and lights. The system includes two tube lights, three bulbs, a motion-sensor security light, and accessories such as an FM radio with MP3 playback and a rechargeable torch. With daisy-chaining switches for individual light control in different rooms and Bluetooth-enabled PayGo technology for seamless wireless token updates, the X3000 Pro offers a comprehensive and reliable energy solution. It provides up to 120+ hours of light on low settings and is backed by a 2-year limited warranty.' },
  { id: 7, name: 'iMax10 Pro', type: 'Inversores solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fimax10%2Fimax10-1.jpg&w=640&q=75', description: 'El inversor solar y batería d.light iMax 10 es una solución energética versátil y potente que proporciona energía ininterrumpida a hogares y pequeñas empresas. Este sistema híbrido permite la carga dual, tanto de la energía solar como de la red eléctrica, lo que garantiza que la energía esté siempre disponible. Con una función de carga superrápida, el iMax 10 se carga por completo en hasta 3 horas utilizando tanto la energía solar como la red eléctrica, y puede cambiar sin problemas entre fuentes para obtener energía ininterrumpida las 24 horas. El sistema tiene una capacidad de carga de 500 W, lo que lo hace capaz de alimentar electrodomésticos esenciales, sin producir ruido, combustible ni humo, lo que garantiza una experiencia energética libre de estrés y respetuosa con el medio ambiente. La batería de 84 Ah que no requiere mantenimiento ofrece un rendimiento duradero y el sistema está respaldado por una garantía de 2 años.' },
  { id: 8, name: 'V240S-p', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv240s-p%2Fv240s-p-1-1.png&w=1080&q=75', description: 'Nuestro televisor AC/DC de 24" es una excelente incorporación a cualquier hogar, ya que le permitirá disfrutar de entretenimiento de calidad y mantener unidos a su familia.'  },
  { id: 9, name: 'V320S-p', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv320s-p%2Fv320s-p-1-1.png&w=1080&q=75', description: 'El televisor LED V320S-p de d.light es un televisor LED de 31,5 pulgadas ecológico y de bajo consumo diseñado para hogares y empresas que no dependen de la red eléctrica. Con un bajo consumo de energía de solo 15 W, el televisor funciona a 12 V, lo que lo hace perfecto para sistemas de energía solar. El V320S-p cuenta con un amplio ángulo de visión, un sintonizador DVB-T2/S2 integrado para ver canales gratuitos sin necesidad de un decodificador y múltiples opciones de entrada, que incluyen AV, HDMI y USB. Ofrece una resolución nítida de alta definición y está respaldado por una garantía de 2 años. El televisor está diseñado para proporcionar un tiempo de visualización prolongado mientras ahorra energía, lo que lo convierte en una solución de entretenimiento ideal para los consumidores conscientes de la energía.'  },
  { id: 10, name: 'SF40', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf40%2Fsf40-1.png&w=1080&q=75', description: 'El ventilador solar SF40 de d.light es un ventilador de 12 pulgadas eficiente, portátil y recargable con energía solar, diseñado para hogares y pequeñas empresas, especialmente en entornos sin red eléctrica. Con dos configuraciones de velocidad y una luz LED incorporada, el SF40 ofrece hasta 8 horas de funcionamiento con una carga completa. El panel solar de 10 W garantiza una carga solar rápida y confiable, mientras que la estructura de plástico ABS reforzado garantiza la durabilidad. El ventilador también cuenta con una oscilación de gran ángulo para una mejor circulación del aire y viene con un adaptador de CA para opciones de carga adicionales. Diseñado para una fácil movilidad, el asa hace que levantar y transportar el ventilador sea cómodo, brindando soluciones de enfriamiento e iluminación donde sea necesario.'  },
  { id: 11, name: 'SF50', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf50%2Fsf50-1.png&w=1080&q=75', description: 'El ventilador solar de CC SF50 de d.light es un potente ventilador de 16 pulgadas de bajo consumo diseñado para hogares y empresas, especialmente en regiones sin red eléctrica. Este ventilador, que funciona a 9 W, proporciona una refrigeración eficaz con sus cinco configuraciones de velocidad y una oscilación de amplio ángulo para una mejor circulación del aire. La luz LED incorporada añade versatilidad, lo que convierte al SF50 en una solución tanto de refrigeración como de iluminación. Fabricado en plástico ABS duradero, el ventilador cuenta con un indicador digital para controlar fácilmente las configuraciones. El SF50 combina rendimiento, durabilidad y ahorro de energía, lo que lo convierte en una opción ideal para quienes buscan una refrigeración fiable alimentada por energía solar.'  },
  { id: 12, name: 'A2', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fa2%2Fa2-1.jpg&w=640&q=75', description: 'Para cientos de millones de personas que viven sin acceso a la red eléctrica, A2 es la primera linterna solar de calidad que pueden permitirse, ya que les permite aumentar hasta un 20 % sus ingresos para otros usos. Su diseño pequeño y versátil es ultraportátil, pero puede iluminar todos los rincones de una habitación.'  },
  { id: 13, name: 'S3', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs3%2Fs3-1.jpg&w=640&q=75', description: 'La d.light S3 es la nueva generación de la linterna solar más vendida del mundo. Esta luz solar fácil de usar permite a los niños de todo el mundo en desarrollo estudiar durante las horas de la noche, mejorando sus calificaciones y creando un futuro más brillante. A los padres les encanta la asequibilidad, la confiabilidad y las oportunidades que ofrece.'  },
  { id: 14, name: 'S30', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs30%2Fs30-1.jpg&w=640&q=75', description: 'La linterna solar S30 de d.light está diseñada para que toda la familia la disfrute junta. La forma cónica única de la S30 refleja la luz en cada rincón de la habitación. Ya sea para iluminar su hogar o para brindar luz al caminar por la noche, la S30 ofrece una solución de iluminación portátil y asequible. Ilumine su hogar con la S30 de d.light.'  },
  { id: 15, name: 'S200', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs200%2Fs200-1.png&w=640&q=75', description: 'La d.light S200 es una potente linterna solar recargable con carga móvil diseñada para mantenerte conectado, de día o de noche. Perfecta para hogares, pequeñas empresas o aventuras al aire libre, esta linterna funciona como lámpara de mesa alta, lámpara de escritorio LED o lámpara de escritorio pequeña, proporcionando luz ambiental para diversas tareas. Ya sea para la luz de la oficina en casa, la luz de la mesa de estudio o la luz de la mesa de trabajo, la S200 ofrece una iluminación confiable. Su puerto USB incorporado garantiza una carga móvil conveniente, y la linterna se puede instalar en cualquier lugar, lo que la convierte en una solución de lámpara de escritorio solar ideal tanto para uso personal como para entornos de pequeñas empresas.'  },
  { id: 16, name: 'S610', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs610%2Fs610-2.png&w=640&q=75', description: 'La d.light S610 es una linterna solar portátil y recargable diseñada para un uso versátil en hogares y pequeñas empresas. Proporciona una luz ambiental ultra brillante de 360 ​​grados, es perfecta para iluminar habitaciones enteras y, al mismo tiempo, ofrece carga móvil con su batería de 4500 mAh. Esta linterna multiusos se adapta a diversas necesidades en interiores, ya sea para estudiar, trabajar o mantener sus dispositivos cargados. Su diseño liviano y duradero hace que sea fácil de transportar y usar en diferentes espacios, brindando iluminación y energía confiables donde sea necesario. La S610 es una solución todo en uno para quienes buscan una fuente de luz portátil y confiable con mayor comodidad.'  },
  { id: 17, name: 'T200', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200%2Ft200-1.png&w=640&q=75', description: 'La d.light T200 es una linterna portátil versátil alimentada por energía solar diseñada para brindar iluminación confiable y carga móvil a su vida diaria. Con su funcionalidad 3 en 1, la T200 sirve como una linterna potente, una luz lateral ambiental y una estación de carga móvil, lo que la hace ideal para el hogar, el uso al aire libre y las pequeñas empresas. Ya sea que necesite hasta 8 horas de luz brillante y ecológica o carga móvil mientras viaja, la T200 ofrece una solución sostenible y rentable. Equipada con un panel solar independiente, la T200 es 18 veces más brillante que las lámparas de queroseno y cuenta con una linterna con una longitud de haz de hasta 1 kilómetro.'  },
  { id: 18, name: 'T200R', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200r%2Ft200r-1.png&w=640&q=75', description: 'La d.light T200R es una linterna portátil de iluminación y entretenimiento que funciona con energía solar, diseñada para mantenerte informado, entretenido y bien iluminado dondequiera que vayas. Cuenta con una potente linterna con un alcance de hasta 1 kilómetro, una luz lateral ambiental para uso en interiores y una radio incorporada. Con la capacidad de cargar teléfonos móviles a través de su puerto USB, la T200R es perfecta para uso doméstico, actividades al aire libre y para mantenerse conectado mientras se está en movimiento. Equipada con un panel solar independiente y múltiples configuraciones de brillo, la T200R es una solución versátil y ecológica tanto para necesidades de iluminación como de entretenimiento.'  },
  { id: 19, name: 'T500R', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft500r%2Ft500r-1.jpg&w=640&q=75', description: 'La d.light T500R es una linterna portátil multifuncional, versátil y alimentada por energía solar, diseñada para brindar seguridad, conectividad y entretenimiento en movimiento. Como la primera linterna portátil PayGo de d.light, combina una linterna brillante con un haz de luz de 1 kilómetro, una luz lateral ambiental para uso en interiores y carga móvil a través de USB. La T500R también cuenta con una potente radio, capacidad Bluetooth y reproducción de música desde memorias USB o tarjetas de memoria, lo que lo mantiene informado y entretenido. Con su panel solar y la opción PayGo, la T500R ofrece una solución flexible y rentable para uso doméstico, comercial y al aire libre.'  },
];

const productTypes = ['Sistemas solares', 'Áticos', 'Linternas solares', 'Inversores solares'];

const Productos = () => {
  const [filteredType, setFilteredType] = useState('Productos');
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isOpen, setIsOpen] = useState(false); // Controlar si el menú está abierto
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [activeProduct, setActiveProduct] = useState(null); // Estado para el producto activo

  const handleAddToCart = (productId, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity }];
      }
    });
  };

  const handleFilterChange = (type) => {
    setFilteredType(type);
    setIsOpen(false); // Cerrar el menú después de seleccionar una opción
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 0;
      return { ...prevQuantities, [productId]: Math.max(currentQuantity + delta, 1) };
    });
  };

  const handleProductClick = (product) => {
    setActiveProduct(product);
  };

  const handleCloseMiniPage = () => {
    setActiveProduct(null);
  };

  const filteredProducts = filteredType === 'Productos'
    ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products.filter(product => product.type === filteredType && product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const rows = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    rows.push(filteredProducts.slice(i, i + 4));
  }

  return (
    <section id="productos" className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6">
    {/* Menu de filtros y búsqueda */}
    <div className="flex items-center justify-between mb-8 gap-8">
      {/* Filtro desplegable */}
      <Popover className="relative">
        <Popover.Button
          className="flex items-center gap-x-1 text-lg font-semibold text-black relative group px-4 py-2 bg-white border border-gray-300 rounded-md"
          onClick={() => setIsOpen(!isOpen)} // Toggle del estado del menú
        >
          {filteredType}
          <ChevronDownIcon
            className="h-5 w-5 text-black transition-transform duration-200"
            aria-hidden="true"
          />
        </Popover.Button>

        {isOpen && (
          <Popover.Panel className="absolute -left-2 top-full z-10 mt-3 inline-block overflow-hidden rounded-4xl bg-white shadow-lg ring-1 ring-gray-900/5 min-w-[280px]">
            <div className="p-4">
              {productTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex-auto">
                    <span className="block font-semibold text-gray-900">{type}</span>
                  </div>
                </div>
              ))}
              {/* Botón "Ver todos los productos" */}
              <div
                onClick={() => handleFilterChange('Productos')}
                className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-auto">
                  <span className="block font-semibold text-gray-900">Ver todos los productos</span>
                </div>
              </div>
            </div>
          </Popover.Panel>
        )}
      </Popover>

      {/* Campo de búsqueda */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full sm:w-auto border border-gray-300 rounded-lg shadow-lg text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>

    {/* Filas de productos */}
    {rows.map((row, index) => (
      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {row.map((product) => (
          <div key={product.id} className="bg-white shadow-lg overflow-hidden relative rounded-lg flex flex-col items-center group">
            <a href={product.link}>
              <img
                src={product.imageLink}
                alt={product.name}
                className="w-full h-60 object-contain mb-4" // Imagen centrada y completa
              />
            </a>
            <div className="flex flex-col items-center p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              {/* Botón de "más" debajo de la imagen con hover */}
              <button
                onClick={() => handleProductClick(product)}  // Acción de abrir mini página
                className="mb-4 p-3 bg-gray-200 text-black rounded-full hover:bg-gray-400 transition-all"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>

  {activeProduct && (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 h-3/4 flex rounded-lg shadow-lg relative">
        <div className="w-1/2 p-6">
          <img
            src={activeProduct.imageLink}
            alt={activeProduct.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-1/2 p-6">
          <h3 className="text-2xl font-semibold mb-4">{activeProduct.name}</h3>
          <p className="text-lg text-black mb-4">{activeProduct.description}</p>
          {/* Opción para agregar más de un producto al carrito */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-900 mb-2">Cantidad:</label>
            <input
              type="number"
              min="1"
              value={quantities[activeProduct.id] || 1}
              onChange={(e) => handleQuantityChange(activeProduct.id, parseInt(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveProduct(null)}
              className="py-2 px-6 bg-gray-200 rounded-md hover:bg-gray-400 transition-all"
            >
              Seguir viendo
            </button>
            <button
              onClick={() => handleAddToCart(activeProduct.id, quantities[activeProduct.id] || 1)}
              className="py-2 px-6 bg-gray-200 text-black rounded-md hover:bg-gray-400 transition-all"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* Botón "X" para cerrar la mini página */}
        <button
          onClick={handleCloseMiniPage}
          className="absolute top-2 right-2 text-3xl font-bold text-black hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  )}
</section>

  );
};

export default Productos;
