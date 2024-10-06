import axios from "axios";
import { useState } from "react";

const CartControllers = () => {
	const [data, setData] = useState([]);

	const getCarts = async () => {
		await axios
			.get("/api/get-carts")
			.then((res) => {
				if (res.data.status === 200) {
					setData(res.data.data);
				}

				console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return {
		data,
		setData,
		getCarts,
	};
};

export default CartControllers;
