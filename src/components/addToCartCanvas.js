"use client";
const { default: axios } = require("axios");
const { useState } = require("react");

const AddToCartCanvas = ({ CartId, Quantity, onQuantityChange }) => {
	const [quantity, setQuantity] = useState(Quantity);
	const updateQuantity = async (newQuantity) => {
		await axios
			.put("/api/update-cart", {
				cartid: CartId,
				quantity: newQuantity,
			})
			.then((res) => {
				// setQuantity(res.data.quantity);
				onQuantityChange(CartId, res.data.data.quantity);
				// console.log(res);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const decrementHandler = () => {
		if (quantity > 1) {
			const newQty = quantity - 1;
			setQuantity(newQty);
			updateQuantity(newQty);
		}
	};

	const incrementHandler = () => {
		const newQty = quantity + 1;
		setQuantity(newQty);
		updateQuantity(newQty);
	};

	return (
		<>
			<div className="d-flex flex-column gap-3">
				<div className="hstack gap-3">
					<button
						type="button"
						className="btn btn-sm btn-danger rounded-0"
						onClick={decrementHandler}
					>
						<i className="fa-solid fa-minus"></i>
					</button>
					<p className="align-items-center">{quantity}</p>
					<button
						type="button"
						className="btn btn-sm btn-success rounded-0"
						onClick={incrementHandler}
					>
						<i className="fa-solid fa-plus"></i>
					</button>
				</div>
				<div className="hstack gap-1">
					{/* <button
						type="button"
						onClick={submitHandler}
						className="btn btn-sm btn-primary w-100"
					>
						<i className="fa-solid fa-save"></i>
					</button>
					<div className="vr"></div> */}
					<button type="button" className="btn btn-sm btn-danger w-100">
						<i className="fa-solid fa-trash"></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default AddToCartCanvas;
