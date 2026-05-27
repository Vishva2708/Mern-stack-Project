import React, { useState } from "react";
import axios from "axios";
const AdminSlider = () => {
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
  });
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4500/slider/add", form);
    alert("Slider Added");

    setForm({
      image: "",
      title: "",
      subtitle: "",
    });
  };
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Add Slider</h2>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="image"
            placeholder="Image Url"
            value={form.image}
            className="form-control mb-4"
            onChange={handlechange}
          />
          <input
            type="text"
            name="title"
            placeholder="Slider Title"
            value={form.title}
            className="form-control mb-4"
            onChange={handlechange}
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Slider Subtitle"
            value={form.subtitle}
            className="form-control mb-4"
            onChange={handlechange}
          />
          <button className="btn btn-dark">Add Slider</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSlider;
