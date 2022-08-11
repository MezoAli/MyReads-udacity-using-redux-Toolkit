import "./App.css";
import BooksList from "./components/BooksList";
import SearchPage from "./components/SearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<BooksList />} />
			<Route path="/search" element={<SearchPage />} />
		</Routes>
	);
}

export default App;
