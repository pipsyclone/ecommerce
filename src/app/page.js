"use client";
import ProductControllers from "@/controllers/productControllers";
import { useEffect } from "react";

export default function Home() {
	const { data, getProducts } = ProductControllers();

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="container d-flex gap-3">
			{data.map((data, key) => {
				return (
					<div className="card card-body" key={1}>
						<h3>{data.name}</h3>
						<h5>Rp. {data.price}</h5>

						<a
							href={"/product/" + data.productid}
							className="btn btn-sm btn-primary mt-3"
						>
							Lihat Detail
						</a>
					</div>
				);
			})}
		</div>
	);
}
