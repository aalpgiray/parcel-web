import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./model";
import { routerMiddleware } from "./model/router";

const { useActions, useStore, useDispatch } = createTypedHooks<StoreModel>();

export { useActions, useDispatch, useStore };

const store = createStore(model, {
  middleware: [routerMiddleware],
});

export { store };
