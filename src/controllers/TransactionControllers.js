import axios from "axios";
import { useState } from "react";

const TransactionControllers = () => {
	const [data, setData] = useState([]);

	const getTransactions = async () => {
		await axios
			.get("/api/get-transactions")
			.then((res) => {
				setData(res.data.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return {
		data,
		getTransactions,
	};
};

export default TransactionControllers;
