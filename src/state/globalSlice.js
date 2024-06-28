// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mode: "light",
//   userId: "63701cc1f03239b7f700000e",
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//   },
// });

// export const { setMode } = globalSlice.actions;

// export default globalSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      
               state.mode = state.mode === "light" ? "dark" : "light";
             },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setMode, setUser, clearUser } = globalSlice.actions;

export default globalSlice.reducer;

