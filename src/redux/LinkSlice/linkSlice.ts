import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LinkState {
  id: string;
  url: string;
  shortUrl: string;
}

const initialState: LinkState[] = [];

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLinks: (state, action: PayloadAction<LinkState[]>) => {
      const existingIds = state.map((link) => link.id);
      const newLinks = action.payload.filter(
        (link) => !existingIds.includes(link.id)
      );
      return [...state, ...newLinks];
    },
    deleteLink: (state, action: PayloadAction<string>) => {
      return state.filter((link) => link.id !== action.payload);
    },
  },
});

export const { addLinks, deleteLink } = linkSlice.actions;
export default linkSlice.reducer;
