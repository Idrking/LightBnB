INSERT INTO users(name, email, password)
VALUES ('Raunchy Randall Rimmingboy', 'sweetmilk@yahoo.gov', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Loose Floor Ham', 'heathhazard@google.edu', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cherished Matthew', 'rightatthebottom@thecoalmine.uk', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Base Human', 'generic@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'RR''S Ribald Retreat', 'A nice place for bois', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinyrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 42, 2, 16, 1, 'Canada', '123 Hambone Rd.', 'Jacksonville', 'Saskatchewan', 'V00 100', true),
(2, 'Definite Salmonella Stain', 'Do not lick it', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinyrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 1, 0, 0, 0, 'Canada', '001 Shag Carpet Ave.', 'Livingroom', 'Alberta', 'V00 101', true),
(3, 'Coal Mine Basement', 'At least it is warmer than the workhouse', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinyrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 20, 1, 1, 1, 'Victorian UK', '24th East Derbyshire', 'Queensbonnet', 'Williamson', '000 000', true),
(4, 'A house', 'It has features', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinyrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 100, 2, 2, 2, 'Canada', '1234 Road Rd.', 'Yes', 'Yes', 'V00 000', true);


INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 1, 4),
('2014-10-21', '2014-10-21', 3, 1);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 3, 'Whipped and forced to shovel coal, otherwise good'),
(1, 4, 3, 5, 'Yes all the house was there'),
(2, 2, 2, 1, 'Hospitalized'),
(3, 1, 4, 4, 'Had a great time. Bought a timeshare at literal gunpoint. Send help');