import { useEffect } from "react";
import { Link } from "react-router-dom";
// import * as BooksApi from "../BooksAPI";
import Shelf from "./Shelf";
import { getBooks } from "../redux/BookSlice";
import { useDispatch, useSelector } from "react-redux";

function BooksList() {
	// const [books, setBooks] = useState([]);

	// const allBooks = useSelector((state) => state.book.myReads);
	const currentlyReading = useSelector((state) => state.book.currentlyReading);
	const wantToRead = useSelector((state) => state.book.wantToRead);
	const read = useSelector((state) => state.book.read);

	const dispatch = useDispatch();
	// const currentlyReading = books.filter((item) => {
	// 	return item.shelf === "currentlyReading";
	// });
	// const wantToRead = books.filter((item) => {
	// 	return item.shelf === "wantToRead";
	// });
	// const read = books.filter((item) => {
	// 	return item.shelf === "read";
	// });

	// const getAllBooks = async () => {
	// 	const allBooks = await BooksApi.getAll();
	// 	setBooks(allBooks);
	// };

	useEffect(() => {
		// getAllBooks();
		dispatch(getBooks());
	}, [dispatch, currentlyReading, wantToRead, read]);
	return (
		<div className="app">
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<Shelf title="Currently Reading" books={currentlyReading} />
					<Shelf title="Want to Read" books={wantToRead} />
					<Shelf title="Read" books={read} />
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		</div>
	);
}

export default BooksList;
