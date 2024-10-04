"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AddToCart from "@/components/addToCart";
import ProductControllers from "@/controllers/productControllers";
import { FormatRupiah } from "@arismun/format-rupiah";

export default function Detail() {
	const params = useParams();
	const { data, getProduct } = ProductControllers();

	useEffect(() => {
		getProduct(params.productid);
	}, []);

	return (
		<div className="card card-body w-25 mx-auto">
			<h3>{data.name}</h3>
			<p>
				<FormatRupiah value={data.price} />
			</p>

			<AddToCart productid={data.productid} />
		</div>
	);
}
