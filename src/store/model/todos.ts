import { Action, action } from "easy-peasy";

export interface Todo {
  name: string;
  completed: boolean;
}

export interface TodosModel {
  items: Todo[];
  add: Action<TodosModel, string>;
  updateTodo: Action<TodosModel, Todo>;
  complete: Action<TodosModel, number>;
  unComplete: Action<TodosModel, number>;
}

const todos: TodosModel = {
  items: [],
  add: action((state, name) => {
    state.items.push({
      completed: false,
      name,
    });
  }),
  updateTodo: action((state, todo) => {
    const todoItem = state.items.find((t) => t.name === todo.name);
    if (todoItem) {
      todoItem.completed = false;
    }
  }),
  unComplete: action((state, index) => {
    state.items[index].completed = false;
  }),
  complete: action((state, index) => {
    state.items[index].completed = true;
  }),
};

export default todos;
