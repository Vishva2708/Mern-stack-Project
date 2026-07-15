import { API_URL } from "../../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    status: "",
  });

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/collections/api`);

    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setEdit(null);

    setShow(false);

    setForm({
      title: "",
      brand: "",
      category: "",
      price: "",
      status: "",
      description: "",
    });

    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("brand", form.brand);
    formData.append("category", form.category);
    formData.append("status", form.status);
    formData.append("price", form.price);
    formData.append("description", form.description);

    if (image) {
      formData.append("image", image);
    }

    if (edit) {
      await axios.put(
        `${API_URL}/collections/update/${edit}`,
        formData,
      );

      alert("Product Updated");
    } else {
      await axios.post(`${API_URL}/collections/collect`, formData);

      alert("Product Added");
    }
    getProducts();
    handleClose();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/collections/delete/${id}`);

    alert("Product Deleted");

    getProducts();
  };
  const editProduct = (itm) => {
    setEdit(itm._id);

    setForm({
      title: itm.title,
      brand: itm.brand,
      category: itm.category,
      status: itm.status,
      price: itm.price,
      description: itm.description,
    });

    setShow(true);
  };

  return (
    <div
      className="container-fluid py-2 px-2 px-md-4"
      style={{
        background: "#f4f7fe",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2
            className="fw-bold"
            style={{
              fontSize: "32px",
            }}
          >
            Inventory Management
          </h2>

          <p className="text-muted">Manage and update your products</p>
        </div>

        <Button
          onClick={handleShow}
          style={{
            background: "#4f46e5",
            border: "none",
            padding: "10px 22px",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          + Add New Product
        </Button>
      </div>

      <div
        className="table-responsive"
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Table hover className="align-middle">
          <thead>
            <tr
              style={{
                background: "#111827",
                color: "#fff",
              }}
            >
              <th className="py-3">Image</th>

              <th>Product Name</th>

              <th>Brand</th>

              <th>Category</th>
              <th>Status</th>

              <th>Price</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((itm) => (
                <tr key={itm._id}>
                  <td>
                    <img
                      src={`${API_URL}/upload/${itm.image}`}
                      alt=""
                      className="img-fluid"
                      style={{
                        width: "75px",
                        height: "75px",
                        objectFit: "cover",
                        borderRadius: "14px",
                        border: "2px solid #eee",
                      }}
                    />
                  </td>

                  <td>
                    <h6 className="fw-bold mb-1">{itm.title}</h6>

                    <small className="text-muted">
                      ID: {itm._id.slice(0, 8)}
                    </small>
                  </td>

                  <td>
                    <span
                      style={{
                        background: "#eef2ff",
                        color: "#4338ca",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {itm.brand}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        background: "#ecfeff",
                        color: "#0891b2",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {itm.category}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#f4fcfc",
                        color: "#b2087c",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {itm.status}
                    </span>
                  </td>

                  <td>
                    <h6
                      className="fw-bold"
                      style={{
                        color: "#16a34a",
                      }}
                    >
                      $ {itm.price}
                    </h6>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        style={{
                          borderRadius: "10px",
                          padding: "6px 16px",
                        }}
                        onClick={() => editProduct(itm)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        style={{
                          borderRadius: "10px",
                          padding: "6px 16px",
                        }}
                        onClick={() => deleteProduct(itm._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <h5>No Products Found</h5>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {edit ? "Update Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>

              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Product Name"
                value={form.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>

              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter Brand"
                value={form.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>

              <Form.Control
                type="text"
                name="category"
                placeholder="Enter Category"
                value={form.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>

              <Form.Control
                type="text"
                name="status"
                placeholder="Enter Status"
                value={form.status}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>

              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={form.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter Description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Product Image</Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

              <Button
                type="submit"
                style={{
                  background: "#4f46e5",
                  border: "none",
                }}
              >
                {edit ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
