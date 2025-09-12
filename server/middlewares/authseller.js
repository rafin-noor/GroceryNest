import jwt from 'jsonwebtoken';

const authseller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.json({ success: false, message: 'Not Authorized' });
  }
  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecode.email === process.env.seller_email) {
      req.sellerId = process.env.seller_email;
      req.isSeller = true;   // add this
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authseller;
