"use client";
import TransactionControllers from "@/controllers/TransactionControllers";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useEffect, useState } from "react";
import Script from "@/globals/scripts";

export default function Orders() {
	const { formatDate } = Script();
	const { data, getTransactions } = TransactionControllers();

	useEffect(() => {
		getTransactions();
		console.log(data);
	}, []);

	return (
		<div className="container mx-auto">
			<div className="row row-cols-auto text-center gap-3">
				{data.map((data, key) => {
					return (
						<div className="card card-body col" key={key}>
							<div
								className="vstack gap-3"
								style={{
									maxHeight: "145px",
									overflow: "auto",
									scrollbarWidth: "2px",
								}}
							>
								{data.DetailTransactions.map((product, key) => {
									return (
										<div
											className="d-flex justify-content-between bg-light p-2"
											key={key}
										>
											<div>
												<div>{product.products.name}</div>
												<div>x{product.quantity}</div>
											</div>
											<p className="align-items-center">
												<FormatRupiah
													value={product.quantity * product.products.price}
												/>
											</p>
										</div>
									);
								})}
							</div>
							<div className="hstack justify-content-end bg-light p-2 fw-bold mb-3 mt-3">
								<FormatRupiah value={data.totalprice} />
							</div>
							<div className="d-flex gap-3 mt-3">
								<span
									className={
										data.status === "Pesanan Selesai"
											? "badge text-bg-success flex-grow-1"
											: data.status === "Pesanan Dikirim"
											? "badge text-bg-info flex-grow-1"
											: data.status === "Menunggu Konfirmasi"
											? "badge text-bg-warning flex-grow-1"
											: "badge text-bg-danger flex-grow-1"
									}
								>
									{data.status}
								</span>
								<span className="badge text-bg-success flex-grow-1">
									<span>Expiry Date : </span>
									{formatDate(data.expirydate)}
								</span>
							</div>
							<br />
							<a
								href={data.paymentlink}
								type="button"
								className="btn btn-primary"
							>
								Bayar
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
