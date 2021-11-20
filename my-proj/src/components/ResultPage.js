import React, {useEffect, useState} from 'react';
import { useInformState, useInformDispatch} from './InformProvider'
import { Link } from "react-router-dom";
import ErrorPage from './ErrorPage';
import axios from 'axios';

const ResultPage = () => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  const [result, setResult] = useState('');
  const [resultUrl, setResultUrl] = useState("");
  const [mostWorst, setMostWorst] = useState({
    most: [{}, {}],
    worst: [{}, {}]
  });

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
          const res = await axios.post(url, param, {headers: {
            "Content-Type": "application/json"
          }})

          const seq = res.data.RESULT.url.split('=')[1];
          const scoreUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

          const scoreRes = await axios.get(scoreUrl, {headers: {
            "Content-Type": "application/json"
          }})
          setResultUrl(res.data.RESULT.url)
          const score = scoreRes.data.result.wonScore.split(' ').filter(el=>el);
          const scores = []
          score.forEach((s) => {
            s = s.split('=');
            scores.push({"no": s[0], "type": state.questionInfo[s[0]], "count": s[1]})
          })
          const sortedScore = [...scores].sort((a, b) => a.count - b.count)
          dispatch({
            type: "ADD_RESULT",
            scores: scores,
            sortedScores: sortedScore
          })

          setMostWorst(() => {
            return {
              most: sortedScore.slice(-2),
              worst: sortedScore.slice(0, 2)
            }
          })
        })();
      } catch(e){
        return;
      }
    }
  }, [result])
  console.log(state)
  return (
    <>
      {(state.answers.length === 0 || state.answers.includes('0')) 
      ? <ErrorPage/> 
      : <div className="wrapper">
          <div className="box-wrapper">
            <h1>검사가 완료되었습니다.</h1>
            <div className="result-message">{`직업생활과 관련하여 ${state.user.name}님은 ${mostWorst.most[0].type}(와)과 ${mostWorst.most[1].type}(을)를 가장 중요하게 생각합니다.
반면에 ${mostWorst.worst[0].type}, ${mostWorst.worst[1].type}은 상대적으로 덜 중요하게 생각합니다.`}</div>
            <a href={resultUrl} target="_blank" rel="noopener noreferrer">결과</a>
            <Link to="/">처음으로</Link>
          </div>
        </div>}
    </>
  )
}
export default ResultPage