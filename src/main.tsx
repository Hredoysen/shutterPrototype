import ReactDOM from 'react-dom/client'
import './index.scss'
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./app";
import {Provider} from "react-redux";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);


