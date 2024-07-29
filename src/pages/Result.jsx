import "../styles/result.css";

const Result = () => {
  return (
    <div className="container result">
      <h2>Results</h2>
      <table>
        <caption>SU president</caption>
        <thead>
          <th>Name</th>
          <th>No of votes</th>
        </thead>
        <tbody>
          <tr>
            <td>Name 1</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Name 2</td>
            <td>1040</td>
          </tr>
          <tr>
            <td>Name 3</td>
            <td>5000</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>SU vice president</caption>
        <thead>
          <th>Name</th>
          <th>No of votes</th>
        </thead>
        <tbody>
          <tr>
            <td>Name 1</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Name 2</td>
            <td>1040</td>
          </tr>
          <tr>
            <td>Name 3</td>
            <td>5000</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>SU PRO</caption>
        <thead>
          <th>Name</th>
          <th>No of votes</th>
        </thead>
        <tbody>
          <tr>
            <td>Name 1</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Name 2</td>
            <td>1040</td>
          </tr>
          <tr>
            <td>Name 3</td>
            <td>5000</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>Secretary</caption>
        <thead>
          <th>Name</th>
          <th>No of votes</th>
        </thead>
        <tbody>
          <tr>
            <td>Name 1</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Name 2</td>
            <td>1040</td>
          </tr>
          <tr>
            <td>Name 3</td>
            <td>5000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
