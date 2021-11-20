import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useInformState} from './InformProvider'

const BtnBox = ({ pnum, totalPage }) => {
  const history = useHistory();
  const state = useInformState();
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const ck = state.answers.slice(pnum, pnum * 5 + 5).includes('0')
    setCheck(ck)
  }, [state, pnum])

  const makeMessage = (e, tag, message) => {
    e.preventDefault();
    tag.innerHTML= message;
    setTimeout(() => {
      tag.innerHTML="";
    }, 1500)
  }

  const pushAlert = (e) => {
    const tag = document.getElementById('alert-message');
    if(check){
      makeMessage(e, tag, "선택되지 않은 항목이 있습니다 !!");
      return;
    }
    if (Number(pnum)+1 < Number(totalPage / 5)) {
      history.push(`/TestPage/${Number(pnum)+1}`);
    } else {
      history.push('/result')
    }
  }
  
  return (
    <>
      <div id="alert-message"></div>
      <div className="btn-container" key={pnum}>
        <button onClick={(e) => {
          e.preventDefault();
          if(pnum !== "0"){
            history.goBack();
          }
        }} className="btn">이전</button>
        <button onClick={pushAlert} className="btn">다음</button>
      </div>
    </>
  )
}
export default BtnBox;