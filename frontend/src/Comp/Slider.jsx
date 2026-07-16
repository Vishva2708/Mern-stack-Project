import { API_URL } from "../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    getslider();

    const intervalId = setInterval(() => {
      getslider(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getslider = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
      const res = await axios.get(`${API_URL}/slider`);
      setSlider(res.data.sliders || []);
    } catch (error) {
      console.error("Slider load failed", error);
      setSlider([]);
    } finally {
      setLoading(false);
    }
  };
  const handlesubmit = async () => {
    navigate("/categories");
  };

  if (loading) {
    return null;
  }

  if (!slider.length) {
    return null;
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
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={item._id}
              style={{
                height: "calc(100vh - 80px)",
                minHeight: "620px",
                maxHeight: "760px",
              }}
            >
              <img
                src={item.image}
                className="d-block w-100"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                style={{
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                alt={item.title || "Slider"}
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

        {slider.length > 1 && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
