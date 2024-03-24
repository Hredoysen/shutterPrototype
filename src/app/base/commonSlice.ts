import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {themeConfig} from "../configs/theme.config.ts";

interface MobileMenuInterfase {
    isMobileMenuDrawerClose: boolean;
    isMobileNotificationClose: boolean;
    isMobileProfileClose: boolean;
    isMobileHomeClose: boolean;
}

interface InitialStateInterfase {
    currentRouteKey: string;
    isMenuOpen: boolean;
    isAdmin: boolean;
    language: string;
    mobileMenu: MobileMenuInterfase;
    popupShown?: boolean;
    loaderShown?: boolean;
    adminSubMenu?: string;
    adminImportantContact?: string;
    adminFileSelect?: {
        selectedCategory?: string | null;
        selectedSubCategory?: string | null;
    };
}

export const initialState: InitialStateInterfase = {
    currentRouteKey: '',
    isMenuOpen: false,
    mobileMenu: {
        isMobileMenuDrawerClose: false,
        isMobileNotificationClose: false,
        isMobileProfileClose: false,
        isMobileHomeClose: false,
    },
    isAdmin: false,
    popupShown: true,
    loaderShown: true,
    language: themeConfig.language,
    adminSubMenu: '',
    adminImportantContact: undefined,
    adminFileSelect: {
        selectedCategory: null,
        selectedSubCategory: null,
    },
};

export const commonSlice = createSlice({
    name: 'base/common',
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action) => {
            const {open, id} = action.payload;
            state.currentRouteKey = id;
            state.isMenuOpen = open;
        },
        setMobileMenuDrawerClose: (state, action) => {
            const {menuKey, isDrawerOpen} = action.payload;

            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.mobileMenu) {
                if (key === menuKey) {
                    state.mobileMenu[key as keyof MobileMenuInterfase] = isDrawerOpen;
                } else {
                    state.mobileMenu[key as keyof MobileMenuInterfase] = false;
                }
            }
        },

        setAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;
        },
        setPopupShow: (state, action) => {
            state.popupShown = action.payload;
        },
        setLoaderShow: (state, action) => {
            state.loaderShown = action.payload;
        },
        setAdminSubMenu: (state, action) => {
            state.adminSubMenu = action.payload;
        },
        setAdminImportantContact: (state, action) => {
            state.adminImportantContact = action.payload;
        },
        setAdminFileSelect: (state, action) => {
            const {type, value} = action.payload;
            if (type === 'category') state.adminFileSelect!.selectedCategory = value;
            if (type === 'subcategory')
                state.adminFileSelect!.selectedSubCategory = value;
        },
    },
});

export const {
    setCurrentRouteKey,
    setMobileMenuDrawerClose,
    setAdmin,
    changeLanguage,
    setPopupShow,
    setLoaderShow,
    setAdminSubMenu,
    setAdminImportantContact,
    setAdminFileSelect,
} = commonSlice.actions;

export const commonState = (state: RootState) => state.base.common;

export default commonSlice.reducer;
