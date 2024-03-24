import './App.scss'
import {ConfigProvider, theme} from "antd";
import {themeStyle} from './app/theme/themeSlice.ts';
import {useSelector} from 'react-redux';
import Layout from "./components/layout/Layout.tsx";

function App() {
    const myTheme = useSelector(themeStyle);
    const mode = myTheme.mode === 'light';

    return (
        <>
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
        </>
    )
}

export default App
