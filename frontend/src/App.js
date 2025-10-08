import React, {useEffect, useState} from 'react';
import './App.css';
import { getPopulationData } from "./api"

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getPopulationData();
        setData(result.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Población de Colombia</h1>
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Año</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Población</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.anio}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.anio}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.poblacion.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

