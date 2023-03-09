const app = require('express')();
const http = require('http').Server(app);
const port = 3000;
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rdugas_foudeseries",
  port: "3307"
 });

db.connect(function(err) {
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
 });

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/page2', (req, res) => {
  res.send('yo');
});

app.get('/series', async (req,res) => {
  try {
    db.query("SELECT * FROM serie",function (err, result) {
      res.status(200).json(result)
    });
  } catch (err) {
    console.log(err)
    throw err
  }
})

app.get('/series/:id', async (req,res) => {
  const id = parseInt(req.params.id)
  try {
    db.query("SELECT * FROM serie where id="+id,function (err, result) {
      res.status(200).json(result)
    });
  } catch (err) {
      console.log(err)
      throw err
  }
})

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});