-- CREATE TABLE orders(
--     id uuid DEFAULT uuid_generate_v4 (),
--     user_id INT NOT NULL,
--     book_id INT NOT NULL,
--     quantity INT NOT NULL,
--     price INT NOT NULL,
--     book_image VARCHAR(350) NOT NULL,
--     book_name VARCHAR(100) NOT NULL,
--     CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_auth (id) ON DELETE SET NULL,
--     CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE SET NULL 
-- )


-- CREATE TABLE books(
--     id SERIAL PRIMARY KEY,
--     author VARCHAR(180) NOT NULL,
--     price INT NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     description VARCHAR(300),
--     book_image VARCHAR(200)
-- )


-- CREATE TABLE user_auth(
    -- id SERIAL PRIMARY KEY,
--     username VARCHAR(100) NOT NULL,
--     email VARCHAR(150) NOT NULL,
--     password VARCHAR(200) NOT NULL
-- )



-- CREATE TABLE books(
--     id uuid DEFAULT uuid_generate_v4 (),
--     author VARCHAR(180) NOT NULL,
--     instock INT NOT NULL,
--     currentstock INT NOT NULL,
--     price INT NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     description VARCHAR(300),
--     book_image VARCHAR(200),
--     PRIMARY KEY(id)
-- )