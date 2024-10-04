const { default: axios } = require("axios");
const { useState } = require("react");

const AddToCart = ({ productid }) => {
	const [quantity, setQuantity] = useState(1);
	const submitHandler = async () => {
		await axios
			.post("/api/add-to-cart", {
				productid: productid,
				quantity: quantity,
			})
			.then((res) => {
				console.log(res.data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const decrementHandler = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const incrementHandler = () => {
		setQuantity(quantity + 1);
	};

	return (
		<>
			<div className="d-flex gap-3 mb-3">
				<button
					type="button"
					className="btn btn-sm btn-danger"
					onClick={decrementHandler}
				>
					-
				</button>
				<input
					type="text"
					inputMode="numeric"
					className="form-control form-control text-center"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<button
					type="button"
					className="btn btn-sm btn-success"
					onClick={incrementHandler}
				>
					+
				</button>
			</div>
			<button
				type="button"
				onClick={submitHandler}
				className="btn btn-primary w-100"
			>
				Tambahkan ke Keranjang
			</button>
		</>
	);
};

export default AddToCart;
