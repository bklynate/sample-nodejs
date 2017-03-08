# Shop (Product List) Server Code Documentation

* Project uses Express, and MYSQL as Server Backend.
* Project uses sequelize for DB connection
* Project set up for sequelize-cli as well as normal code based migration (for first start)
* Project uses /config , /migrations , /models , /seeders for sequelize-cli
* Project uses /app for server code (uses mysql for create DB - Automated)

## Usage

### Create shop
** URL: `localhost:9001/shop`
** Method: POST
** Headers: `'content-type':'application/json'`
** Sample Request Body: 
`{
"shop_name": "tests",
"db_name": "tests"
}`

### Create Product
** URL: `localhost:9001/shop/::shopId/product`
** Method: POST
** Headers: `'content-type':'application/json'`
** Sample Request Body: 
`{
"category": "electronics",
"product": "iPhone",
"discount": 455,
"price": 35
}`

### Get Products of a shop
** URL: `localhost:9001/shop/1/products`
** Method: GET
** Headers: `'content-type':'application/json'`
** Sample Request Body: 
`Not Applicable`

### Update Product details of shop
** URL: `localhost:9001/shop/::shopId/product/::productId`

** Method: PUT

** Headers: `'content-type':'application/json'`

** Sample Request Body: 
`{
"category": "alternate medicine",
"product": "Aloe Vera",
"discount": 25,
"price": 75
}`

### Delete Product of shop
** URL: `localhost:9001/shop/::shopId/product/::productId`
** Method: DELETE
** Headers: `'content-type':'application/json'`
** Sample Request Body: 
`Not Applicable`