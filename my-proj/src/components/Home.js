import React from 'react';
import { Link } from "react-router-dom";

function Home() {

  const handleSubmit = (e) => {
    e.preventDefalut();
  }

  return (
    <>
      <div className="wrapper">
        <h1>직업가치관검사</h1>
        <form>
          <div className="form-wrapper">
            <div className="input-wrapper">
              <div>이름</div>
              <input type="text" />
            </div>
            <div className="checkbox-wrapper">
              <div>성별</div>
              <label><input type="radio" name="person"/>남자</label>
              <label><input type="radio" name="person" />여자</label>
            </div>
            <Link to="/start"><button type='submit'>검사 시작</button></Link> 
          </div>
        </form>
      </div>
    </>

  );
}

export default Home;