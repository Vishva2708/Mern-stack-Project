import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Slider = () => {
  const [slider, setSlider] = useState([]);

  const navigate=useNavigate()
  useEffect(() => {
    getslider();
  }, []);

  const getslider = async () => {
    const res = await axios.get("http://localhost:4500/slider");
    setSlider(res.data.sliders || []);
  };
  const handlesubmit=async()=>{
    navigate("/categories")
  }

  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {slider.map((item, index) => (
            <div
              className={`carousel-item ${
                index === 0 ? "active" : ""
              }`}
              key={item._id}
            >
              <img
                src={item.image}
                className="d-block w-100"
                style={{
                  height: "720px",
                  objectFit: "cover",
                  filter: "brightness(70%)",
                }}
                alt=""
              />

              <div
                className="carousel-caption d-flex flex-column justify-content-center align-items-start text-start"
                style={{
                  top: "0",
                  bottom: "0",
                  left: "10%",
                  right: "auto",
                  width: "45%",
                }}
              >
                <h3
                  style={{
                    fontFamily: "cursive",
                    fontSize: "40px",
                    color: "#fff",
                  }}
                >
                  {item.subtitle}
                </h3>

                <h1
                  className="fw-light text-white"
                  style={{
                    fontSize: "90px",
                    lineHeight: "1",
                  }}
                >
                  {item.title}
                </h1>

                <div className="d-flex gap-4 mt-4 text-white">
                  <div className="pe-3 border-end">
                    <h5>High-end</h5>
                    <p>Cosmetics</p>
                  </div>

                  <div className="pe-3 border-end">
                    <h5>Vegan</h5>
                    <p>Product</p>
                  </div>

                  <div>
                    <h5>Express</h5>
                    <p>Make-up</p>
                  </div>
                </div>

                <button
                  className="btn btn-outline-light mt-4 px-4 py-3 rounded-0"
                  onClick={handlesubmit}
                >
                  Discover Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Slider;