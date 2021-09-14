import React, { useState, useEffect } from "react";

const GetUsers = () => {
  useEffect(() => {
    getusers();
  }, []);

  const [users, setUsers] = useState([]);
  const getusers = async () => {
    const fetchdata = await fetch("http://localhost:5000/admin/getusers", {
      credentials: "include",
    });
    const users = await fetchdata.json();
    setUsers(users);
  };

  return (
    <div className="container">
      <h2 className="mt-5">Book Store users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetUsers;
