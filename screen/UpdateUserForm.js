// src/UpdateUserForm.js
import React, { useState } from "react";
import { updateUser } from "../store/slices/userService";

const UpdateUserForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age: Number(age) };
    await updateUser(user.id, updatedUser);
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
