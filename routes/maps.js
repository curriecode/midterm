const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // puts map into database initially
  router.post('/', (req, res) => {
    let title = req.body.title;
    let desc = req.body.description;
    let query = `

      INSERT INTO maps (user_id, title, description)
      VALUES (${req.session.user_id}, '${title}', '${desc}')
      RETURNING *;
      `;
    db.query(query)
      .then(data => {
        console.log('\n SQL INSERT:  map_id --> Success ✅ \n\n', data.rows[0]);
        res.json({ id: data.rows[0].id });
      })
      .catch(err => console.log("ERROR: ", err));
  });

  // gets info from database about maps and passes to the front-end to store in maps lists
  router.get("/", (req, res) => {
    let query = `
    SELECT title, description, name, maps.id as id
    FROM maps
    JOIN users ON users.id = maps.user_id;
    `

    db.query(query)
      .then(data => {
        console.log('\n SQL SELECT:  discover_maps --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  });

  //displays all maps made by user
  router.get("/user", (req, res) => {
    let id = req.session.user_id;
    let query = `
      SELECT *
      FROM maps
      WHERE user_id = ${id};
      `;
    db.query(query)
      .then(data => {
        console.log('\n SQL SELECT:  user_maps --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log('ERROR: ', err));
  });


  // saves favorites map
  router.post('/favorites/:mapId', (req, res) => {
    let mapId = req.params.mapId;
    let userId = req.session.user_id;
    let query = `
          INSERT INTO favorites (user_id, map_id)
          VALUES (${userId}, ${mapId})
          RETURNING *
          `;
    db.query(query)
      .then(data => {
        console.log('\n SQL INSERT:  favorites --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log("ERROR: ", err));
  });


  // gets all favorited maps
  router.get('/favorites', (req, res) => {
    let userId = req.session.user_id;
    let query = `
          SELECT DISTINCT *
          FROM favorites
          JOIN maps ON maps.id = map_id
          WHERE favorites.user_id = ${userId};
          `;
    db.query(query)
      .then(data => {
        console.log('\n SQL SELECT:  favorites --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
        // res.send(data)
      })
      .catch(err => console.log("ERROR: heeeeeey", err));
  });

  //get contributions
  router.get('/contributions', (req, res) => {
    let userId = req.session.user_id;
    let query = `
          SELECT DISTINCT *
          FROM contributions
          JOIN maps ON maps.id = map_id
          WHERE contributions.user_id = ${userId};
          `;
    db.query(query)
      .then(data => {
        console.log('\n SQL SELECT:  contributions --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
        // res.send(data)
      })
      .catch(err => console.log("ERROR: heeeeeey", err));
  });

  //loads markers
  router.get("/:id", (req, res) => {
    let id = req.params.id;
    let query = `
      SELECT DISTINCT markers.place_id, maps.title, maps.description 
      FROM maps
      LEFT JOIN markers ON map_id = maps.id
      WHERE maps.id = ${id}
      `;
    db.query(query)
      .then(data => {
        console.log('\n SQL SELECT:  place_id --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  });

  return router;
};
