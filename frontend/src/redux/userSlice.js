import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

  name: "user",
  initialState: {
    userData: null,
  },
 
 
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData);
    },
  },
});


export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
