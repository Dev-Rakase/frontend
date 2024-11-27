import { RouterProvider } from "react-router-dom";
import { routes } from "./config/routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <ToastContainer position="top-right" />
      </PersistGate>
    </Provider>

  )
}

export default App
