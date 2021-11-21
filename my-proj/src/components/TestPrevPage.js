import React, {useEffect, useState} from 'react';
import Header from './Header';
import { useHistory } from "react-router-dom";
import { useInformState, useInformDispatch } from './InformProvider'
import ErrorPage from './ErrorPage';
import axios from 'axios';
import { apiKey } from '../data/data';

const TestPrevPage = () => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  const [testCheck, setTestCheck] = useState(true);
  const history = useHistory();

  useEffect(() => {
    try{
      (async function(){
        const url = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=${apiKey}&q=6`
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

  const makeMessage = (e, tag, message) => {
    e.preventDefault();
    tag.innerHTML= message;
    setTimeout(() => {
      tag.innerHTML="";
    }, 1500)
  }

  const pushAlert = (e) => {
    const tag = document.getElementById('alert-message');
    if(testCheck) {
      makeMessage(e, tag, "위의 항목을 선택해주세요!")
    } else{
      history.push("/testPage/0")
    }
  }

  return (
    <div className="wrapper">
      { (!state.user.name || !state.user.gender)
      ? <ErrorPage/>
      : <div className="box-wrapper">
          <Header text="검사예시" progress={0}/>
          <div className="text-wrapper">
            <div className='text-q'>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</div>
            <div className='text-q'>가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</div>
          </div>
          <div className="prev-questions-wrapper">
            <div className="test-text">두개 가치 중에 자신에게 더 중요한 가치를 선택하세요</div>
            <div className="radios-container">
              <label id='radio-wrapper'>
                <input type="radio" name='test' onClick={() => {
                  setTestCheck(false)
                }}/>능력발휘
              </label>
              <label id='radio-wrapper'>
                <input type="radio" name='test' onClick={() => {
                  setTestCheck(false)
                }}/>자율성
              </label>
            </div>
          </div>
          <div id="alert-message"></div>
          <div className='btn-container'>
            <button onClick={pushAlert} className="btn">검사시작</button>
          </div>
        </div>}
    </div>
  )
}

export default TestPrevPage;