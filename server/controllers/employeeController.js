import pool from '../config/database.js';

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getAllIngredients', err);
        res.status(500).json("Server Error");
    }
}

//Get employee based on ID
export const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM employee WHERE employee_id=$1', [id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getEmployee', err);
        res.status(500).json("Server Error");
    }
}

//Delete employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM employee WHERE employee_id=$1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error deleteEmployee', err);
        res.status(500).json("Server Error");
    }
}

// Create a new employee
export const createEmployee = async (req, res) => {
    try {
      const { employee_name, position, passwords } = req.body;
  
      const result = await pool.query(
        "INSERT INTO employee (employee_name, position, passwords) VALUES ($1, $2, $3) RETURNING *",
        [employee_name, position, passwords]
      );
  
      // 3. Return the newly created row (often the first element in result.rows)
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error createEmployee:", err);
      res.status(500).json("Server Error");
    }
  }
  
//update employee
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { employee_name, position, passwords } = req.body;
    try {
        const result = await pool.query('UPDATE employee SET employee_name=$1, position=$2, passwords=$3 WHERE employee_id=$4 RETURNING *',
             [employee_name, position, passwords, id]);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error updateEmployee', err);
        res.status(500).json("Server Error");
    }
}