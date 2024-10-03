"use client";
import { useState, useEffect } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import AddToCartCanvas from "./addToCartCanvas";

const CartCanvas = ({ CartItems }) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const calculateTotalPrice = (items) => {
		const total = items.reduce((sum, item) => {
			return sum + item.products.price * item.quantity;
		}, 0);
		setTotalPrice(total); // Update total harga
	};

	// Fungsi untuk update cart item di frontend setelah quantity berubah
	const handleQuantityChange = (cartId, newQuantity) => {
		const updatedItems = CartItems.map((item) => {
			if (item.cartid === cartId) {
				return { ...item, quantity: newQuantity }; // Update quantity untuk item tertentu
			}
			return item;
		});
		calculateTotalPrice(updatedItems); // Hitung ulang total harga
	};

	useEffect(() => {
		calculateTotalPrice(CartItems);
	}, [CartItems]);

	return (
		<>
			<div className="vstack gap-1">
				{CartItems.map((data, key) => {
					return (
						<div key={key}>
							<div className="d-flex space-between bg-tertiary p-3">
								<div className="flex-grow-1">
									<h5>{data.products.name}</h5>
									<p>
										<FormatRupiah value={data.products.price} />
									</p>
								</div>
								<div className="w-25">
									<AddToCartCanvas
										CartId={data.cartid}
										ProductId={data.productid}
										Quantity={data.quantity}
										onQuantityChange={handleQuantityChange}
									/>
								</div>
							</div>
							<hr />
						</div>
					);
				})}
			</div>

			<div className="bg-light p-3 position-absolute bottom-0 start-50 translate-middle-x w-100">
				<div className="d-flex justify-content-between">
					<div className="flex-grow-1">
						Total Harga : <br />
						<FormatRupiah value={totalPrice} />
					</div>
					<div className="align-self-center">
						<button type="button" className="btn btn-primary">
							Checkout
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartCanvas;
