import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const Forecasting = () => {
  const [forecasts, setForecasts] = useState(null);

  const getForecast = async () => {
    try {
      const { data } = await API.get("/analytics/forecast");
      if (data?.success) setForecasts(data.forecasts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1>AI Forecasting</h1>
        <p>Simple moving-average forecast (next 7 days) per blood group.</p>
        {!forecasts && <div>Loading...</div>}
        {forecasts && (
          <div>
            {Object.keys(forecasts).map((bg) => (
              <div key={bg} className="card my-2 p-2">
                <h4>{bg}</h4>
                <p>
                  Current available: <b>{forecasts[bg].current}</b>
                </p>
                <p>
                  Avg daily change: <b>{forecasts[bg].avgDailyChange.toFixed(2)}</b>
                </p>
                <p>
                  Next 7 days forecast: <b>{forecasts[bg].next7.join(", ")}</b>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Forecasting;
