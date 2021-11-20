import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
  user: {
    name: "", 
    gender: "",
  },
  questionInfo : {
    1: "능력발휘",
    2: "자율성",
    3: "보수",
    4: "안정성",
    5: "사회적 인정",
    6: "사회봉사",
    7: "자기계발",
    8: "창의성"
  },
  question : [

  ],
  answers : [

  ],
  score : [

  ],
  fin: {
    most : [],
    worst : []
  }
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
    case "ADD_RESULT":
      return {
        ...state,
        score: action.scores,
        fin : {
          most : action.sortedScores.slice(-2),
          worst: action.sortedScores.slice(0, 2)
        }
      }
    case "RESET":
      return {
        ...initialState
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