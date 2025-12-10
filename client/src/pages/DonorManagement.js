import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);

  const getDonors = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) setDonors(data.donars || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1>Donor Management</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d) => (
              <tr key={d._id}>
                <td>{d.name || d.organisationName}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DonorManagement;
