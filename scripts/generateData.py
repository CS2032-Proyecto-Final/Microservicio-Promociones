# Actualizar la función para generar nombres sin modelo
def generar_nombre_producto_sin_modelo(indice):
    categorias = [
        'Smartphone', 'Laptop', 'Tablet', 'Auriculares', 'Cámara', 'Smartwatch', 'Consola', 'Televisor', 'Altavoz', 'Monitor',
        'Camisa', 'Pantalón', 'Zapatos', 'Vestido', 'Abrigo', # Categoría ropa
        'Pizza', 'Hamburguesa', 'Sushi', 'Ensalada', 'Tacos' # Categoría comida
    ]
    marcas = [
        'Apple', 'Samsung', 'Sony', 'Microsoft', 'Xiaomi', 'LG', 'HP', 'Dell', 'Lenovo', 'GoPro',
        'Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', # Marcas de ropa
        'Domino\'s', 'McDonald\'s', 'Sushi Roll', 'Subway', 'Taco Bell' # Marcas de comida
    ]
    return f"{marcas[indice % len(marcas)]} {categorias[indice % len(categorias)]}"

# Generar 100 productos y promociones sin modelo en el nombre
productos = []
promociones = []
for i in range(1, 101):
    nombre_producto = generar_nombre_producto_sin_modelo(i)
    precio_producto = generar_precio_producto(nombre_producto)
    tienda_id = random.randint(10001, 10021)  # Generar un tienda_id aleatorio entre 10001 y 10021

    # Crear el producto
    producto = {
        'id': i,
        'tienda_id': tienda_id,
        'nombre': nombre_producto,
        'precio': precio_producto
    }
    productos.append(producto)

    # Crear la promoción para el producto
    descuento = random.randint(10, 40)  # Descuento entre 10% y 40%
    dia_inicio = datetime.now()
    dia_final = dia_inicio + timedelta(days=random.randint(1, 30))  # Duración aleatoria entre 1 y 30 días

    promocion = {
        'id': i,
        'producto_id': i,
        'descuento': descuento,
        'dia_inicio': dia_inicio.strftime('%Y-%m-%d'),
        'dia_final': dia_final.strftime('%Y-%m-%d')
    }
    promociones.append(promocion)

# Guardar los productos y promociones en archivos JSON
productos_file = '/mnt/data/productos_sin_modelo.json'
promociones_file = '/mnt/data/promociones_sin_modelo.json'

with open(productos_file, 'w') as f:
    json.dump(productos, f, indent=4)

with open(promociones_file, 'w') as f:
    json.dump(promociones, f, indent=4)

productos_file, promociones_file
