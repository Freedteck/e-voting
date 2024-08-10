import { useEffect, useState } from "react";
import "../styles/result.css";
import { ReadVotes } from "../utils/wagmiClient";
import Spinner from "../components/Spinner";

const Result = () => {
  const { data } = ReadVotes();
  const [loading, setLoading] = useState(true);
  const [presidents, setPresidents] = useState([]);
  const [vice, setVice] = useState([]);
  const [Pro, setPro] = useState([]);
  const [secretary, setSecretary] = useState([]);
  const [totalPresidentVotes, setTotalPresidentVotes] = useState(0);
  const [totalViceVotes, setTotalViceVotes] = useState(0);
  const [totalProVotes, setTotalProVotes] = useState(0);
  const [totalSecretaryVotes, setTotalSecretaryVotes] = useState(0);

  useEffect(() => {
    if (data) {
      const filteredPresident = data.filter(
        (president) => president.category === "SU President"
      );
      setPresidents([...filteredPresident]);

      const filteredVice = data.filter(
        (vice) => vice.category === "SU Vice President"
      );
      setVice([...filteredVice]);

      const filteredPro = data.filter((pro) => pro.category === "SU PRO");
      setPro([...filteredPro]);

      const filteredSecretary = data.filter(
        (secretary) => secretary.category === "SU Secretary"
      );
      setSecretary([...filteredSecretary]);

      setLoading(true); // Stop the loading once data is processed
    }
  }, [data]);

  useEffect(() => {
    if (presidents.length > 0) {
      const totalVotes = presidents.reduce((acc, cur) => {
        return acc + parseInt(cur.votes);
      }, 0);
      setTotalPresidentVotes(totalVotes);
    }
    if (vice.length > 0) {
      const totalVotes = vice.reduce((acc, cur) => {
        return acc + parseInt(cur.votes);
      }, 0);
      setTotalViceVotes(totalVotes);
    }
    if (Pro.length > 0) {
      const totalVotes = Pro.reduce((acc, cur) => {
        return acc + parseInt(cur.votes);
      }, 0);
      setTotalProVotes(totalVotes);
    }
    if (secretary.length > 0) {
      const totalVotes = secretary.reduce((acc, cur) => {
        return acc + parseInt(cur.votes);
      }, 0);
      setTotalSecretaryVotes(totalVotes);
    }
  }, [presidents, vice, Pro, secretary]);

  return (
    <div className="container result">
      <div className="top">
        <h2>Results</h2>
        <div className="loading-container">
          <div className="progress-bar">
            <div className="progress-bar-fill">
              <span className="progress-text">in progress...</span>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>SU president</caption>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>No of votes</th>
          </tr>
        </thead>
        <tbody>
          {presidents.map((president, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{president.candidate}</td>
              <td>{parseInt(president.votes)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td colSpan={2} style={{ textAlign: "center" }}>
              Total votes
            </td>
            <td>{totalPresidentVotes}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>SU vice president</caption>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>No of votes</th>
          </tr>
        </thead>
        <tbody>
          {vice.map((vc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{vc.candidate}</td>
              <td>{parseInt(vc.votes)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td colSpan={2} style={{ textAlign: "center" }}>
              Total votes
            </td>
            <td>{totalViceVotes}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>SU PRO</caption>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>No of votes</th>
          </tr>
        </thead>
        <tbody>
          {Pro.map((pro, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pro.candidate}</td>
              <td>{parseInt(pro.votes)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td colSpan={2} style={{ textAlign: "center" }}>
              Total votes
            </td>
            <td>{totalProVotes}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>SU Secretary</caption>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>No of votes</th>
          </tr>
        </thead>
        <tbody>
          {secretary.map((sec, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{sec.candidate}</td>
              <td>{parseInt(sec.votes)}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td colSpan={2} style={{ textAlign: "center" }}>
              Total votes
            </td>
            <td>{totalSecretaryVotes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
