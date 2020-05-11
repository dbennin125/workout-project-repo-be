require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;
//get lists of exercises
app.get('/exercises', async(req, res) => {
  const data = await client.query('SELECT * from exercises');
  //gets all data from DB
  res.json(data.rows);
});

//get just one specific exercise by ID
app.get('/exercises/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query('SELECT * from exercises WHERE id=$1', [id]);
    // console.log(data.row);
    res.json(data.rows[0]);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});
//get an exercise by it's name
app.get('/exercisebyname/:name', async(req, res) => {
  try {
    const name = `%${req.params.name}%`;
    // console.log(name);
    const data = await client.query('SELECT * from exercises where name ilike $1;', [name]);
    // console.log(data.row);
    res.json(data.rows);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});

//set new name in exercise DB 
app.put('/exercises/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query('SELECT * from exercises WHERE id=$1', [id]);
    // console.log(data.row);
    res.json(data.rows[0]);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});

app.post('/exercises/', async(req, res) => {
  // console.log('=============================\n');
  // console.log('|| req.body', req.body);
  // console.log('\n=============================');
  try {
    
    const data = await client.query(`insert into exercises (name, weight, is_fullbody, type, user_id)
    values ($1, $2, $3, $4, $5)
    returning *;`,
    //had to hardcode user as 1 due to fail on heroku's side
    [req.body.name, req.body.weight, req.body.is_fullbody, req.body.type, 1]
    );
    // console.log(data.row);
    res.json(data.rows[0]);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});



app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

module.exports = app;
