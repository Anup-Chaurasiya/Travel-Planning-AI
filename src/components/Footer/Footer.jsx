export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<div className="container p-2 mt-16">
				<p className="text-center text-xs md:text-sm lg:text-base">
					&copy; {currentYear} TravelMate
				</p>
			</div>
		</>
	);
}
