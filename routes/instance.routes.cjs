const express = require('express');                                                                                                                                   
const router = express.Router();                                                                                                                                      
const { db, getInstanceData } = require('../db.cjs');                                                                                                                 
                                                                                                                                                                      
const requireSuperAdmin = (req, res, next) => {                                                                                                                       
    if (req.session.isAuthenticated && req.session.user.isSuperAdmin) { next(); }                                                                                     
    else { res.status(403).json({ message: 'Forbidden: Super admin access required' }); }                                                                             
};                                                                                                                                                                    
                                                                                                                                                                      
router.get('/instances', requireSuperAdmin, async (req, res) => {                                                                                                     
    await db.read();                                                                                                                                                  
    res.json(Object.keys(db.data.instances).map(id => ({ id, name: db.data.instances[id].name })));                                                                   
});                                                                                                                                                                   
                                                                                                                                                                      
router.post('/instances', requireSuperAdmin, async (req, res) => {                                                                                                    
    const { id, name } = req.body;                                                                                                                                    
    if (!id || !name) {                                                                                                                                               
        return res.status(400).json({ message: 'Instance ID and name are required.' });                                                                               
    }                                                                                                                                                                 
    await db.read();                                                                                                                                                  
    if (db.data.instances[id]) {                                                                                                                                      
        return res.status(409).json({ message: 'Instance with this ID already exists.' });                                                                            
    }                                                                                                                                                                 
    const instanceData = getInstanceData(id);                                                                                                                         
    instanceData.name = name;                                                                                                                                         
    await db.write();                                                                                                                                                 
    res.status(201).json({ id, name });                                                                                                                               
});                                                                                                                                                                   
                                                                                                                                                                      
router.get('/instances/:instanceId/stats', requireSuperAdmin, async (req, res) => {
    await db.read();
    const instanceData = getInstanceData(req.params.instanceId);
    const stats = {
        appointments: instanceData.appointments.length,
        coupons: instanceData.coupons.length,
    };
    res.json(stats);
});

router.get('/instances/:instanceId', async (req, res) => {
    await db.read();
    const instance = db.data.instances[req.params.instanceId];
    if (instance) {
        res.json({ id: req.params.instanceId, name: instance.name });
    } else {
        res.status(404).json({ message: 'Instance not found' });
    }
});

module.exports = router;
