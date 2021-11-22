import Header from './Header';
import { useInformState } from './InformProvider'
import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import BtnBox from './BtnBox';
import QuestionBox from './QuestionBox';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const TestPage = () => {
  const state = useInformState();
  const { id } = useParams();
  const [ratio, setRatio] = useState(
    getRatio()
  )
  const [loading, setLoading] = useState(true);

  function getRatio() {
    const zeroCount = state.answers.reduce((acc, cur) => {
      return cur !== '0' ? acc + 1 : acc ;
    }, 0) 
    return parseInt(zeroCount / state.answers.length * 100) ;
  }

  function barMove(prev, cur) {
    const now = document.getElementById('now-bar');
    let width = parseInt(prev);
    const oper = setInterval(move, 20);
    function move(){
      if(width >= cur){
        clearInterval(oper);
      } else {
        width++;
        now.style.width = width + '%';
      }
    }
  }
  
  useEffect(() => {
    const prevRatio = parseInt(ratio)
    setRatio(() => {
      return getRatio();
    })
    barMove(prevRatio, getRatio())
    if(loading){
      setLoading(false)
    }
  }, [state])

  if(loading) return <LoadingPage />
  else if(state.answers.length === 0) return <ErrorPage />
  return (
    <div className='wrapper'>
      <div className="box-wrapper">
        <Header text="검사진행" progress={ratio}/>
        {state.question.slice(id*5, id*5+5).map((question, idx) => {
          const qCount = 5;
          return (
            <QuestionBox q={question} qIndex={id * qCount + idx} key={Number(id) * 5 + Number(idx)}/>
          )
        })}
        <BtnBox pnum={id} totalPage={state.question.length}/>
      </div>
    </div>
  )
}

export default TestPage;