import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">

            <div className="col-lg-4 col-md-6 footer-info">
            <div id="logo1" className="pull-left">
  <a href="#intro" className="scrollto">
    <img 
      src="img/new1.png" 
      alt="Logo" 
      title="Logo" 
      style={{ width: "180px", height: "180px" }} // Adjust size as needed
    />
  </a>
</div>
              <p>EventSphere Management - Transforming expo experiences through innovative event management solutions. Streamline your exhibitions with our integrated platform for organizers, exhibitors, and attendees.</p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Event Navigation</h4>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/schedule">Schedule</NavLink></li>
                <li><NavLink to="/venue">Venue</NavLink></li>
                <li><NavLink to="/public">Upcoming Events</NavLink></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Participant Resources</h4>
              <ul>
                <li><NavLink to="/exhibitor-registration">Exhibitor Signup</NavLink></li>
                <li><NavLink to="/speakers">Featured Speakers</NavLink></li>
                <li><NavLink to="/exhibitor-search">Exhibitor Directory</NavLink></li>
                <li><NavLink to="/resources">Event Resources</NavLink></li>
                <li><NavLink to="/contact">Contact Support</NavLink></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>EventSphere HQ</h4>
              <p>
                250 Expo Management Blvd<br/>
                Karachi, NY 10001<br/>
                Pakistan<br/>
                <strong>Support:</strong> +92 (314) 2219507<br/>
                <strong>Email:</strong> danish.saleem70200@gmail.com<br/>
              </p>

              <div className="social-links">
                <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
                <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; {new Date().getFullYear()} <strong>EventSphere Management</strong>. All Rights Reserved
        </div>
        <div className="credits">
          <NavLink to="/privacy">Privacy Policy</NavLink> | 
          <NavLink to="/terms">Terms of Service</NavLink> | 
          <NavLink to="/accessibility">Accessibility</NavLink>
        </div>
      </div>
    </footer>
  );
};