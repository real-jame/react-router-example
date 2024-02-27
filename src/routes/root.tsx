import React from "react";

const Root = () => {
	return (
		<main className="h-screen w-screen m-0 flex">
			<div
				id="sidebar"
				className="w-96 bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-200 transition-shadow hover:shadow-lg hover:shadow-gray-200"
			>
				<div className="flex flex-col size-full shadow-inner shadow-white">
					<h1 className="order-1 flex justify-center py-2 border-t border-gray-400 text-md font-bold">
						React Router Contacts
					</h1>
					<div className="flex justify-center gap-2 pt-4 pb-4 border-b border-gray-400">
						<form id="search-form" role="search">
							<input
								type="search"
								id="q"
								aria-label="Search contacts"
								placeholder="Search for a contact..."
								name="q"
								className="bg-white transition-shadow hover:bg-blue-50 duration-75 px-2 py-1 shadow-inner shadow-gray-300 hover:shadow-gray-500 rounded-md border border-gray-400"
							/>
							<div id="search-spinner" aria-hidden hidden={true}></div>
							<div className="sr-only" aria-live="polite"></div>
						</form>
						<form method="post">
							<button
								type="submit"
								className="accented-button px-2 py-1 shadow-inner shadow-gray-400 rounded-md"
							>
								New
							</button>
						</form>
					</div>
					<nav className="flex-1 overflow-auto pt-4">
						<ul>
							<li className="mx-1">
								<a
									className="flex items-center justify-between overflow-hidden whitespace-pre p-2 gap-4 hover:bg-blue-50 transition-all duration-75 rounded-xl"
									href={"/contacts/1"}
								>
									Your Name
								</a>
							</li>
							<li className="mx-1">
								<a
									className="flex items-center justify-between overflow-hidden whitespace-pre p-2 gap-4 hover:bg-blue-50 transition-all rounded-xl"
									href={"/contacts/2"}
								>
									Your Friend
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div id="detail"></div>
		</main>
	);
};

export default Root;
