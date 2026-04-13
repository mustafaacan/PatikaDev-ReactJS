import { useState } from "react";
import axios from "axios";

export default function AxiosFetch({ url }) {
  const [native, setNative] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = url;

  const fetchResult = () => {
    setLoading(true);
    setNative([]);
    axios(URL)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.data;
      })
      .then((data) => {
        setNative(data);
      })
      .catch((err) => {
        console.log(err);
        setNative([
          {
            id: 1,
            name: `Result could not obtained due to error: ${err.message}`,
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <button onClick={fetchResult}>Get Users from Axios Fetch</button>
      <p className="loading">{loading && "LOADING..."}</p>
      {native.map((item) => {
        return (
          <p key={item.id} className="results">
            {item.name}
          </p>
        );
      })}
    </div>
  );
}
