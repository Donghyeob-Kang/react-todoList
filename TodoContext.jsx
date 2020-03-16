import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  { id: 1, text: 'project1', done: false },
  // { id: 2, text: 'project2', done: false },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      // console.log('----------Reducer State----------');
      // console.log(state);
      return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// dispatch만 필요한 component에서 불필요한 렌더링을 방지하기 위해 둘을 나눠서 사용
// createContext 시 Provider를 찾게 됨
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({ children }) => {
  // dispatch가 todoReducer에 있는 action을 실행
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(1);

  return (
    // Context에서 사용할 값을 지정할 때에는 Provider component를 렌더링하고 value를 넘겨주면 됨
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

// 굳이 context에 대한 에러처리를 해줄필요는 없으나 에러 발생시 빠르게 해결가능
export const useTodoState = () => {
  // useContext를 사용하여 TodoStateContext의 data를 가져옴
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};

export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};
