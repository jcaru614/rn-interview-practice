import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todo) => {
    setTodoList((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo, index) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodoContext);
};
