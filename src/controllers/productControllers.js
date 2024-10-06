import axios from "axios";
import { useState } from "react";

const ProductControllers = () => {
	const [data, setData] = useState([]);

	const getProducts = async () => {
		await axios
			.get("/api/get-products")
			.then((res) => {
				if (res.data.status === 200) {
					setData(res.data.data);
				}

				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const getProduct = async (productid) => {
		await axios
			.get("/api/get-product-detail?productid=" + productid)
			.then((res) => {
				if (res.data.status === 200) {
					setData(res.data.data);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return { data, setData, getProducts, getProduct };
};

export default ProductControllers;
