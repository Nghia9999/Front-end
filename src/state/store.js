// store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice"; // Đảm bảo rằng bạn đã import globalReducer từ file globalSlice

const store = configureStore({
  reducer: {
    global: globalReducer,
    // Nếu bạn có các reducer khác, bạn có thể thêm vào đây
  },
});

export default store;
