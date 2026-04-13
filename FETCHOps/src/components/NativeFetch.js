import { useState } from "react";

export default function NativeFetch({ url }) {
  const [native, setNative] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = url;

  const fetchResult = () => {
    setLoading(true);
    setNative([]);
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => setNative(data))
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
      <button onClick={fetchResult}>Get Users from Native Fetch</button>
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
