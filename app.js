var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	flash = require("connect-flash"),
	mongoose = require("mongoose");


// database config
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/ca_sj';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var Card = require("./models/card"),
	Doubt = require("./models/doubt"),
	Feedback = require("./models/feedback"),
	Class = require("./models/class");
// Card.create({name:"Rishabh",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg/220px-Young_girl_smiling_in_sunshine_%282%29.jpg",description:"HI"},function(err,newcard){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		res.redirect("/");
// 	}
// })
// Class.create({date:"1",morning:"Active",evening:"Off"},function(err,newclass){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		res.redirect("/classes");
// 	}
// })
app.use(require("express-session")({
	secret:"CA sweta jain",
	resave:false,
	saveUninitialized:false
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(expressSanitizer());
app.use(flash());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.get("/",function(req,res){
	Card.find({},function(err,allCards){
		if(err){
			console.log(err);
		}else{
			res.render("home",{cards:allCards});
		}
	})
})
app.post("/doubt",function(req,res){
	req.body.doubt.description = req.sanitize(req.body.doubt.description);
	var newDoubt = req.body.doubt;
	Doubt.create(newDoubt, function(err,newDoubt){
		if(err){
			req.flash("error","Something went wrong");
			console.log(err);
			res.redirect("/");
		}else{
			req.flash("success","Thankyou for reaching out yo us. We will contact you shortly.");
			res.redirect("/contact");
		}
	})
	
})
app.get("/classes",function(req,res){
	Class.find({},function(err,allclasses){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			res.render("classes",{classes:allclasses});
		}
	})
	
})
app.get("/about",function(req,res){
	res.render("about");
})
app.get("/contact",function(req,res){
	res.render("contact");
})
app.get("/feedback",function(req,res){
	res.render("feedback");
})
app.post("/feedback",function(req,res){
	req.body.feed.description = req.sanitize(req.body.feed.description);
	var newFeed = req.body.feed;
	Feedback.create(newFeed, function(err,newFeed){
		if(err){
			console.log(err);
			req.flash("error","Something went wrong");
			res.redirect("/feedback");
		}else{
			req.flash("success","Thankyou for your valuable feedback");
			res.redirect("/feedback");
		}
	})
})
app.get("/videos",function(req,res){
	res.render("videos");
})

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Now serving website for CA SWETA JAIN.");
})