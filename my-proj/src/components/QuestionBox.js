import { useInformState, useInformDispatch } from './InformProvider'

const QuestionBox = ({ q, qnum, pnum }) => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  console.log(state)
  return (
    <>
      <div className="box-container">
        <div>{ q.question }</div>
        <div className="radio-container">
          <label>
            <input type="radio" name={`opt${Number(pnum) * 3 + Number(qnum)}`} onClick={() => {
              dispatch({
                type: "ADD_ANSWER",
                qNum: Number(pnum) * 3 + Number(qnum),
                answerScore: q.answerScore01
              })
            }} defaultChecked={state.answers[Number(pnum) * 3 + Number(qnum)] === q.answerScore01}/>{q.answer01}
            <div>{q.answer03}</div>
          </label>
          <label>
            <input type="radio" name={`opt${Number(pnum) * 3 + Number(qnum)}`} onClick={() => {
              dispatch({
                type: "ADD_ANSWER",
                qNum: Number(pnum) * 3 + Number(qnum),
                answerScore: q.answerScore02
              })
            }} defaultChecked={state.answers[Number(pnum) * 3 + Number(qnum)] === q.answerScore02}/>{q.answer02}
            <div>{q.answer04}</div>
          </label>
        </div>
      </div>
    </>
  )
}

export default QuestionBox;