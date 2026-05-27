const Coupon = require("../modal/Coupon");

const addcoupon = async (req, res) => {
  const newcoupon = await Coupon.create(req.body);
  res.json({ message: "Successfully added coupon", coupon: newcoupon });
};
const getcoupon = async (req, res) => {
  const coupons = await Coupon.find();
  res.json({ success: true, coupons });
};
const applycoupon = async (req, res) => {
  const { code, cartItems } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
  return   res.json({ message: "Invalid coupons", success: false });
  }
  if (new Date() > new Date(coupon.expiry)) {
    return res.json({ success: false, message: "Coupon Expired" });
  }
  const matcheditem = cartItems.filter(
    (itm) => itm.brand.toLowerCase() === coupon.brand.toLowerCase(),
  );

  if (matcheditem.length === 0) {
    return res.json({
      success: false,
      message: `No ${coupon.brand} Products added in Cart`,
    });
  }
  let brandtotal = 0;
  matcheditem.forEach((item) => {
    brandtotal += Number(item.price) * Number(item.qty || 1);
  });
  const discountAmount = (brandtotal * coupon.discount) / 100;

  res.json({
    success: true,
    discountpercent: coupon.discount,
    discountAmount,
    brand: coupon.brand,
    message: `${coupon.discount}% OFF on ${coupon.brand}`,
  });
};
module.exports = { addcoupon, getcoupon, applycoupon };
