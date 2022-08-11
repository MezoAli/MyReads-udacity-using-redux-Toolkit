import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as BooksApi from "../BooksAPI";

export const getBooks = createAsyncThunk("book/getBooks", async () => {
	const allBooks = await BooksApi.getAll();
	return allBooks;
});

const initialState = {
	myReads: [],
	currentlyReading: [],
	wantToRead: [],
	read: [],
};

const BookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		changeShelf(state, action) {
			const { book, shelf } = action.payload;
			BooksApi.update(book, shelf);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBooks.fulfilled, (state, action) => {
			state.myReads = action.payload;
			state.currentlyReading = state.myReads.filter((item) => {
				return item.shelf === "currentlyReading";
			});
			state.wantToRead = state.myReads.filter((item) => {
				return item.shelf === "wantToRead";
			});
			state.read = state.myReads.filter((item) => {
				return item.shelf === "read";
			});
		});
	},
});

export const bookActions = BookSlice.actions;
export const bookReducer = BookSlice.reducer;
