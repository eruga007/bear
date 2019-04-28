var express = require("express");
var cors = require("cors")
var app = express();
app.use(cors())
var router = express.Router();
var _ = require('lodash');
var bodyParser = require("body-parser");
var bears = [];


bears = [{
  id: 1,
  name: "JJ"
},
{
  id: 2,
  name: 'Poon'
},
{
  id: 3,
  name: 'Tor'
},
{
  id: 4,
  name: 'Keng'
}]

var id_bear = bears.length + 1
var count = 0
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  count++;
  console.log('count wow',count)
  next();
}


app.use(allowCrossDomain);
router
  .route("/bears")
  .post((req, res) => {
    var bear = {};
    bear.name = req.body.name;
    let new_value = {
        id: id_bear++,
        name: bear.name
    }
    bears.push(new_value);
    res.json({ message: "Bear created!" });
  })
  .get((req, res) => {
    res.json(bears);
  });

router
  .route("/bears/:id")
  .get((req, res) => {
    let bear_filter  = {}
    bear_filter = _.filter(bears,it =>  req.params.id == it.id )
    res.json(bear_filter);
  })
  .delete((req, res) => {
    bears = _.filter(bears,it => it.id != req.params.id)
    res.json(bears);
  }) 

app.use("/api", bodyParser.json(), router);
app.listen(8000);
console.log("listen port 8000");
