import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Home} from './pages/home';
import {About} from './pages/about';
import {Contact} from './pages/contact';
import {Services} from './pages/services';
import {Register} from './pages/register';
import {Login} from './pages/login';
import {Navbar} from './components/navbar';
import { Footer } from './components/footer';
import { Speakers } from './pages/Speakers';
import { Schedule } from './pages/Schedule';
import { Venue } from './pages/Venue';
import { Hotels } from './pages/Hotels';
import { Gallery } from './pages/Gallery';
import { AdminDashboard } from '../src/pages/AdminDashboard';
import { Profile } from './components/Profile';
import {ForgotPassword} from './components/ForgotPassword '
import { ResetPassword } from "./pages/ResetPassword";
import {AddEvent }from './pages/AddEvent';
import {ManageEvents} from './pages/ManageEvents';

// ✅ New Pages
import { ExhibitorRegistration } from './pages/ExhibitorRegistration';
import { ExhibitorDashboard } from './pages/ExhibitorDashboard';
import { Messages } from './pages/Messages';
import { ExhibitorSearch } from './pages/ExhibitorSearch';
import { Users } from './pages/EventList';
import{PublicEvents}from './pages/PublicEvents'

// ✅ Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/userlist" element={<Users />} />
        <Route path="/public" element={<PublicEvents />} />
        {/* ✅ Exhibitor Pages */}
        <Route path="/exhibitor-registration" element={<ExhibitorRegistration />} />
        <Route
          path="/exhibitor-dashboard"
          element={
            <ProtectedRoute role="exhibitor">
              <ExhibitorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route path="/exhibitor-search" element={<ExhibitorSearch />} />

        {/* ✅ User Pages (Protected) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Pages (Sirf admin ke liye) */}
        <Route
          path="admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <ProtectedRoute role="admin">
              <AddEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-events"
          element={
            <ProtectedRoute role="admin">
              <ManageEvents />
            </ProtectedRoute>
          }
        />

        {/* ✅ Forgot & Reset Password */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Unauthorized Page */}
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

        {/* ✅ 404 Page */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;