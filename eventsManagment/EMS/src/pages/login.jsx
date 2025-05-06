import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../store/auth'
import "./login.css"; // Import CSS
export const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const {saveTokenInLocalStr} = useAuth();

    const navigate = useNavigate();

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
        ...user,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
    
        const responseData = await response.json();
        console.log("After Login:", responseData); // Debugging
    
        if (response.ok) {
          saveTokenInLocalStr(responseData.token, responseData.role); // 🔹 Store role
          localStorage.setItem('userRole', responseData.role); // 🔹 Save role in LocalStorage
          navigate('/');
        } else {
          alert(responseData.message || 'Login failed');
        }
      } catch (error) {
        console.log(error);
      }
    };
    return(
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image reg-img">
                            <img src="/img/login.png" alt="A Person Login in our Details" width={400} height={200} />
                        </div>
                        {/* Our Main Login Code */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={user.email} onChange={handleInput} placeholder="Email" required/>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" value={user.password} onChange={handleInput} placeholder="Password" required/>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-submit" onClick={handleSubmit} style={{backgroundColor: "#646cff", color: "white"}}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    );
};