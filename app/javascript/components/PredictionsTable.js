import React, {useState, useEffect} from "react"

const PredictionsTable = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    let paramString = "";
    if (props.override !== null){
      paramString += "override=" + props.override;
    } else {
      if (props.outcome !== null) {
        paramString += "outcome=" + props.outcome;
      }
      if (props.amount !== null) {
        paramString += "amount=" + props.amount;
      }
    }
    fetch(`/api?${paramString}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <table className="table table-hover" >
          <thead className="thead-dark">
            <tr key="headRow">
              <th scope="col" colSpan="1">Name</th>
              <th scope="col" colSpan="1">Probability</th>
              <th scope="col" colSpan="1">Expiration Date</th>
              <th scope="col" colSpan="1">Outcome</th>
              <th scope="col" colSpan="1"></th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.probability_in_percent}</td>
                <td>{item.expiration_date}</td>
                <td>{item.outcome == null ? "TBD" : item.outcome}</td>
                <td className="d-flex justify-content-between">
                  <button className="btn btn-info">Show</button>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Destroy</button>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default PredictionsTable
