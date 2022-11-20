class CustomError {
    constructor(code,msg){
        this.code=code;
        this.msg=msg;
    }
}

const err=(err,req,res,next)=>{
    console.log(err);
    if(res.headerSent){
        next(err);
        return;
    }
    if(err instanceof CustomError){
        res.status(err.code).json(err.msg);
        return;
    }
    res.status(500).json('Unknown Server Error');
}

module.exports={err,CustomError}