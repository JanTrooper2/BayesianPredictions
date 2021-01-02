import React, {useState} from "react"
import Select from 'react-select'

const Calibration = () => {
  const [year, setYear] = useState(0);
  const [formDisplayToggle, setFormDisplayToggle] = useState("d-none");

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

  return (
    <React.Fragment>
      <button onClick={() => setFormDisplayToggle("d-block")} className="btn-primary">Calibrate</button>
      <div className="Request-Form">
        <form className={formDisplayToggle} onSubmit={(e) => request_picture(e)}>
          Year:<Select defaultValue={yearOptions[0]} name="yearSelector" onChange={(e) => setYear(e.value)} options={yearOptions} />
          <input className="btn-success" type="submit" value="Submit" />
        </form>
      </div>
    </React.Fragment>
  )
}

export default Calibration