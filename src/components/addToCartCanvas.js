const { default: axios } = require("axios");
const { useState } = require("react");

const AddToCartCanvas = ({ CartId, Quantity }) => {
	const [quantity, setQuantity] = useState(Quantity);
	const submitHandler = async () => {
		await axios
			.put("/api/update-cart", {
				cartid: CartId,
				quantity: quantity,
			})
			.then((res) => {
				console.log(res.data);
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
			<div className="d-flex flex-column gap-3">
				<div className="d-flex">
					<button
						type="button"
						className="btn btn-sm btn-danger rounded-0"
						onClick={decrementHandler}
					>
						-
					</button>
					<input
						type="text"
						inputMode="numeric"
						className="form-control form-control text-center rounded-0"
						min={1}
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button
						type="button"
						className="btn btn-sm btn-success rounded-0"
						onClick={incrementHandler}
					>
						+
					</button>
				</div>
				<div className="hstack gap-1">
					<button
						type="button"
						onClick={submitHandler}
						className="btn btn-sm btn-primary w-100"
					>
						<i className="fa-solid fa-save"></i>
					</button>
					<div className="vr"></div>
					<button type="button" className="btn btn-sm btn-danger w-100">
						<i className="fa-solid fa-trash"></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default AddToCartCanvas;
