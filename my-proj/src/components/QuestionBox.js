import { useInformState, useInformDispatch } from './InformProvider'

const QuestionBox = ({ q, qIndex }) => {
  const state = useInformState();
  const dispatch = useInformDispatch();
  return (
    <>
      <div className="question-container">
        <div className="question">{ q.question }</div>
        <div className="radios-container">
          <label id='radio-wrapper'>
            <input type="radio" name={`opt${qIndex}`} onClick={() => {
              dispatch({
                type: "ADD_ANSWER",
                qNum: qIndex,
                answerScore: q.answerScore01
              })
            }} defaultChecked={state.answers[qIndex] === q.answerScore01}/>{q.answer01}
          </label>
          <label id='radio-wrapper'>
            <input type="radio" name={`opt${qIndex}`} onClick={() => {
              dispatch({
                type: "ADD_ANSWER",
                qNum: qIndex,
                answerScore: q.answerScore02
              })
            }} defaultChecked={state.answers[qIndex] === q.answerScore02}/>{q.answer02}
          </label>
        </div>
      </div>
    </>
  )
}

export default QuestionBox;