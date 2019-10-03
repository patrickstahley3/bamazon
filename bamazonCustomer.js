var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  itemsForSale();
});
function itemsForSale() {
  // query all products, display table
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "itemPicked",
        type: "number",
        message: "what is the item ID ?",


      }).then(function (answer) {
        // Grabs the entire object for the product the user chose
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name == answer.choice) {
            var chosenItem = res[i];
          }
        }
        var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);
        var pSales = parseFloat(chosenItem.product_sales).toFixed(2);

        // If customer wants to purchase more than available in stock, user will be asked if he wants to make another purchase
        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
          console.log(`${FgCyan} Insufficient quantity! ${FgWhite}`);
          repeat();
        }
        else {

          var Total = (parseFloat(answer.quantity) * chosenItem.price).toFixed(2);

          //console.log (parseFloat(Total) + parseFloat(pSales)).toFixed(2);
          var pTotal = (parseFloat(Total) + parseFloat(pSales)).toFixed(2);

          var query = connection.query("UPDATE Products SET ?, ? WHERE ?", [{ stock_quantity: updateStock }, { product_sales: pTotal }, { item_id: chosenItem.item_id }], function (err, res) {
            if (err) throw err;
            console.log(`${FgCyan} Purchase successful! ${FgWhite}`);
            console.log("Your total is $ " + FgGreen + Total);
            repeat();
          });
        }

      });

  }); // first connection.query of the database

} 

//Function used to make the experience of the CLI mode like a program. Provides an exit choice to the user.
function repeat() {
  inquirer.prompt({
    // Ask user if he wants to purchase another item
    name: "repurchase",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase == "Yes") {
      goShopping();
    }
    else {
      console.log(` Thanks for shopping with us. Have a great day! ${FgWhite}`)
      connection.end();
    }
  });
}

      

