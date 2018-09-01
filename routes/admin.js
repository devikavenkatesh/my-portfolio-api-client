var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

router.get('/', function (req, res, next) {
  res.render('admin/dashboard', { 
    layout: 'layout-admin', 
    title: 'Admin Dashboard',
    navDashboard: true
  });
});

router.get('/projects', function (req, res, next) {
    client.get("http://localhost:3030/projects", function (jsonData, response) {
        // parsed response body as js object
        //console.log(jsonData);
        // raw response
        // console.log(response);
        res.render('admin/projects', { 
          layout: 'layout-admin', 
          title: 'Projects Admin',
          navProjects: true,
          projects:   jsonData.data
        });
    });
});

router.get('/projects/create', function (req, res, next) {
  console.log("create");
  res.render('admin/project-create', { 
    layout: 'layout-admin', 
    title: 'Projects Admin',
    navProjects: true
  });
});

router.post('/projects/create', function (req, res, next) {
  var data = req.body;
  console.log(JSON.stringify(data));
  var args = {
      data: req.body,
      headers: { "Content-Type": "application/json" }
  };
  client.post("http://localhost:3030/projects", args, function (jsonData, response) {
          // parsed response body as js object
          console.log(jsonData);
          // raw response
          // console.log(response);
          res.redirect('/admin/projects');
      });  
});

router.get('/projects/:projectAlias', function (req, res, next) {
  client.get("http://localhost:3030/projects/"+ req.params.projectAlias, 
      function (jsonData, response) {
          // parsed response body as js object
          //console.log(jsonData);
          // raw response
          // console.log(response);

          res.render('admin/project-detail', { 
            layout: 'layout-admin', 
            title: jsonData.data.name,
            navProjects: true,
            project: jsonData.data
          });
      });
});

router.post('/projects/:projectAlias/update', function (req, res) {
   var data = req.body;
 // console.log(JSON.stringify(data));
  var args = {
      data: req.body,
      headers: { "Content-Type": "application/json" }
  };
  var pAlias = req.params.projectAlias;
  console.log("update" + pAlias);
  client.put("http://localhost:3030/projects/"+ pAlias, args,
      function (jsonData, response) {
          // parsed response body as js object
          console.log(jsonData);
          // raw response
          // console.log(response);

          res.redirect('/admin/projects/'+ pAlias);
      });

});

/*




router.get('/media', function (req, res) {
  res.render('admin/upload', { 
    layout: 'layout-admin', 
    title: 'Image Upload',
    navProjects: true
  });
});

router.post('/media', function (req, res) {
  upload(req, res, function (err) {
    console.log(err);

    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

router.get('/projects/:projectAlias', function (req, res, next) {
    function projectDetails(error, data){
      res.render('admin/project-detail', { 
        layout: 'layout-admin', 
        title: data[0].name,
        navProjects: true,
        project: data[0]
      });
    }
    getProject(req.params.projectAlias, projectDetails);
  });

router.get('/blog', function (req, res, next) {
  res.render('admin/blog', { 
    layout: 'layout-admin', 
    title: 'Blog Admin',
    navBlog: true,
    blogs: getBlog()  
  });
});
*/
module.exports = router;