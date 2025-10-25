const express = require('express');
const router = express.Router();
const { db, getInstanceData } = require('../db.cjs');

const requireAuth = (req, res, next) => {
    if (req.session.isAuthenticated) { next(); }
    else { res.status(401).json({ message: 'Authentication required' }); }
};
                                                                                                                                                                      
const requireSuperAdmin = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user.isSuperAdmin) { next(); }                                                                                     
    else { res.status(403).json({ message: 'Forbidden: Super admin access required' }); }                                                                             
};                                                                                                                                                                    
                                                                                                                                                                      
router.get('/instances', requireSuperAdmin, async (req, res) => {                                                                                                     
    await db.read();                                                                                                                                                  
    res.json(Object.keys(db.data.instances).map(id => ({ id, name: db.data.instances[id].name })));                                                                   
});                                                                                                                                                                   
                                                                                                                                                                      
router.post('/instances', requireAuth, async (req, res) => {
    const { name, phoneNumber } = req.body;
    const userId = req.session.user.id;
    const username = req.session.user.name;

    if (!name || !phoneNumber) {
        return res.status(400).json({ message: 'Instance name and phone number are required.' });
    }
    await db.read();
    if (db.data.instances[username]) {
        return res.status(409).json({ message: 'Instance for this user already exists.' });
    }
    const instanceData = await getInstanceData(username, username);
    instanceData.name = name;
    instanceData.phoneNumber = phoneNumber;
    instanceData.userId = userId;
    await db.write();

    const adminUser = instanceData.admins[0];
    const messageBody = `Welcome to the platform! Your new instance "${name}" has been created. You can log in with the following credentials:\nUsername: ${adminUser.username}\nPassword: ${adminUser.password}`;

    res.status(201).json({ id: username, name });
});                                                                                                                                                                   
                                                                                                                                                                      
router.get('/instances/:username/stats', requireSuperAdmin, async (req, res) => {
    await db.read();
    const instanceData = getInstanceData(req.params.username);
    const stats = {
        appointments: instanceData.appointments.length,
        coupons: instanceData.coupons.length,
    };
    res.json(stats);
});

router.get('/instances/:username', async (req, res) => {
    await db.read();
    const instance = db.data.instances[req.params.username];
    if (instance) {
        res.json({ id: req.params.username, name: instance.name });
    } else {
        res.status(404).json({ message: 'Instance not found' });
    }
});

module.exports = router;
