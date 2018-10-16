API reference


/all : retrieve all data in the database

/material/type : retrieve all orders of material "type"

/location/zip : retrieve all orders from zipcode zip

/date/yearmonthdate : retrieve all orders from a specific date (ex 20181016 = October 16th 2018)

/date/from_ymd/to_ymd : retrieve all orders from a date range between from_ymd and to_ymd (ex 20181001/20181016 gives all orders submitted in october of 2018 as of writing this).

/amount/lower/upper : retrieve all orders with an amount between lower and upper
(8/8 will give you all orders with amount equal to 8, 0/100 will give you all orders with amount between 0 and 100)

(#TODO this api will need to be updated in the future. Firebase wont allow filtering data on multiple attributes. I will switch this api over to mongoDB in the future, but the API calls will stay relativly the same.)

@Olivia Sorry this is a mess. If you get some basic stuff implemented on the web app side (showing graphs of total amount of material processed by type or date range for example) then I will smooth things over when I make the switch to mongo

