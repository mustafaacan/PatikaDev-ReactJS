import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

// for URL with Parameter

export default function User({ URL }) {
  // the keyword can be specified by the URL side
  // in index.js for parameter, we just used  <Route path="/user/:id" element={<User />} />
  // so the expected keyword is "id" and be aware that useParams() always returns an object

  let { id } = useParams();

  // useLocation() a hook that contains information about route (within object) provided by React Router.
  // contained object could be
  /* 
  {
  pathname: "/user/3",
  search: "",
  hash: "",
  state: {
    maxUserCount: 10
  },
  key: "abc123"
  }
 
  */
  // for our example state{maxUserCount} just adjusted from users.js as state={{ maxUserCount: native.length }}

  const location = useLocation();
  const maxUserCount = location.state?.maxUserCount ?? 1;

  const [native, setNative] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNative([]);

    const url = URL + "/" + id;
    axios(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.data;
      })
      .then((data) => {
        console.log(maxUserCount);
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
  }, [URL, id, maxUserCount]);

  // returns all the parameters as an object
  return (
    <React.Fragment>
      <h2>User Detail</h2>

      {loading ? (
        "LOADING..."
      ) : (
        <React.Fragment>
          <p>User Name : {native.name}</p>
          <p>User Email : {native.email}</p>
          <p>User Phone : {native.phone}</p>
          <ul>
            <li>
              <Link to="/users">Back to Users</Link>
            </li>
            {maxUserCount > 1 && id < maxUserCount ? (
              <li>
                <Link
                  to={`/user/${parseInt(id) + 1}`}
                  state={{ maxUserCount: maxUserCount }}
                >
                  Next User
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
