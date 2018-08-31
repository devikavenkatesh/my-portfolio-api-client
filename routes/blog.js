var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

router.get('/', function (req, res, next) {
    client.get("http://localhost:3030/blog", function (jsonData, response) {
        // parsed response body as js object
        console.log(jsonData.data);
        // raw response
        // console.log(response);
        var random = Math.floor(Math.random() * jsonData.data.length);
        res.render('blog', { 
            title: 'Blog', 
            navBlog: true, 
            showFooter: true, 
            extraCss: ['/css/blog.css'],
            categories: jsonData.categories,
            featuredBlog: jsonData.data[random] ,
            blog: jsonData.data
        });
    });

    router.get('/:blogAlias', function (req, res, next) {
        client.get("http://localhost:3030/blog/"+ req.params.blogAlias, function (jsonData, response) {
            // parsed response body as js object
            console.log(jsonData.data); 
            res.render('blog-detail', { 
                title: jsonData.data.name ,
                navBlog: true, 
                showFooter: true, 
                extraCss: ['/css/blog.css'],
                blog:  jsonData.data,
                categories: null //blogCategoriesData
                });
            });
    });

    
});
  /*
router.get('/:blogAlias', function (req, res, next) {
    var blog = getBlog(req.params.blogAlias);
    res.render('blog-detail', { 
      title: blog.name ,
      navBlog: true, 
      showFooter: true, 
      extraCss: ['/css/blog.css'],
      blog:  blog,
      categories: data.blogCategories
    });
});
*/
module.exports = router;