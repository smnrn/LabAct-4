const db = require('../config/db');


exports.usersWithRoles = (req, res) => {
  const sql = `SELECT u.id, u.email, r.role_name 
FROM users u
INNER JOIN user_roles ur ON ur.user_id = u.id 
INNER JOIN roles r ON r.id = ur.role_id 
ORDER BY u.id, r.role_name `;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err); // Add logging
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};



exports.usersWithProfiles = (req, res) => {
  const sql = `SELECT u.id, u.email, p.phone, p.city, p.country 
FROM users u 
LEFT JOIN profiles p ON p.user_id = u.id
ORDER BY u.id `;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};


exports.rolesRightJoin = (req, res) => {
  const sql = `SELECT  r.role_name, u.id AS user_id, u.email 
FROM users u
RIGHT JOIN user_roles ur ON ur.user_id = u.id 
RIGHT JOIN roles r ON r.id = ur.role_id 
ORDER BY r.role_name, user_id `;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};


exports.profilesFullOuter = (req, res) => {
  const sql = `SELECT u.id AS user_id, u.email, p.id AS profile_id
   FROM users u
   LEFT JOIN profiles p ON p.user_id = u.id
UNION
   SELECT u.id AS user_id, u.email, p.id AS profile_id
   FROM users u
   RIGHT JOIN profiles p ON p.user_id = u.id
ORDER BY user_id`;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};


exports.userRoleCombos = (req, res) => {
  const sql = `SELECT u.id AS user_id, u.email, r.role_name
FROM users u 
CROSS JOIN roles r 
ORDER BY u.id, r.role_name`;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};


exports.referrals = (req, res) => {
  const sql = `SELECT ref.referrer_user_id, u1.email AS referrer_email,
          ref.referred_user_id, u2.email AS referred_email, ref.referred_at 
FROM referrals ref 
INNER JOIN users u1 ON u1.id = ref.referrer_user_id 
INNER JOIN users u2 ON u2.id = ref.referred_user_id 
ORDER BY ref.referred_at DESC `;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};


exports.latestLogin = (req, res) => {
  const sql = `SELECT u.id, u.email, la.ip_address, la.occurred_at FROM users u LEFT JOIN login_audit la ON la.user_id = u.id ORDER BY u.id`;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(rows);
  });
};

exports.showUsers = (req, res) => {
  console.log('showUsers endpoint called'); // Add this debug line
  
  db.query('SELECT * FROM user_roles', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    console.log('Query result:', rows); // Add this debug line
    res.json({ users_data: rows });
  });
};

// Add a test function for database connection
exports.dbTest = (req, res) => {
  db.query('SELECT 1 as test', [], (err, rows) => {
    if (err) {
      console.error('DB test failed:', err);
      return res.status(500).json({ error: 'DB connection failed', details: err.message });
    }
    res.json({ message: 'DB connection OK', result: rows });
  });
};