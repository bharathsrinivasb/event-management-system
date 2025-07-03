import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Users</h2>
      <table border="0" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, fullname, email, username, phonenumber }) => (
            <tr key={id}>
              <td>{fullname}</td>
              <td>{email}</td>
              <td>{username}</td>
              <td>{phonenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
