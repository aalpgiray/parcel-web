import { reducer, Reducer } from "easy-peasy";
import { routerReducer } from "./router";
import todos, { TodosModel } from "./todos";

export interface StoreModel {
  todos: TodosModel;

  router: Reducer<any>;
}

const model: StoreModel = {
  todos,
  router: reducer(routerReducer),
};

export default model;
