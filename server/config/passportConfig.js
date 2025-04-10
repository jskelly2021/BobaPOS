// server/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database'); // Adjust path as needed
require('dotenv').config();

// Configure Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'employee_name',
      passwordField: 'passwords', 
    },
    async (employee_name, passwords, done) => {
      try {
        // Query the database for an employee with the given name
        const result = await pool.query(
          'SELECT * FROM employee WHERE employee_name = $1',
          [employee_name]
        );
        if (result.rows.length === 0) {
            console.log('No employee found with that name.');
          return done(null, false, { message: 'No employee found with that name.' });
        }
        const employee = result.rows[0];

        // Check if the provided password matches the password stored in the database
        if (passwords !== employee.passwords) {
            console.log('Incorrect password.');
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If everything is fine, return the employee object
        return done(null, employee);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize the user by their unique employee_id
passport.serializeUser((employee, done) => {
  done(null, employee.employee_id);
});

// Deserialize the user: retrieve employee data by employee_id from the database
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employee WHERE employee_id = $1',
      [id]
    );
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
