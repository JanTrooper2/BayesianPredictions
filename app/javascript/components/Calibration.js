import React, {useState} from "react"
import Select from 'react-select'

const Calibration = (props) => {
  const [year, setYear] = useState(0);
  const [formDisplayToggle, setFormDisplayToggle] = useState("d-none");
  const [oldCalibrationsToggle, setOldCalibrationsToggle] = useState("d-none");

  const request_picture = (e) => {
    e.preventDefault();
    window.location.replace(`/requests/new?year=${year}`);
  }

  const yearOptions = [
    { value: 0, label: 'all' },
    { value: 2015, label: '2015' },
    { value: 2016, label: '2016' },
    { value: 2017, label: '2017' },
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'lime' : 'blue',
      padding: 20,
      backgroundColor: "gray",
    })
  }
  const links = []
  props.plots.forEach((id, index) => {
    links.push(<li key={id}><a href={`requests/${id}`}>{index + 1}. Calibration</a></li>)
  })
  return (
    <React.Fragment>
      <div className="py-1">
        <button onClick={() => oldCalibrationsToggle == "d-none" ? setOldCalibrationsToggle("d-block") : setOldCalibrationsToggle("d-none")} className="btn my-2 btn-warning">Previous Calibrations</button>
        <div className={oldCalibrationsToggle}>
          <ul>
            {links}
          </ul>
        </div>
      </div>
      <div className="py-1">
        <button onClick={() => formDisplayToggle == "d-none" ? setFormDisplayToggle("d-block") : setFormDisplayToggle("d-none")} className="btn btn-primary">Calibrate</button>
        <div className="Request-Form py-1">
          <form className={formDisplayToggle} onSubmit={(e) => request_picture(e)}>
            Year:<Select styles={customStyles} className="py-2" defaultValue={yearOptions[0]} name="yearSelector" onChange={(e) => setYear(e.value)} options={yearOptions} />
            <input className="btn btn-success" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Calibration