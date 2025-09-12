import Address from '../models/address.js'

// Add Address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.userId;   // ✅ from middleware

        if (!address) {
            return res.json({ success: false, message: "Address details missing" });
        }

        await Address.create({ ...address, userId });
        res.json({ success: true, message: "Address Added" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;   //from middleware
        const addresses = await Address.find({ userId });

        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}





