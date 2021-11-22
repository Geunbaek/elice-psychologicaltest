import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div>잘못된 접근입니다 !</div>
        <Link to='/'>처음으로</Link>
      </div>
    </div>
  )
}

export default ErrorPage;