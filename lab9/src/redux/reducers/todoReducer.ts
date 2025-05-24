import { Todo, TodoActionTypes } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: Todo[] = [];

const todoReducer = (state = initialState, action: TodoActionTypes): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuidv4(),
          text: action.payload,
          completed: false,
        },
      ];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    
    default:
      return state;
  }
};

export default todoReducer;