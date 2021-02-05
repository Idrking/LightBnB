const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [email])
  .then(res => res.rows[0] ? res.rows[0] : null)
  .catch(err => console.error('Database Error', err.trace))
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0] ? res.rows[0] : null)
  .catch(err => console.error('Database Error', err.trace));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => console.error('Database Error', err.trace));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
    SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date > now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `, [guest_id, limit])
  .then(res => {
    return res.rows;
  })
  .catch(err => { console.error, err.trace});
}
exports.getAllReservations = getAllReservations;

/// Properties

const addAndOrWhere = (paramList) => paramList.length > 0 ? `AND` : `WHERE`;

const adjustQuery = (option, paramList, queryAddition ) => {
  if (option) {
    let query = addAndOrWhere(paramList);
    paramList.push(option);
    query += queryAddition;
    return query;
  }
  return '';
}


/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  queryString += adjustQuery((options.city ? `%${options.city}%` : undefined), queryParams, ` city ILIKE $${queryParams.length + 1}`);
  queryString += adjustQuery(options.owner_id, queryParams, ` owner_id = $${queryParams.length + 1}`);
  queryString += adjustQuery(options.minimum_price_per_night, queryParams, ` cost_per_night >= $${queryParams.length + 1}`);
  queryString += adjustQuery(options.maximum_price_per_night, queryParams, ` cost_per_night <= $${queryParams.length + 1}`);
  
  queryString += `
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

 
  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('Error retrieving data', err.message));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  queryParams = [];
  queryString = `INSERT INTO properties(`
  for (keys in property) {
    queryParams.push(property[keys]);
    queryString += `${keys}, `;
  }

  queryString += `active ) VALUES (`;
  queryParams.push(true);
  for (let i = 0; i < queryParams.length; i++) {
    queryString +=` $${i + 1}`;
    if (i !== queryParams.length - 1) {
      queryString += `,`
    }
  }
  queryString += `)
  RETURNING *;`
  console.log(queryString);
  return pool.query(queryString, queryParams)
  .then(res => {
    console.log(res.rows[0]);
    return res.rows[0];
  })
  .catch(err => console.error('Invalid data provided', err.message));
}
exports.addProperty = addProperty;


const addReservation = function(reservation) {
  queryParams = [reservation.startDate, reservation.endDate, reservation.title, reservation.userId];
  console.log(reservation);
  queryString = `
  INSERT INTO reservations(start_date, end_date, property_id, guest_id)
  VALUES ($1, $2, (
    SELECT properties.id
    FROM properties
    WHERE title = $3
  ), $4)
  RETURNING *;
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('Database returned error:', err.message))
};

exports.addReservation = addReservation;
