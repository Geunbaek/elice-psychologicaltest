import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
  user: {
    name: "", 
    gender: "",
  },
  question : [

  ],
  answers : [

  ]
}

function reducer(state, action){
  switch (action.type) {
    case "INSERT_QUESTION":
      return {
        ...state,
        question : action.question.RESULT,
        answers : new Array(action.question.RESULT.length).fill('0')
      }
    case "INSERT_USER":
      return {
        ...state,
        user : {
          name: action.name,
          gender: action.gender
        }
      }
    case "ADD_ANSWER":
      const newAnswers = [...state.answers];
      newAnswers[action.qNum] = action.answerScore;
      return {
        ...state,
        answers : newAnswers
      }
    default:
      return state;
  }
}

const StateContext = createContext();
const DispatchContext = createContext();

export function InformProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useInformState(){
  return useContext(StateContext);
}

export function useInformDispatch(){
  return useContext(DispatchContext)
}