import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
  user: {
    name: "", 
    gender: "",
    now: "",
  },
  fin: {
    most : [{}, {}],
    worst : [{}, {}],
    jobs: {},
    majors: {}
  },
  question : [

  ],
  answers : [

  ],
  score : [

  ],
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
      let date = new Date();
      return {
        ...state,
        user : {
          name: action.name,
          gender: action.gender,
          now: date.toLocaleDateString(),
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
          worst: action.sortedScores.slice(0, 2),
          jobs: {...state.fin.jobs},
          majors: {...state.fin.majors}
        }
      }
    case "ADD_JOB_MAJOR":
      return {
        ...state,
        fin : {
          most : [...state.fin.most],
          worst: [...state.fin.worst],
          jobs: action.jobs,
          majors: action.majors
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