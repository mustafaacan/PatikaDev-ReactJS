import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users({ URL }) {
  const [native, setNative] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [URL]);

  return (
    <div>
      <h2>Users</h2>
      <h3>{loading && "LOADING..."}</h3>
      <ul>
        {native.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={`/user/${item.id}`}
                state={{ maxUserCount: native.length }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
