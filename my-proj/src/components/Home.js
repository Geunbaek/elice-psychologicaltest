import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { useInformDispatch } from './InformProvider'

function Home() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState('')
  const dispatch = useInformDispatch();
  const history = useHistory();

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
              <button type='submit' disabled={!name||!gender} className="start-btn">검사 시작</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;