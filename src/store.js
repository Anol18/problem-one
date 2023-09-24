import { configureStore } from "@reduxjs/toolkit";
import modalCOpen from "./features/modalC.slice";
const store = configureStore({
  reducer: {
    modalCOpen: modalCOpen,
  },
});
// setupListeners(store.dispatch);
export default store;
