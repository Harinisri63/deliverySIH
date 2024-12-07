const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
const users = [];
const orders = [];
const earnings = {
    today: 0,
    total: 0,
    completedOrders: 0,
};
app.post('/register', (req, res) => {
    const {
        username, age, address, aadharNo, drivingLicence, vehicleType, deliveryType,
        suitableLocation, emergencyContactNo, height, weight, bloodGroup,
        medicineHistory, medicalHistoryDescription, additionalNotes,
    } = req.body;
    const newUser = {
        id: users.length + 1,
        username, age, address, aadharNo, drivingLicence, vehicleType,
        deliveryType, suitableLocation, emergencyContactNo, height, weight,
        bloodGroup, medicineHistory, medicalHistoryDescription, additionalNotes,
    };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});
app.post('/order', (req, res) => {
    const { customerAddress, restaurantAddress, commission, orderId } = req.body;
    const newOrder = {
        id: orders.length + 1,
        customerAddress,
        restaurantAddress,
        commission,
        orderId,
    };
    orders.push(newOrder);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
});
app.get('/earnings', (req, res) => {
    res.status(200).json({
        "today'sEarnings": earnings.today,
        totalEarnings: earnings.total,
        ordersCompleted: earnings.completedOrders,
    });
});
app.post('/earnings', (req, res) => {
    const { today, completedOrders } = req.body;
    earnings.today += today;
    earnings.total += today;
    earnings.completedOrders += completedOrders;
    res.status(200).json({ message: 'Earnings updated successfully', earnings });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
