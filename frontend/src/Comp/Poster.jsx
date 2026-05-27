import React from "react";

const Poster = () => {
  return (
    <div>
      <div className="container">
        <div className="row p-5">
          <div className="col-lg-8 col-md-6 position-relative">
            <img
              src="https://shofy-client.vercel.app/_next/static/media/collection-1.a3292fae.jpg"
              className="img-fluid"
              style={{ width: "100%", objectFit: "cover", height: "600px" }}
              alt=""
            />
            <div className="content" style={{position:"absolute",top:"50px",left:"100px"}}>
              <h5>Cosmetics Collection</h5>
              <h1 className="mt-3">Foundation and <br></br> powder brush</h1>
              <button className="btn btn-light mt-3 fw-semibold shadow-sm px-4 py-2">
                Discover Now
                <i className="fa-solid fa-arrow-right ms-4 fs-5"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 position-relative">
            <img
              src="https://shofy-client.vercel.app/_next/static/media/collection-2.dcbff2c9.jpg"
              className="img-fluid"
              style={{ width: "100%", objectFit: "cover", height: "600px" }}
              alt=""
            />
             <div className="content1 text-light" style={{position:"absolute",bottom:"50px",left:"40px"}}>
              <h1 className="mt-3">TOPS <br></br> BLOUSE SHIRTS</h1>
              <h5 className="mt-4">SHOP COLLECTION</h5>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
