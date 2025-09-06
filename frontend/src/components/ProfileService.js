import React, { useEffect, useState } from "react";
import { addUser, fetchUsers } from "../services/api";

const ProfileService = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!name || !age) return;
    await addUser({ name, age: Number(age) });
    setName("");
    setAge("");
    loadUsers();
  };

  return (
    <div>
      <h2>Profile Service Users</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileService;
