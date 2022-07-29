// 1) How to make manager and how to establish manager relationship to employees?
// 2) How to wring long queries into 1 long line?
// 3) Leah said to put queries inside a function, how would that look lie?
// 4) Do we nned to use Node and index.js or Express and server.js? How would a query woul look like in index.js format?
// 5) How to use console.table npm module to show nice table in node?

// Example:
app.get('/api/employees', (req, res) => {
    const sql = `SELECT department.department_name AS Department, department.id AS ID FROM department;`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });