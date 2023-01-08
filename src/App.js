import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "headset gamer redragon",
		rating: 4.3,
		description:
			"headset gamer redragon zeus usb preto rgb - h510-rgb.",
		price: 199,
		image: require("./assets/images/fone1.jpeg"),
	},
	{
		id: 2,
		name: "headset gamer redragon",
		rating: 4.2,
		description:
			"headset gamer redragon lamia 2, rgb, 7.1 som surrond, drivers 40mm, branco - h320w-rgb.",
		price: 229,
		image: require("./assets/images/fone2.jpeg"),
	},
	{
		id: 3,
		name: "mouse gamer redragon ",
		rating: 3.2,
		description:
			"mouse gamer redragon cobra, chroma rgb, 12400dpi, 7 botões, preto - m711 v2.",
		price: 99,
		image: require("./assets/images/mouse1.jpeg"),
	},
	{
		id: 4,
		name: "mouse gamer redragon",
		rating: 4.8,
		description:
			"mouse gamer redragon cobra, rgb, 7 botões, 10000dpi, lunar white - m711w.",
		price: 119,
		image: require("./assets/images/mouse2.jpg"),
	},
	{
		id: 5,
		name: "teclado mecânico gamer",
		rating: 4.5,
		description:
			"teclado mecânico gamer redragon kumara, rgb, switch outemu brown, pt - k552rgb-1 (pt-brown)",
		price: 85,
		image: require("./assets/images/Teclado1.jpg"),
	},
	{
		id: 6,
		name: "teclado mecânico gamer",
		rating: 3.8,
		description:
			"teclado mecânico gamer compacto redragon fizz lunar white rgb k617-rgb-w.",
		price: 149,
		image: require("./assets/images/Teclado2.jpg"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<a className="logo">FIRE-<span className="logo-span">CART</span> </a>
				
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Produtos
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button className="btn">
									Detalhes
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Adiconar ao Carrinho
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
