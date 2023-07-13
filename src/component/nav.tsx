import '@/app/globals.css'

export default function Nav() {
  return (
  <header id="header" className="d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <h1><a href="index.html">MeeYoh</a></h1>
        {/* <a href="index.html"><img src="/vercel.svg" alt="" className="img-fluid" /></a> */}
      </div>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
          <li className="dropdown"><a href="#about"><span>About</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#about-misaki">Misaki</a></li>
              <li><a href="#about-yota">Yota</a></li>
            </ul>
          </li>
          <li><a className="nav-link scrollto" href="#portfolio">Portfolio</a></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
  )
}
