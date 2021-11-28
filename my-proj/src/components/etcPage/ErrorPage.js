import { useHistory} from "react-router-dom";


const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="wrapper">
        <div className="error-message">잘못된 접근입니다 !</div>
        <div className="btn-container">
            <button onClick={() => {
              history.push('/');
            }} className="btn">홈으로</button>
          </div>
      </div>
    </div>
  )
}

export default ErrorPage;