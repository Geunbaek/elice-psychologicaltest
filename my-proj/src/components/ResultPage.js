import React, {useEffect, useState} from 'react';
import { useInformState} from './InformProvider'
import { Link } from "react-router-dom";
import ErrorPage from './ErrorPage';
import axios from 'axios';

const ResultPage = () => {
  const state = useInformState();
  // const dispatch = useInformDispatch();
  const [result, setResult] = useState('');
  const [resultUrl, setResultUrl] = useState("")

  useEffect(() => {
    if(!result){
      (function(){
        const newResult = state.answers.reduce((acc, cur, idx) => {
          return acc + `B${idx+1}=${cur} `;
        }, '')
        setResult(newResult);
      })();
      return;
    } else {
      try {
        (async function() {
          const api_key = "b0562214ab9dda5498cef44a98118045"
          const date = new Date();
          const param = {
            "apikey": api_key,
            "qestrnSeq": "6",
            "trgetSe": "100209",
            "name": state.user.name,
            "gender": state.user.gender === "man" ? "100323" : "100324",
            "startDtm": date.getTime(),
            "answers": result,
          }
          const url = `http://www.career.go.kr/inspct/openapi/test/report?apikey=${api_key}&qestrnSeq=6`
          const res = await axios.post(url,param, {headers: {
            "Content-Type": "application/json"
          }})
          setResultUrl(res.data.RESULT.url)
        })();
      } catch(e){
        return;
      }
    }
  }, [result])

  return (
    <>
      {(state.answers.length === 0 || state.answers.includes('0')) 
      ? <ErrorPage/>
      : <><div>결과 페이지</div>
        <a href={resultUrl} target="_blank" rel="noopener noreferrer">결과</a>
        <Link to="/">처음으로</Link></>}
    </>
  )
}
export default ResultPage