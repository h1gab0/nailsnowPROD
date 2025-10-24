const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const fs = require('fs');

const defaultData = {
  users: [],
  instances: {
    "default": {
      name: "Nail Scheduler Default",
      admins: [{ username: 'admin', password: 'password' }],
      coupons: [
        { code: 'SAVE10', discount: 10, usesLeft: 10, expiresAt: '2025-12-31' }
      ],
      appointments: [],
      availability: {
        "2025-10-20": { "isAvailable": true, "availableSlots": { "10:00": true, "11:00": true, "14:00": true } },
        "2025-10-21": { "isAvailable": true, "availableSlots": { "10:00": true, "11:00": true, "14:00": true, "15:00": true } },
        "2025-10-22": { "isAvailable": true, "availableSlots": { "09:00": true, "10:00": true } }
      }
    }
  }
};

const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

const initDb = async () => {
    const dbExists = fs.existsSync('db.json');

    try {
        await db.read();
    } catch (e) {
        console.log("Could not read db.json, likely because it is empty or corrupt. Initializing with default data.");
        db.data = null;
    }

    if (!db.data || !dbExists) {
        db.data = defaultData;
        await db.write();
    }
};                                       

const getInstanceData = async (instanceId, username = 'admin') => {
    await db.read();
    if (!db.data.instances[instanceId]) {
        db.data.instances[instanceId] = {
            name: `${username}'s Scheduler`,
            phoneNumber: '',
            admins: [{ username: username, password: 'password' }],
            coupons: [],
            appointments: [],
            availability: {}
        };
        await db.write();
    }
    return db.data.instances[instanceId];
};

module.exports = { db, getInstanceData, initDb };
