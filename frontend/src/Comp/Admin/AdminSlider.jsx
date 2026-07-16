import { API_URL } from "../../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminSlider = () => {
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
  });
  const [imageError, setImageError] = useState("");
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const res = await axios.get(`${API_URL}/slider`);
    setSliders(res.data.sliders || []);
  };

  const handlechange = (e) => {
    if (e.target.name === "image") {
      setImageError("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkImageQuality = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setImageError("");

    try {
      const { width, height } = await checkImageQuality(form.image);

      if (width < 1400 || height < 550) {
        setImageError(
          `Image size ${width}x${height} che. Slider mate minimum 1400x550 high-quality image URL add karo.`
        );
        return;
      }
    } catch (error) {
      setImageError("Image URL load thato nathi. Direct valid image URL add karo.");
      return;
    }

    await axios.post(`${API_URL}/slider/add`, form);
    alert("Slider Added");

    setForm({
      image: "",
      title: "",
      subtitle: "",
    });
    getSliders();
  };

  const deleteSlider = async (id) => {
    await axios.delete(`${API_URL}/slider/delete/${id}`);
    getSliders();
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
          {imageError && <p className="text-danger mb-4">{imageError}</p>}
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

      <div className="card p-4 shadow mt-4">
        <h2 className="mb-4">Current Sliders</h2>
        {sliders.length === 0 ? (
          <p className="mb-0">No slider added.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sliders.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title || "Slider"}
                        style={{
                          width: "140px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.subtitle}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSlider(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSlider;
