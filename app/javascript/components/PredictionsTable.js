import React, {useState, useEffect} from "react"
import Select from 'react-select'

const PredictionsTable = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [outcome, setOutcome] = useState()
  const [amount, setAmount] = useState(20)


  useEffect(() => {
    let paramString = "";
    if (outcome !== "null") {
      paramString += "outcome=" + outcome + "&";
    }
    if (amount !== "null") {
      paramString += "amount=" + amount;
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
  }, [amount, outcome])

  const amountOptions = [
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
    { value: 120, label: '120' },
    { value: 140, label: '140' },
    { value: 160, label: '160' },
    { value: 180, label: '180' },
    { value: 200, label: '200' },
    { value: "null", label: 'all' },

  ]
  const outcomeOptions = [
    {value: "true", label: 'only true'},
    {value: "false", label: 'only false'},
    {value: "both", label: 'only resolved'},
    {value: "null", label: 'only unresolved'},
  ]

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Select name="amountSelector" onChange={(e) => setAmount(e.value)} options={amountOptions} />
        <Select name="outcomeSelector" onChange={(e) => setOutcome(e.value)} options={outcomeOptions} />

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
                <td>{item.outcome == null ? "TBD" : String(item.outcome)}</td>
                <td className="d-flex justify-content-between">
                  <a href={`/predictions/${item.id}`} className="btn btn-info">Show</a>
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
