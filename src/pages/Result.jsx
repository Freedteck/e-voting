import { useEffect, useState } from "react";
import "../styles/result.css";
import { ReadVotes } from "../utils/wagmiClient";

const Result = () => {
  const { data } = ReadVotes();

  const [presidents, setPresidents] = useState([]);
  const [vice, setVice] = useState([]);
  const [Pro, setPro] = useState([]);
  const [secretary, setSecretary] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
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
    }
  }, [data]);

  return (
    <div className="container result">
      <h2>Results</h2>
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
        </tbody>
      </table>
    </div>
  );
};

export default Result;
