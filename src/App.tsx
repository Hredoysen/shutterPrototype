import './App.scss'
import {ConfigProvider, theme} from "antd";
import {themeStyle} from './app/theme/themeSlice.ts';
import {Provider, useSelector} from 'react-redux';
import Layout from "./components/layout/Layout.tsx";
import {store} from "./app/reducer/userReducer.ts";

function App() {
    const myTheme = useSelector(themeStyle);
    const mode = myTheme.mode === 'light';

    return (
        <>
            <Provider store={store}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: mode ? '#1A47E0' : '#ddd',
                            fontFamily: 'Helvetica-Neue, Arial, Helvetica, sans-serif',
                        },
                        algorithm: mode ? theme.defaultAlgorithm : theme.darkAlgorithm,
                    }}
                >
                    <Layout/>
                </ConfigProvider>
            </Provider>
        </>
    )
}

export default App
