require("dotenv").config()
var express = require("express");
var router = express.Router();
var multer = require('multer');
var fs=require("fs")
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

// var visualRecognition = new VisualRecognitionV3({
// 	version: '2019-04-27',
// 	iam_apikey: process.env.apikey;
// });


var storage = multer.diskStorage({
    
  filename: function(req, file, callback) {
  
 
    callback(null, Date.now() + file.originalname);
     
  }
   
});
var imageFilter = function (req, file, cb) {
    
 
  // upload file to S3

    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, imageFilter:imageFilter});


router.get("/classify",function(req,res)
{
   res.render("classify.ejs"); 
});

router.post("/upload",upload.single("image"),(req,res)=>
{
var images_file= fs.createReadStream(req.file.path);
var classifier_ids = process.env.classifier_id;
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

// visualRecognition.classify(params, function(err, response) {
// 	if (err) { 
// 		console.log(err);
// 	} else {
// 	    var result=response.images[0].classifiers[0].classes[0].class;
// 	    res.render("results.ejs",{res:result});
// 		//res.send(JSON.stringify(response, null, 2))
// 	}
// });
    
})


module.exports = router;