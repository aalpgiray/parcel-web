import { Button, Checkbox, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useActions, useStore } from "../../store";

import * as styles from "./todos.css";

const Todos = () => {
  const items = useStore((state) => state.todos.items);

  const { add, complete, unComplete, updateTodo } = useActions(
    (actions) => actions.todos,
  );

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setNewTodo("");
    setNewTodo("");
    setNewTodo("");
    setNewTodo("");
    setNewTodo("");
  }, [items]);

  return (
    <div className={styles.todos}>
      <h2>Todo List </h2>
      <div className={styles.todoList}>
        {items.map((todo, idx) => (
          <div key={idx}>
            <Checkbox
              checked={todo.completed}
              onChange={() =>
                !todo.completed ? complete(idx) : unComplete(idx)
              }
            >
              <span
                className={`${styles.todoItem} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                {todo.name}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
      <Input
        onKeyDown={(e) => (e.keyCode === 13 ? add(newTodo) : null)}
        type="text"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <p />
      <Button
        className={styles.toggleButton}
        type="primary"
        onClick={() => updateTodo({ completed: false, name: newTodo })}
      >
        Add
      </Button>
    </div>
  );
};

export default Todos;
