const Script = () => {
	const formatDate = (isoDate) => {
		// Mengonversi ke objek Date
		const date = new Date(isoDate);

		// Ekstrak bagian-bagian dari tanggal
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Bulan dimulai dari 0, jadi tambahkan 1
		const year = date.getFullYear();

		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");

		// Format baru: DD-MM-YYYY HH:MM:SS
		return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
	};

	return {
		formatDate,
	};
};

export default Script;
