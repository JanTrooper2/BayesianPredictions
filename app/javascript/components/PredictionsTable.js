import React, {useState, useEffect} from "react"
import Select from 'react-select'

const PredictionsTable = (props) => {
  // Setup

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [outcome, setOutcome] = useState("null")
  const [amount, setAmount] = useState(20)
  const [jsonPredictions, setJsonPredictions] = useState();
  const [formDisplayToggle, setFormDisplayToggle] = useState("d-none");
  const [jsonUploadData, setJsonUploadData] = useState();

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
    { value: "all", label: 'all' },

  ]
  const outcomeOptions = [
    {value: "null", label: 'only unresolved'},
    {value: "both", label: 'only resolved'},
    {value: "true", label: 'only true'},
    {value: "false", label: 'only false'},
    {value: "all", label: 'all'},
  ]

  useEffect(() => {
    refresh();
  }, [])

  const toggleForm = () => {
    if (formDisplayToggle == "d-none"){
      setFormDisplayToggle("d-block")
    } else {
      setFormDisplayToggle("d-none")
    }
  }

  //Fetching Data

  useEffect(() => {
    refresh();
  }, [amount, outcome])

  function refresh() {
    fetch(`/api?outcome=${outcome}&amount=${amount}`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  //Handling Data

  const serializeData = (objects) => {
    let formattedArray = objects.map(x => {
      return ({name: x.name, description: x.description, probability_in_percent: x.probability_in_percent, outcome: x.outcome, expiration_date: x.expiration_date});
    })
    setJsonPredictions(JSON.stringify(formattedArray));
  }


  const uploadData = (e, data) => {
    e.preventDefault();
    toggleForm();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
  }

  //Displaying Data
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <div className="filter-selectors">
          Amount: <Select defaultValue={amountOptions[0]} name="amountSelector" onChange={(e) => setAmount(e.value)} options={amountOptions} />
          Outcome: <Select defaultValue={outcomeOptions[0]} name="outcomeSelector" onChange={(e) => setOutcome(e.value)} options={outcomeOptions} />
          <br></br>
          <br></br>
        </div>
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
                  <a href={`/predictions/${item.id}/edit`} className="btn btn-warning">Edit</a>
                  <a data-confirm="Are you sure?" data-method="delete" href={`/predictions/${item.id}`} className="btn btn-danger">Destroy</a>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-around">
          <div className="w-25">
            <button onClick={() => serializeData(items)} className="btn btn-success">Download Predictions in JSON Format</button>
            <p style={{maxHeight: "200px"}} className="overflow-auto"> {jsonPredictions}</p>
          </div>
          <div className="w-25">
            <button onClick={() => toggleForm()} className="btn btn-primary">Upload Predictions in JSON Format</button>
            <form className={formDisplayToggle} onSubmit={(e) => uploadData(e, jsonUploadData)}>
              <h5>JSON Upload format</h5>
              <p>The entire Upload has to be encased with square brackets.</p>
              <p>Each prediction has to be seperated by a comma.</p>
              <p>Inside of each prediction you need to add the following value pairs: name(with quotation marks), outcome(without quotation marks), description(with quotation marks), probability_in_percent(without quotation marks), expiration_date(YYYY-MM-DD (without quotation marks))</p>
              <p>Example:  [{'{"name": "Prediction1", "probability_in_percent": 10, ...}, {"name": "Prediction2","expiration_date": 2020-05-05, ...}'}]</p>
              <textarea className="w-100" style={{height: "200px"}} onChange={(e) => setJsonUploadData(e.target.value)}/> 
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PredictionsTable
