import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Products = () => {
 const [state,setState] = useState([])
 const navigate=useNavigate()
 useEffect(() => {
  fetch("http://localhost:4500/products/api")
    .then((res) => res.json())
    .then((data) => setState(data))
    .catch((err) => console.log(err));
}, []);
 const handlelogic=()=>{
  navigate("/categories")
 }
  return (
    <>
      <div className="container mt-5 p-4">
        <div className="row p-4 g-4">
          <div className="d-flex justify-content-between">
            <div>
              <h5 style={{ color: "#BD844C" }}>Product Collection</h5>
              <h1>Discover our products</h1>
            </div>

            <div className="d-flex align-items-center gap-2 p-2">
              <button className="btn btn-light fw-semibold shadow-sm px-4 py-2" onClick={handlelogic}>
                Shop All Products
              <i className="fa-solid fa-arrow-right ms-4 fs-5"></i>
              </button>
            </div>
          </div>
         { Array.isArray(state) && state.map((el)=>(
            <div className="col-lg-3">
              <div class="card border-0 position-relative">
                <img
                 src={`http://localhost:4500/${el.image}`}
                  className="img-fluid"
                  alt={el.title}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "420px",
                    left: "60px",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <h4>{el.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-3">
        <div className="row g-1">
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="feature-card text-center border p-5 d-flex flex-column">
              <img
                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatured-1.3612cfda.png&w=640&q=75"
                className="img-fluid mb-4"
                style={{width:"100%"}}
                alt=""
              />
              <h5 className="fw-normal mb-2">
                Matte Liquid Lipstick & Lip Liner
              </h5>
              <p>
                Molestias internos et commodi tempora dolores sapiente sed iste.
              </p>
              <div className="mt-auto">
                <span className="text-warning fw-medium">Save $70</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex">
            <div className="feature-card text-center border p-4 w-100 d-flex flex-column">
              <img
                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatured-2.bcd42101.png&w=384&q=75"
                className="img-fluid mb-4"
                style={{ height: "220px", objectFit: "contain" }}
                alt=""
              />
              <h5 className="fw-normal mb-2">
                Crushed Liquid Lip - Cherry Crush
              </h5>
              <p>
                Molestias internos et commodi tempora dolores sapiente sed iste.
              </p>
              <div className="mt-auto">
                <span className="text-warning fw-medium">Save $98</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex">
            <div className="feature-card text-center border p-4 w-100 d-flex flex-column">
              <img
                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeatured-3.33d6be88.png&w=384&q=75"
                className="img-fluid mb-4"
                style={{ height: "220px", objectFit: "contain" }}
                alt=""
              />
              <h5 className="fw-normal mb-2">
                Mega Waterproof Concealer - 125 Bisque
              </h5>
              <p>
                Molestias internos et commodi tempora dolores sapiente sed iste.
              </p>
              <div className="mt-auto">
                <span className="text-warning fw-medium">Save $199</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
