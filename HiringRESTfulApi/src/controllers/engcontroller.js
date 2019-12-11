'use strict';

const response = require ('../../response');
const connection = require ('../configs/connect');

exports.engineers = function (req, res) {
  connection.query ('SELECT * FROM engineer ORDER BY name, skill, date_updated LIMIT 10', function (error, rows, fields) {
    if (error) {
      console.log (error);
    } else {
      response.ok (rows, res);
    }
  });
};

exports.welcome = function (req, res) {
  response.ok ('Welcome!', res);
};

exports.add = function (req, res) {
  const {name , description, skill, location, date_of_birth} = req.body
  const showcase = '/images/' + req.file.filename
  const date_created = new Date()
  const data = {name , description, skill, location, date_of_birth, showcase, date_created}

  connection.query (
    'INSERT INTO engineer SET ?', data,
    function (error, rows, fields) {
      if (error) {
        throw error;
      } else {
        return res.send ({
          error: false,
          data: rows,
          message: 'New Engineer has been Inserted',
        });
      }
    }
  );
};

exports.update = function (req, res) {
  let id = req.params.id;
  const date_updated = new Date()
  const { name , description, skill, location, date_of_birth } = req.body
  const showcase = '/images/' + req.file.filename
  connection.query (
    "UPDATE engineer SET name='"+req.body.name+"', description='"+req.body.description+"', skill='"+req.body.skill+"', location='"+req.body.location+"', date_of_birth='"+req.body.date_of_birth+"', showcase='"+showcase+"', date_updated='"+date_updated+"' WHERE id="+req.params.id,
    function (error, rows, fields) {
      if (error) {
        throw error;
      } else {
        return res.send ({
          error: false,
          data: rows,
          message: 'Data has been Changed',
        });
      }
    }
  );
};

exports.search = function (req, res) {
    let name = req.params.name;
    connection.query (
      "SELECT * FROM engineer WHERE name='"+req.params.name+"' OR skill LIKE '%"+req.params.name+"%'",
      function (error, rows, fields) {
        if (error) {
          throw error;
        } else {
          return res.send ({
            error: false,
            data: rows,
            message: 'Succes search Engineer',
          });
        }
      }
    );
  };

exports.destroy = function (req, res) {
  let id = req.params.id;
  connection.query ("DELETE FROM engineer WHERE id='" +req.params.id , function (error, rows, field) {
    if (error) {
      throw error;
    } else {
      return res.send ({
        error: false,
        data: rows,
        message: 'Engineer has been Deleted',
      });
    }
  });
};