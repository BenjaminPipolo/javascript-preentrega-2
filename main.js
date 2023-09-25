const carrito = [];

const productos = [
    {
        id: 1,
        nombre: "Facturas",
        precio: 150,
        cantidad: 0
    },

    {
        id: 2,
        nombre: "Pan",
        precio: 100,
        cantidad: 0
    }, 

    {
        id: 3,
        nombre: "Pastafrola",
        precio: 3500,
        cantidad: 0
    },

    {
        id: 4,
        nombre: "Alfajor de maicena",
        precio: 350,
        cantidad: 0
    },

    {
        id: 5,
        nombre: "Roll de canela",
        precio: 500,
        cantidad: 0
    },

    {
        id: 6,
        nombre: "Sanguche de miga",
        precio: 200,
        cantidad: 0
    },

    {
        id: 7,
        nombre: "Bizcocho",
        precio: 1000,
        cantidad: 0
    }
]

alert("¡Bienvenidos a nuestra panadería en línea! Aquí encontrarás los sabores más irresistibles, horneados con amor y listos para ser entregados directamente a tu puerta. Explora nuestra selección de panes frescos, pasteles tentadores y mucho más. Tu próximo deleite está a solo unos clics de distancia. ¡Gracias por elegirnos para endulzar tus días!")

const comprar = () => {
    const productoBaratos = confirm('¿Querés ordenar del producto más barato al mas caro?');

    if (productoBaratos) {
        ordenarMenorMayor();
    } else {
        ordenarMayorMenor();
    }
}

const ordenarMenorMayor = () => {
    productos.sort((a,b)  => a.precio - b.precio);
    mostrarProductos();
}

const ordenarMayorMenor = () => {
    productos.sort((a,b)  => b.precio - a.precio);
    mostrarProductos();
}

const mostrarProductos = () => {
    const listaProductos = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });

    alert('Lista de precios:'+'\n\n'+listaProductos.join('\n'));
    comprarProductos(listaProductos)
}

const comprarProductos = (listaProductos) => {
    let productoNombre = '';
    let productoCantidad = 0;
    let seguirComprando = false;

    do {
        productoNombre = prompt('¿Qué producto desea comprar?'+'\n\n'+listaProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuantos queres comprar?'));

        const encontrado = productos.some(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (encontrado) {
            const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());
            agregarProductoCarrito(producto, productoCantidad);
        } else {
            alert('El producto no se encontra en el catálogo.')
        }

        seguirComprando = confirm('¿Desea seguir comprando?');
    } while (seguirComprando);

    confirmarCompra();
}

const agregarProductoCarrito = (producto, productoCantidad) => {
    const productoId = producto.id;
    // Validar si el producto ya se encuentra en el carrito
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (!productoRepetido) {
        producto.cantidad += productoCantidad;
        carrito.push(producto);
    } else {
        // Si se encuentra en el carrito, solo modificar su cantidad
        productoRepetido.cantidad += productoCantidad;
    }
    console.log(carrito);
    console.log(productoRepetido);
}

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad;
    });

    const confirmarCompra = confirm('Carrito: '
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nPara continuar presione "Aceptar" o "Cancelar" para eliminar productos del carrito'
    );

    if (confirmarCompra) {
        alert('Su compra ha sido realizada con éxito!')
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:');
        eliminarProductoCarrito(productoAEliminar);
    }
}

const eliminarProductoCarrito = (productoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoAEliminar) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra();
}

comprar();
