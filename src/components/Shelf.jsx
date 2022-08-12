// import * as BooksApi from "../BooksAPI";
import { bookActions } from "../redux/BookSlice";
import { useDispatch } from "react-redux";

function Shelf({ title, books }) {
	const dispatch = useDispatch();
	const handleChange = (e, book) => {
		const shelf = e.target.value;
		dispatch(bookActions.changeShelf({ book: book, shelf: shelf }));
	};
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map((book) => {
						return (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div
											className="book-cover"
											style={{
												width: 128,
												height: 193,
												backgroundImage: `url("${book.imageLinks.thumbnail}")`,
											}}
										></div>
										<div className="book-shelf-changer">
											<select
												value={book.shelf}
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
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.authors}</div>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}

export default Shelf;
