'use strict';

module.exports = function (app) {
  const engcontroller = require ('../controllers/engcontroller')
  const compcontroller = require ('../controllers/compcontroller')
  const multer = require ('multer')
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/images')
    },
    filename: (req, file, cb) => {
      let filetype = ''
      if(file.mimetype === 'image/gif') {
        
        filetype = 'gif'
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png'
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg'
      }
      cb(null, 'image-' + Date.now() + '.' + filetype)
    }
})
const upload = multer({storage: storage})


  //Engineer
  //GET
  app.route ('/').get (engcontroller.welcome)
  app.route ('/api/v1/engineers').get (engcontroller.engineers)
  app.route ('/api/v1/engineers/:name').get (engcontroller.search)
  //POST
  app.route ('/api/v1/engineers').post (upload.single('showcase'), engcontroller.add)
  //PATCH
  app.route ('/api/v1/engineers/:id').put (upload.single('showcase'), engcontroller.update)
  //DELETE
  app.route ('/api/v1/engineers/:id').delete (engcontroller.destroy)

  //company
  //GET
  app.route ('/').get (compcontroller.welcome)
  app.route ('/api/v1/company').get (compcontroller.companies)
  app.route ('/api/v1/company/:id').get (compcontroller.search)
  //POST
  app.route ('/api/v1/company').post (upload.single('logo'), compcontroller.add)
  //PATCH
  app.route ('/api/v1/company/:id').put (upload.single('logo'), compcontroller.update)
  //DELETE
  app.route ('/api/v1/company/:id').delete (compcontroller.destroy)
};