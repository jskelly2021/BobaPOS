import pool from '../config/database.js';

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getAllItems', err);
        res.status(500).json("Server Error" );
    }
}

//Get employee based on ID
export const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM employee WHERE employee_id=$1', [id]);
        res.status(200).json(result.rows[0]);
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
export const createEmployee = async (req, res) => 
    {
        try {
        const { employee_name, position, passwords } = req.body;
    
        // Get the next available ID from the employee_id sequence.
        // The sequence name is typically <table>_<column>_seq.
        const seqResult = await pool.query("SELECT MAX (employee_id) as new_id FROM employee");
        const newId = Number(seqResult.rows[0].new_id) + 1;
        console.log("New ID:", newId);
    
        // Insert the new employee record using the manually-assigned ID.
        const result = await pool.query(
            "INSERT INTO employee (employee_id, employee_name, position, passwords) VALUES ($1, $2, $3, $4) RETURNING *",
            [newId, employee_name, position, passwords]
        );
    
        res.status(201).json(result.rows[0]);
        } catch (err) {
        console.error("Error creating employee:", err);
        res.status(500).json("Server Error");
        }
  };
  
  
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