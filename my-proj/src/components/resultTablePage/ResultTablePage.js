import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useInformState, useInformDispatch } from '../InformProvider'
import Graph from "./Graph";
import Table from './Table';
import axios from 'axios';
import { majorInfo, jobInfo } from '../../data/data';
import LoadingPage from '../etcPage/LoadingPage';
import ErrorPage from '../etcPage/ErrorPage';

const ResultTablePage = () => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    try{
      (async function(){
        const jobUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${state.fin.most[0].no}&no2=${state.fin.most[1].no}`;
        const jobRes = await axios.get(jobUrl);

        const majorUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${state.fin.most[0].no}&no2=${state.fin.most[1].no}`;
        const majorRes = await axios.get(majorUrl);
        const jobs = {}
        const majors = {"계열무관": []}
        
        const jobData = jobRes.data
        const majorData = majorRes.data

        jobData.sort((a, b) => {
          if(a[2] > b[2]){
            return 1;
          } else if (a[2] < b[2]){
            return -1;
          } else {
            if(a[1] > b[1]){
              return 1;
            } else if (a[1] < b[1]){
              return -1;
            }
            return 0;
          }
        })
        majorData.sort((a, b) => {
          if(a[2] > b[2]){
            return 1;
          } else if (a[2] < b[2]){
            return -1;
          } else {
            if(a[1] > b[1]){
              return 1;
            } else if (a[1] < b[1]){
              return -1;
            }
            return 0;
          }
        })

        jobData.forEach((el) => {
          if (jobs[jobInfo[el[2]]] === undefined){
            jobs[jobInfo[el[2]]] = [el[1]];
            return
          }
          jobs[jobInfo[el[2]]].push(el[1])
        })

        majorData.forEach((el) => {
          majors["계열무관"].push(el[1]);
          if(majorInfo[el[2]] === undefined){
            return
          } 

          if(majors[majorInfo[el[2]]] === undefined){
            majors[majorInfo[el[2]]] = [el[1]];
            return
          }
          majors[majorInfo[el[2]]].push(el[1]);
        })
  
        dispatch({
          type: "ADD_JOB_MAJOR",
          jobs : jobs,
          majors : majors
        })
        setLoading(false)
      })();
    } catch {
      setError(true)
    }
  }, [])
  
  if(error || (state.answers.length === 0 || state.answers.includes('0'))) return <ErrorPage />
  else if(loading) return <LoadingPage />
  return (
    <>
      <div className="wrapper">
        <div className="box-wrapper">
          <div className="user-info">{`이름 : ${state.user.name}  |  성별 : ${state.user.gender === 'man' ? "남자" : "여자"}  |  날짜 : ${state.user.now}`}</div>
          <div className="tables-wrapper">
            {state.score.map((s) => {
              return (
                <Graph key={s.no} idx={s.no} count={parseInt(s.count) + 1} text={s.type} />
              )
            })}
          </div>
          <div className="avg-title">종사자 평균 학력별</div>
          <div className="table-rows-wrapper">
            {Object.keys(state.fin.jobs).map(key => {
              return (
                <Table title={key} contents={state.fin.jobs[key]}/>
              );
            })}
          </div>
          <div className="avg-title">종사자 평균 전공별</div>
          <div className="table-rows-wrapper">
            {Object.keys(state.fin.majors).map(key => {
              return (
                <Table title={key} contents={state.fin.majors[key]}/>
              )
            })}
          </div>
          <div className="btn-container">
            <button onClick={() => {
              history.push('/');
            }} className="btn">다시 검사하기</button>
          </div>
        </div>
      </div> 
    </>
  )
}
export default ResultTablePage;