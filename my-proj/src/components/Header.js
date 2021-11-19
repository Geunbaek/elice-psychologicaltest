const Header = ({ text, progress }) => {
  return (
    <>
      <header className="header-container">
        <div className="header-wrapper">
          <div className="header-text">{ text }</div>
          <div className="header-state">{ progress }%</div>
        </div>
        <div className="state-bar"></div>
      </header>
    </>
  )
}

export default Header;