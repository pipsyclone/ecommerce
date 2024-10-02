"use client";
import { useEffect } from "react";
import Topbar from "@/components/topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

// export const metadata = {
// 	title: "Selamat Datang di Tokoku",
// 	description:
// 		"Tokoku menyediakan beberapa pakaian untuk merubah penampilan anda!",
// };

export default function Layout({ children }) {
	useEffect(() => {
		require("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);
	return (
		<html>
			<body>
				<Topbar />
				{children}
			</body>
		</html>
	);
}
