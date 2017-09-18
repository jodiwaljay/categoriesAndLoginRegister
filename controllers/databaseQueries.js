const Category = require('../models/category.js'),
      Catalogue = require('../models/catalogue.js'),
      EM = require('./email-dispatcher.js'),
      config = require('../config/main');

//========================================
// Login Route
//========================================
exports.getCategory = function(req, res, next){
  Category.find(function(err, categories){
    if(!err){
      res.status(200).json({'categories': categories});
    }
    else{
      res.status(401).json({err: 'Some internal error occured'});
    }
  });
}


//========================================
// Catalogue Route
//========================================
exports.getCatalogues = function(req, res, next){
  const categoryId = req.params.id;
  console.log(categoryId);
  Category.findOne({username: categoryId}, function(err, category){
    if(!err){
      console.log(category);
      Catalogue.find({user: category}, function(error, catalogues){
        if(!error){
          res.status(200).json({catalogues: catalogues});
        }
        else{
          res.status(401).json({err: 'Some internal error occured'});
        }
      });
    }
    else{
      res.status(401).json({err: 'Some internal error occured'});
    }
  });
}
