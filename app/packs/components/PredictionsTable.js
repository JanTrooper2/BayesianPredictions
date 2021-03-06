import React, {useState, useEffect} from "react"
import Select from 'react-select'

const PredictionsTable = () => {
  // Setup

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [outcome, setOutcome] = useState("null")
  const [amount, setAmount] = useState(20)
  const [jsonPredictions, setJsonPredictions] = useState();
  const [formDisplayToggle, setFormDisplayToggle] = useState("d-none");
  const [jsonUploadData, setJsonUploadData] = useState();
  const [pageOffset, setPageOffset] = useState(0);
  const [predictionsOrder, setPredictionsOrder] = useState("created_at DESC");

  const amountOptions = [
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'lime' : 'blue',
      padding: 20,
      backgroundColor: "gray",
    })
  }
  //Fetching Data

  useEffect(() => {
    refresh();
  }, [amount, outcome, pageOffset, predictionsOrder])
  useEffect(() => {
    setPageOffset(0);
  }, [predictionsOrder])

  function refresh() {
    fetch(`/api?outcome=${outcome}&amount=${amount}&pageOffset=${pageOffset}&predictionsOrder=${predictionsOrder}`)
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
        {/* Filter */}
        <div className="filter-selectors pb-3 d-flex justify-content-center">
          <div className="align-middle px-3 w-50">
            Amount <Select isSearchable={ false } inputProps={{readOnly:true}} styles={customStyles} defaultValue={amountOptions[0]} name="amountSelector" onChange={(e) => setAmount(e.value)} options={amountOptions} />
          </div>
          <div className="align-middle w-50 px-3">
            Outcome <Select isSearchable={ false } inputProps={{readOnly:true}} styles={customStyles} defaultValue={outcomeOptions[0]} name="outcomeSelector" onChange={(e) => setOutcome(e.value)} options={outcomeOptions} />    
          </div>
        </div>
        {/* Table */}
        <table className="container-lg table table-hover" >
          <thead className="thead-dark">
            <tr className="text-white" key="headRow">
              <th scope="col" colSpan="1">Category<button className="mx-2 btn-secondary" onClick={() => setPredictionsOrder(predictionsOrder == "category ASC" ?  "category DESC": "category ASC")}>⇵</button></th>
              <th className="d-none d-lg-table-cell" scope="col" colSpan="1">Name<button className="mx-2 btn-secondary" onClick={() => setPredictionsOrder(predictionsOrder == "name ASC" ?  "name DESC": "name ASC")}>⇵</button></th>
              <th scope="col" colSpan="1">Probability<button className="mx-2 btn-secondary" onClick={() => setPredictionsOrder(predictionsOrder == "probability_in_percent ASC" ?  "probability_in_percent DESC": "probability_in_percent ASC")}>⇵</button></th>
              <th className="d-none d-lg-table-cell" scope="col" colSpan="1">Expiration Date<button className="mx-2 btn-secondary" onClick={() => setPredictionsOrder(predictionsOrder == "expiration_date ASC" ?  "expiration_date DESC": "expiration_date ASC")}>⇵</button></th>
              <th scope="col" colSpan="3"></th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr className={item.outcome == null ? (Date.parse(item.expiration_date) < new Date() ? "table-warning" : "table-secondary") : (item.outcome == true ? "table-success" : "table-danger")} key={item.id}>
                <td>{item.category}</td>
                <td className="d-none d-lg-table-cell">{item.name}</td>
                <td>{item.probability_in_percent + "%"}</td>
                <td className="d-none d-lg-table-cell">{item.expiration_date}</td>
                <td><a href={`/predictions/${item.id}`} className="btn btn-info text-dark">Show</a></td>
                <td className="d-none d-lg-table-cell"><a href={`/predictions/${item.id}/edit`} className="btn btn-warning text-dark">Edit</a></td>
                <td className="d-none d-lg-table-cell"><a data-confirm="Are you sure?" data-method="delete" href={`/predictions/${item.id}`} className="btn btn-danger text-dark">Destroy</a></td>
              </tr>
              ))}
          </tbody>
        </table>
        <div name="Table Page Control" className="d-flex justify-content-center py-3">
            <button onClick={() => setPageOffset(pageOffset < amount ? 0 : pageOffset - amount)} className="btn btn-primary mx-2">Previous Page</button>
            <button onClick={() => setPageOffset(items.length < amount ? pageOffset : pageOffset + amount)} className="btn btn-primary mx-2">Next Page</button>
        </div>
        {/* JSON */}
        <div className="d-none d-lg-block">
          <div className="d-flex justify-content-around">
            <div className="w-25">
              <button onClick={() => serializeData(items)} className="btn btn-success">Download Predictions in JSON Format</button>
              <p style={{maxHeight: "200px"}} className="overflow-auto"> {jsonPredictions}</p>
            </div>
            <div className="w-25">
              <button onClick={() => toggleForm()} className="btn btn-primary px-5">Upload Predictions in JSON Format</button>
              <form className={formDisplayToggle} onSubmit={(e) => uploadData(e, jsonUploadData)}>
                <h5>JSON Upload format</h5>
                <p>The entire Upload has to be encased with square brackets.</p>
                <p>Each prediction has to be seperated by a comma.</p>
                <p>Inside of each prediction you need to add the following value pairs: name(with quotation marks), outcome(without quotation marks), description(with quotation marks), probability_in_percent(without quotation marks), expiration_date(YYYY-MM-DD (without quotation marks))</p>
                <p>Example:  [{'{"name": "Prediction1", "probability_in_percent": 10, ...}, {"name": "Prediction2","expiration_date": 2020-05-05, ...}'}]</p>
                <textarea className="w-100" style={{height: "200px"}} onChange={(e) => setJsonUploadData(e.target.value)}/> 
                <input type="submit" value="Submit" className="btn btn-success text-white" />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PredictionsTable
