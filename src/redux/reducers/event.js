const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  event: null,
};

const event = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const {setEvent} = event.actions;
export default event.reducer;
