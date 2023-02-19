const authMW = (req,res, next) =>{
    req.isAuthenticated() ? next () : res.send({error: true, msg: "Sin sesión"})
};

export default authMW;