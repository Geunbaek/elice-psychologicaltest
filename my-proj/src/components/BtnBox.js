import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useInformState} from './InformProvider'

const BtnBox = ({ pnum, totalPage }) => {
  const history = useHistory();
  const state = useInformState();
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const ck = state.answers.slice(pnum, pnum * 3 + 3).includes('0')
    setCheck(ck)
  }, [state, pnum])
  
  return (
    <>
      <div className="btn-container" key={pnum}>
        <button onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }} className="btn">이전</button>
        <button onClick={(e) => {
          e.preventDefault();
          if (Number(pnum)+1 < Number(totalPage / 3)) {
            history.push(`/TestPage/${Number(pnum)+1}`);
          } else {
            history.push('/result')
          }
        }} disabled={check} className="btn">다음</button>
      </div>
    </>
  )
}

export default BtnBox;