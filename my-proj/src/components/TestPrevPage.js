import React, {useEffect, useState} from 'react';
import Header from './Header';
import { useHistory } from "react-router-dom";
import { useInformState, useInformDispatch } from './InformProvider'
import ErrorPage from './ErrorPage';
import axios from 'axios';

const TestPrevPage = () => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  const [testCheck, setTestCheck] = useState(true);

  useEffect(() => {
    try{
      (async function(){
        const apikey = 'b0562214ab9dda5498cef44a98118045'
        const url = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=${apikey}&q=6`
        const res = await axios.get(url)
        dispatch({
          type: "INSERT_QUESTION",
          question : res.data
        })
      })();
    } catch {
      return;
    }
  }, [dispatch]) 

  const history = useHistory();

  const handleClick= () => {
    history.push("/testPage/0")
  }

  return (
    <div className="wrapper">
      { (!state.user.name || !state.user.gender)
      ? <ErrorPage/>
      : <div className="box-wrapper">
          <Header text="검사예시" progress={0}/>
          <div className="text-wrapper">
            <div>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</div>
            <div>가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</div>
          </div>
          <div className="prev-questions-wrapper">
            <div className="test-text">두개 가치 중에 자신에게 더 중요한 가치를 선택하세요</div>
            <div className="btn-container">
              <label>
                <input type="radio" name='test' onClick={() => {
                  setTestCheck(false)
                }}/>능력발휘
              </label>
              <label>
                <input type="radio" name='test' onClick={() => {
                  setTestCheck(false)
                }}/>자율성
              </label>
            </div>
          </div>
          <button onClick={handleClick} disabled={testCheck} className="start-btn">검사시작</button>
        </div>}
    </div>
  )
}

export default TestPrevPage;