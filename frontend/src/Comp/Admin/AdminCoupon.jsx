import React, { useEffect, useState } from "react";
import axios from "axios"
const AdminCoupon = () => {
  const [form, setForm] = useState({
    code: "",
    brand: "",
    expiry: "",
    discount: "",
  });
  const [coupons,setCoupons]=useState([])

  const getCoupons =async()=>{
    const res=await axios.get("http://localhost:4500/coupon")
    setCoupons(res.data.coupons)
  }
  useEffect(()=>{
    getCoupons()
  },[])
  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4500/coupon/add", {
      code:form.code.toUpperCase(),
      brand:form.brand,
      discount:form.discount,
      expiry:form.expiry
    });
    alert("Coupon Added Successfully")
    setForm({code:"",brand:"",discount:"",expiry:""});
    getCoupons()
  };
  const handlechange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  };
  return (
    <div className="contanier mb-4 mt-5 p-3">
      <h2>Add Brand Coupon</h2>
      <form className="mb-4" onSubmit={handlesubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="code"
          placeholder="Coupon Code"
          onChange={handlechange}
          value={form.code}
          required
        />

        <input
          className="form-control mb-3"
          type="text"
          name="brand"
          placeholder="Coupon Brand"
          onChange={handlechange}
          value={form.brand}
          required
        />

        <input
          className="form-control mb-3"
          type="number"
          name="discount"
          placeholder="Coupon Discount"
          onChange={handlechange}
          value={form.discount}
          required
        />

        <input
          className="form-control mb-3"
          type="date"
          name="expiry"
          placeholder="Coupon Expiry"
          onChange={handlechange}
          value={form.expiry}
          required
        />

        <button className="btn btn-dark">Add Coupon</button>
      </form>
      <hr/>
      {
        coupons.map((c)=>(
           <div
          key={c._id}
          className="border p-3 rounded mb-3"
        >
          <h5>{c.code}</h5>
          <h5>Brand:{c.brand}</h5>
          <h5>Discount:{c.discount}%</h5>
          <p>
            Expiry:
            {new Date(c.expiry).toLocaleDateString()}
          </p>
          </div>
        ))
      }
    </div>
  );
};

export default AdminCoupon;
