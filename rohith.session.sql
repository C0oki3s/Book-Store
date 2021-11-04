-- CREATE TABLE user_details(
--        id uuid DEFAULT uuid_generate_v4 (),
--        user_id INT NOT NULL,
--        street VARCHAR(150) NOT NULL,
--        pincode VARCHAR(8) NOT NULL,
--        city VARCHAR(20) NOT NULL,
--        state VARCHAR(30) NOT NULL,
--        phone_number VARCHAR(15) NOT NULL,
--        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id) ON DELETE CASCADE
-- )

-- CREATE TABLE orders(
--     id uuid DEFAULT uuid_generate_v4 (),
--     user_id INT NOT NULL,
--     book_id INT NOT NULL,
--     quantity INT NOT NULL,
--     price INT NOT NULL,
--     book_image VARCHAR(150) NOT NULL,
--     book_name VARCHAR(100) NOT NULL,
--     CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id) ON DELETE NO ACTION,
--     CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE NO ACTION 
-- )


-- CREATE TABLE books(
--     id SERIAL PRIMARY KEY,
--     author VARCHAR(100) NOT NULL,
--     price INT NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     description VARCHAR(300),
--     book_image VARCHAR(200)
-- )

-- DROP TABLE books;