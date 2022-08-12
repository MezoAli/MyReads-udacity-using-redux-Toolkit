import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../BooksAPI";
import { bookActions } from "../redux/BookSlice";
import { useDispatch, useSelector } from "react-redux";

function SearchPage() {
	const [search, setSearch] = useState("");
	const [books, setBooks] = useState([]);
	const [value, setValue] = useState("none");
	const shlvesBooks = useSelector((state) => state.book.myReads);
	const dispatch = useDispatch();

	const getBooks = async () => {
		try {
			if (search) {
				const res = await BooksApi.search(search);
				setBooks(res);
			}
			if (search.trim() === "") {
				setBooks([]);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		getBooks();
	}, [search]);

	const handleChange = (e, book) => {
		const shelf = e.target.value;
		dispatch(bookActions.changeShelf({ book: book, shelf: shelf }));
		setValue(e.target.value);
	};

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" className="close-search">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="search-books-results">
				{console.log(books)}
				<ol className="books-grid">
					{books.length >= 1 &&
						search &&
						books.map((book) => {
							const findBook = shlvesBooks.find((item) => {
								return item.id === book.id;
							});
							if (findBook) {
								book.shelf = findBook.shelf;
							}
							return (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div
												className="book-cover"
												style={{
													width: 128,
													height: 193,
													backgroundImage: `url("${book?.imageLinks?.thumbnail}")`,
												}}
											></div>
											<div className="book-shelf-changer">
												<select
													value={book.shelf ? book.shelf : value}
													onChange={(e) => handleChange(e, book)}
												>
													<option disabled>Move to...</option>
													<option value="currentlyReading">
														Currently Reading
													</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>
										<div className="book-title">{book?.title}</div>
										<div className="book-authors">{book?.authors}</div>
									</div>
								</li>
							);
						})}
				</ol>
			</div>
		</div>
	);
}

export default SearchPage;
