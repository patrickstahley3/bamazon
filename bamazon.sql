DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

select * from products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Resident Evil 2", "Video Games", 49.95, 150),
 ("DOOM", "Video Games", 59.99, 200),
 ("Crate of MRE's", "Food and Drink", 24.50, 50),
 ("Cool Shades", "Apparel", 75.00, 5),
 ("Worn Denim Jeans", "Apparel", 54.25, 35),
 ("Survival Towel", "Necessities", 42.42, 42),
 ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
 ("That Awkward Moment", "Films", 25.50, 57),
 ("Monopoly", "Board Games", 30.50, 35),
 ("Clue", "Board Games", 19.95, 23)