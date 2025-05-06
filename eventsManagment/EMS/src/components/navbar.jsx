import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn, userRole, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header id="header">
      <div className="container">
      <div id="logo1" className="pull-left">
  <a href="#intro" className="scrollto">
    <img 
      src="img/new1.png" 
      alt="Logo" 
      title="Logo" 
      style={{ width: "200px", height: "170px" }} // Adjust size as needed
    />
  </a>
</div>

        <nav id="nav-menu-container">
          <ul className="nav-menu">
            {/* ✅ Public Pages - Jab Admin Login Na Ho */}
            {!isLoggedIn || (isLoggedIn && userRole !== "admin"&& userRole !== "exhibitor") ? (
              <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/speakers">Speakers</NavLink></li>
                <li><NavLink to="/schedule">Schedule</NavLink></li>
                {/* <li><NavLink to="/venue">Venue</NavLink></li> */}
                {/* <li><NavLink to="/hotels">Hotels</NavLink></li>
                <li><NavLink to="/gallery">Gallery</NavLink></li> */}
                <li><NavLink to="/public">Upcoming event</NavLink></li>
                
                {/* <li className="buy-tickets"><a href="#buy-tickets">Buy Tickets</a></li> */}
              </>
            ) : null}

            {/* ✅ Admin Pages - Sirf Jab Admin Login Ho */}
            {isLoggedIn && userRole === "admin" && (
              <>
                <li><NavLink to="/admin-dashboard">Admin Dashboard</NavLink></li>
                <li><NavLink to="/add-event">Add Event</NavLink></li>
                <li><NavLink to="/manage-events">Manage Events</NavLink></li>
                <li><NavLink to="/userlist">Registered Users</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
              </>
            )}

            {/* ✅ Exhibitor Pages - Sirf Jab Exhibitor Login Ho */}
            {isLoggedIn && userRole === "exhibitor" && (
              <>
                <li><NavLink to="/exhibitor-dashboard">Exhibitor Dashboard</NavLink></li>
                <li><NavLink to="/exhibitor-search">Exhibitor Search</NavLink></li>
                {/* <li><NavLink to="/messages">Messages</NavLink></li> */}
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
              </>
            )}

            {/* ✅ Regular Logged-in Users - Profile and Logout */}
            {isLoggedIn && userRole !== "admin" && userRole !== "exhibitor" && (
              <>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                <li><NavLink to="/exhibitor-registration">Exhibitor Registration</NavLink></li>
              </>
            )}

            {/* ✅ Login/Register - Sirf Jab User Login Na Ho */}
            {!isLoggedIn && (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
               
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
