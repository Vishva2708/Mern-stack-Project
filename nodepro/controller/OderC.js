const Order = require("../modal/Order");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  await newOrder.save();

  res.json({
    message: "Order Placed Successfully",
    order: newOrder,
  });
};

const getOrders = async (req, res) => {
  const orders = await Order.find().sort({
    createdAt: -1,
  });

  res.json(orders);
};
const salesSummary = async (req, res) => {
  const orders = await Order.find();

  let totalRevenue = 0;
  let totalProductsSold = 0;

  let productDetails = [];

  orders.forEach((order) => {
    totalRevenue += order.totalAmount;

    order.products.forEach((item) => {
      totalProductsSold += item.qty;

      productDetails.push({
        title: item.title,
        qty: item.qty,
        price: item.price,
      });
    });
  });

  res.json({
    totalOrders: orders.length,
    totalRevenue,
    totalProductsSold,
    productDetails,
  });
};

module.exports = {
  createOrder,
  getOrders,
  salesSummary,
};