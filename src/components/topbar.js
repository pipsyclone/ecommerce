import CartCanvas from "./cartCanvas";

const Topbar = ({ Data }) => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
				<div className="container">
					<a href="/" className="navbar-brand">
						Tokoku
					</a>

					<ul className="navbar-nav">
						<li className="nav-item">
							<a href="/orders" className="nav-link">
								Order List
							</a>
						</li>
						<li className="nav-item">
							<a
								href="#"
								className="nav-link"
								data-bs-toggle="offcanvas"
								data-bs-target="#cart"
							>
								Keranjang
							</a>
						</li>
					</ul>
				</div>
			</nav>

			{/* Cart Offcanvas */}
			<div
				className="offcanvas offcanvas-end"
				tabIndex="-1"
				id="cart"
				aria-labelledby="offcanvasRightLabel"
			>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasRightLabel">
						Keranjang
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body p-0 position-relative">
					<CartCanvas CartItems={Data} />
				</div>
			</div>
		</>
	);
};

export default Topbar;
