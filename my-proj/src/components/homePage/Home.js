import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useInformDispatch } from '../InformProvider'

function Home() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState('');
  const dispatch = useInformDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "RESET"
    })
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gender || !name){
      return;
    } 
    await dispatch({
      type: "INSERT_USER",
      name: name,
      gender: gender
    })
    history.push('/testPrevPage');
  }

  const makeMessage = (e, tag, message) => {
    e.preventDefault();
    tag.innerHTML= message;
    setTimeout(() => {
      tag.innerHTML="";
    }, 1500)
  }

  const pushAlert = (e) => {
    const re = /[^가-힣]/;
    const tag = document.getElementById('alert-message');
    
    if (re.test(name)){
      makeMessage(e, tag, "잘못된 이름입니다.");
      return
    }

    if(!name && !gender){
      makeMessage(e, tag, "이름과 성별을 확인해주세요.")
      return;
    } else if (!name){
      makeMessage(e, tag, "이름을 확인해주세요.")
      return;
    } else if (!gender){
      makeMessage(e, tag, "성별을 확인해주세요.")
      return;
    }
  }

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h1>직업가치관검사</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <div className="input-wrapper">
                <div>이름</div>
                <input type="text" value={name} onChange={(e)=>{
                  setName(e.target.value)
                }}/>
              </div>
              <div className="checkbox-wrapper">
                <div>성별</div>
                <label><input type="radio" name="person" value='man' onClick={(e)=>{
                  setGender(e.target.value);
                }}/>남자</label>
                <label><input type="radio" name="person" value="woman" onClick={(e)=>{
                  setGender(e.target.value)
                }}/>여자</label>
              </div>
              <div id="alert-message"></div>
              <button type='submit' className="btn" onClick={pushAlert}>검사 시작</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;