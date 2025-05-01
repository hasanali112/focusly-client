import { Provider } from "react-redux";

import router from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
