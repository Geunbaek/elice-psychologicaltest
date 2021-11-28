const Header = ({ text, progress }) => {
  return (
    <>
      <header className="header-container">
        <div className="header-wrapper">
          <div className="header-text">{ text }</div>
          <div className="header-state">{ progress }%</div>
        </div>
        <div id="state-bar">
          <div id="now-bar"></div>
        </div>
      </header>
    </>
  )
}

export default Header;