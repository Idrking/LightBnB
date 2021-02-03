SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
FROM properties
JOIN reservations ON reservations.property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
JOIN users ON reservations.guest_id = users.id
WHERE now()::date > end_date
AND users.id = 1
GROUP BY properties.id, reservations.id
ORDER BY start_date
LIMIT 10;
