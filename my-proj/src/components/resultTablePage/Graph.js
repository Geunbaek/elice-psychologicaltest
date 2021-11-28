import React, {useEffect} from 'react';

const Graph = ({ idx, count, text}) => {

  useEffect(() => {
    graphMove(count)
  }, [])

  function graphMove(cur) {
    const tag = document.getElementsByClassName(`table${idx}`)
    let width = 0;
    const oper = setInterval(move, 40);
    function move(){
      if(width >= cur){
        clearInterval(oper);
      } else {
        width++;
        tag[0].style.height = `${width * 10}%`;
      }
    }
  }

  return (
    <>
      <div className={`table table${idx}`} onMouseOver={(e) => {
        
      }}>
        <div className="table-col-name">{text}</div>
      </div>
    </>
  )
}
export default Graph;