import Header from './Header';
import { useInformState } from './InformProvider'
import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import BtnBox from './BtnBox';
import QuestionBox from './QuestionBox';

const TestPage = () => {
  const state = useInformState();
  const { id } = useParams();
  const history = useHistory();

  function getRatio() {
    const zeroCount = state.answers.reduce((acc, cur) => {
      if(cur !== '0'){
        return acc + 1;
      }
      return acc;
    }, 0) 
    return parseInt(zeroCount / state.answers.length * 100) ;
  }

  const [ratio, setRatio] = useState(
    getRatio()
  )

  useEffect(() => {
    setRatio(() => {
      return getRatio();
    })
  }, [state])
  if(state.answers.length === 0){
    history.push('/')
  }
  return (
    <div className='wrapper'>
      <div className="box-wrapper">
        <Header text="검사진행" progress={ratio}/>
        {state.question.slice(id*3, id*3+3).map((question, idx) => {
          return (
            <QuestionBox q={question} pnum={id} qnum={idx} key={Number(id) * 3 + Number(idx)}/>
          )
        })}
        <BtnBox pnum={id} totalPage={state.question.length}/>
      </div>
    </div>
  )
}

export default TestPage;