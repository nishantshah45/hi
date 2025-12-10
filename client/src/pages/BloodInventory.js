import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);

  const getInventory = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) setInventory(data.inventory || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1>Blood Inventory</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Type</th>
              <th>Quantity (ML)</th>
              <th>Donor / Hospital</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((rec) => (
              <tr key={rec._id}>
                <td>{rec.bloodGroup}</td>
                <td>{rec.inventoryType}</td>
                <td>{rec.quantity}</td>
                <td>{rec.donar?.name || rec.hospital?.hospitalName || rec.email}</td>
                <td>{new Date(rec.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BloodInventory;
