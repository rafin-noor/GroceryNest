import jwt from 'jsonwebtoken';

//Login Seller: /api/seller/login

export const sellerlogin = async (req,res)=>{
    try {
       const {email,password} = req.body;
        if (password === process.env.seller_password && email === process.env.seller_email){
            
            const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'7d'})
            
            res.cookie('sellerToken', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.json({ success: ture, message: 'Logged In Succefully' });

        }else{
          return res.json({ success: false, message: "Invalid Email or Password"});
        }
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message:error.message});
        
    }

}

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// logout seller-/api/seller/logout

export const sellerlogout = async (req, res) => {
    try {
        res.clearCookie('sellertoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};