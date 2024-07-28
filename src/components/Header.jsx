import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <nav className="container">
        <h1 className="logo">Unilorin Elections 2024</h1>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Header;
