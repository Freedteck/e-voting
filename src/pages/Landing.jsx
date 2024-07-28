import { Link } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing container">
      <div className="banner">
        <h1>Welcome to Unilorin Elections 2024!</h1>
        <p>Secure, Transparent, and Easy Voting at Your Fingertips.</p>
        <button>
          <Link to={"/voting"}>Vote Now</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default Landing;
