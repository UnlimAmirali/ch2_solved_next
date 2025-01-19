import { useState, useEffect } from 'react';
import axios from 'axios';

export default function InsuranceInfo() {
  const [insuranceInfo, setInsuranceInfo] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        setInsuranceInfo(response.data.insuranceInfo);
      })
      .catch((error) => {
        console.error('Error fetching insurance info:', error);
      });
  }, []);

  const sortData = () => {
    // const sorted = [...insuranceInfo].sort((a, b) => {
    //   return sortOrder === 'asc'
    //     ? a.insuranceValue - b.insuranceValue
    //     : b.insuranceValue - a.insuranceValue;
    // });
    // setInsuranceInfo(sorted);
    // setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h1>Third Party Insurance Information</h1>
      <button onClick={sortData}>Sort by Value ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</button>
      <table border="1" >
        <thead>
          <tr>
            <th>User ID</th>
            <th>Car</th>
            <th>Policy Number</th>
            <th>Insurance Value</th>
          </tr>
        </thead>
        <tbody id="insu">
          {insuranceInfo.map((info) => (
            <tr key={info.policyNumber}>
              <td>{info.userId}</td>
              <td>{info.car}</td>
              <td>{info.policyNumber}</td>
              <td>{info.insuranceValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
