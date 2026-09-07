function checkAdmin(req,res,next)
{
    if(req.user&&req.user.role=="admin"){
        next();
    }else{
        res.status(403).json({
            message:"Access denied.Amins only"});
        }
    }
    module.exports=checkAdmin;