import {createSlice} from '@reduxjs/toolkit';
import {themeConfig} from "../configs/theme.config.ts";
import {RootState} from '..';


interface InitialStateInterfase {
    mode: string;
    panelExpand: boolean;
}

const initialState: InitialStateInterfase = {
    mode: themeConfig.mode,
    panelExpand: themeConfig.panelExpand,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setPanelExpand: (state, action) => {
            state.panelExpand = action.payload;
        },
    },
});

export const themeStyle = (state: RootState) => {
    return state?.theme;
};

export const {setMode, setPanelExpand} = themeSlice.actions;
export default themeSlice.reducer;
