
// basic params for anything off of route function
let isAuth = (req, res, next) => {
    console.log("helloooo");
    req.msg = "yikes";
    next();
}

exports.isAuth = isAuth;

