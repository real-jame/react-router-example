import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";

// This is the "root route", since the rest of routes will render inside of it.
// It will serve as the UI's root layout, and nested layouts will go in.
const router = createBrowserRouter([{ path: "/", element: <Root /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
