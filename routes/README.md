DESCRIPTION:
IRONWINE
Ironwine es una web de venta online de vinos, donde podrán acceder a una gran diversidad de vinos de España y del resto del mundo.
Desde el inicio de la página podrás ver el catalogo de vinos de nuestra web y los detalles de cada producto, para poder realizar las compras deberás estar logueado, una vez dentro de la web, además de seguir viendo el catálogo y sus detalles, podrás buscar por nombre de vino y por categoría.  También tendrás acceso a tu perfil de usuario donde podrás añadir productos a tu lista de deseos y ver tu historial de compras, además de carrito desde donde hacer el pago, añadir o quitar cantidad de un producto o vaciar tu carrito de compra.

Modelos:
Modelo usuario: {username, email, password, role, timestamps, wishList, cart}
Modelo producto: {name, description, image, price, tipo, bodega, stock}
Modelo payment: {Price, paymentIntentId, clientSecret, status, product}
Modelo compras: {user, productoId, totalPrice, quantity, timestamps}
Modelo comentario: {user, products, comentario}



METODO	URL	PARAMS	BODY	Success status	Error status	DESCCRIPTION
POST	/auth/signup		Name, email, password	201	400	Registro de usuario
POST	/auth/login		Username, password	200	400	Validacion de credenciales y envio de token
GET	/auth/verify					Verifica si el usuario esta activo
POST	/admin/create		name,description,image,price,tipo,bodega	200	400	Creación de un nuevo producto
PUT	/admin/:id	id	name,description,price,tipo,bodega	200	400	Edita los datos de un producto
DELETE	/admin/:id	Id		200	400	Borra producto

GET	/products       	200	400	Devuelve todos los productos
(nombre,imagen y precio) ( devolver productos lista deseos del usuario)
GET	/products/:id	id		200	400	Devuelve un producto con sus detalles
GET	/cart			20	400	Devuelve todos los productos del carrito
PATCH	/cart/:productId/add	Id		200	400	Añade un producto a la compro del usuario
PATCH	/cart/:productId/pull	Id		200	400	Disminuye la cantidad del producto que en el carrito
PUT	/cart/deleteall			200	400	Vacia el carrito 
GET	/cart/total			200	400	Devuelve la cantidad total de carrito
POST	/comentario/:productId/créate	Id		200	400	Recoge los datos de los comentarios
GET	/comentario/:productId	Id		200	400	Devuelve todos los comentarios
GET	/historial			200	401	Devuelve todos los productos comprados
POST	/hsitorial/add			200	400	Añade las compras del usuario una vez pagadas
POST	/payment/create-payment-intent			200	400	Recibe los datos del formularo de pago del usuario
POST	/upload			200	400	Middleware Cloudinary
GET	/wishlist			200	400	Devuelve todos los productos del la lsita de deseos
GET	/wishlist/in/:productId	id		200	400	devuelve si ese usuario tiene ese producto en su lista de deseos

PATCH	/wishlist/:productId/add	ud		200	400	Añade un producto a la lista de deseos
PATCH	/wishlist/:productId/pull	id		200	400	Quita un producto de la lista de deseos

COLABORADORES
https://github.com/redkouya
https://github.com/Cris15118

PROYECTO
Cliente: https://github.com/Cris15118/ironwine
Servidor: https://github.com/Cris15118/ironwine-server
Deploy: https://ironwine.netlify.app/
TRELLO
https://trello.com/b/JPvO93eJ/planificaci%C3%B3n-proyecto
PRESENTACION


