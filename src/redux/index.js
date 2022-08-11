import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./BookSlice";

const store = configureStore({
	reducer: {
		book: bookReducer,
	},
});

export default store;
