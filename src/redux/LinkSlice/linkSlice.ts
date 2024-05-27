import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : any = [
]

const linkSlice = createSlice ({
    name: "links",
    initialState,
    reducers: { 
        addLink: (state : any, action: PayloadAction <any>) => {
            const { link, shorterURL, id } = action.payload;
            state.push({ link, shorterURL, id});

        },
        deleteLink: (state : any, action: PayloadAction <any>) =>{
            const linkId = action.payload;
            return state.filter((link : any) => link.id !== linkId)
        }

    }
})

export const { addLink, deleteLink } = linkSlice.actions;
export default linkSlice.reducer;