'use strict';

const response = require ('../../response');
const connection = require ('../configs/connect');

exports.companies = function (req, res) {
  connection.query ('SELECT * FROM company', function (error, rows, fields) {
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
    const {name , logo, location, description} = req.body
    const data = {name , logo, location, description}

  connection.query (
    'INSERT INTO company SET ?', data,
    function (error, rows, fields) {
      if (error) {
        throw error;
      } else {
        return res.send ({
          error: false,
          data: rows,
          message: 'New Company has been Inserted',
        });
      }
    }
  );
};

exports.update = function (req, res) {
  let id = req.params.id;
  const compID = req.params.compID // get url param
  const { name , logo, location, description } = req.body
  connection.query (
    "UPDATE company SET name='"+req.body.name+"', logo='"+req.body.logo+"', location='"+req.body.location+"', description='"+req.body.description+"' WHERE id="+req.params.compID,
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
    let id = req.params.id;
    connection.query (
      "SELECT * FROM company WHERE id='"+req.params.id,
      function (error, rows, fields) {
        if (error) {
          throw error;
        } else {
          return res.send ({
            error: false,
            data: rows,
            message: 'Succes search company',
          });
        }
      }
    );
  };

exports.destroy = function (req, res) {
  let id = req.params.id;
  connection.query ("DELETE FROM company WHERE id='" +req.params.id , function (error, rows, field) {
    if (error) {
      throw error;
    } else {
      return res.send ({
        error: false,
        data: rows,
        message: 'Company has been Deleted',
      });
    }
  });
};