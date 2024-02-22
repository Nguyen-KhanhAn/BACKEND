exports.create = (req, res) => {
    res.send({message: "create handler"});
};

exports.findALL = (reqp, res) =>{
    res.send({message:"findALL handler"});
};

exports.findOne = (reqp, res) =>{
    res.send({message:"findOne handler"});
};

exports.update = (reqp, res) =>{
    res.send({message:"Update handler"});
};

exports.deleted = (reqp, res) =>{
    res.send({message:"deleted handler"});
};

exports.deletedALL = (reqp, res) =>{
    res.send({message:"deletedALL handler"});
};

exports.findALLFavorite = (reqp, res) =>{
    res.send({message:" findALLFavorite handler"});
};
