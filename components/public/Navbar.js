import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <Link href="/">
        <a className="navbar-brand">
          <Image src="/images/logo.svg" alt="logo" width="80" height="50" />
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav navbar-nav ml-auto mb-4 mr-5">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link normal active-nav">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#about">
              <a className="nav-link normal">About</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#team">
              <a className="nav-link normal">Team</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#events">
              <a className="nav-link normal">Events</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#faq">
              <a className="nav-link normal">FAQ</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#contact">
              <a className="nav-link green-btn rounded-pill px-3">Contact Us</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
