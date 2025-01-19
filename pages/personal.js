// pages/personal.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        setPersonalInfo(response.data.personalInfo);
      })
      .catch((error) => {
        console.error('Error fetching personal info:', error);
      });
  }, []);

  return (
    <div>
      <h1>Personal Information</h1>
      <table border="1">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {personalInfo.map((info) => (
            <tr key={info.userId}>
              <td>{info.userId}</td>
              <td>{info.firstName}</td>
              <td>{info.lastName}</td>
              <td>{info.age}</td>
              <td>{info.gender}</td>
              <td>{info.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}