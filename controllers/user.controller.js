const UserModel = require('../models/user.model');

const test = (req, res) => {
  res.send('Testing user controller!');
};

const create = (req, res) => {
  try{
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      treasure: []
    });

    newUser.save((err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      return res.status(200).json(newUser);
    });
  } catch (err) {
    
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message}); 
  }
}

const read = (req, res) => {
  try{
    const id = req.params.id;

    UserModel.findById(id, (err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      return res.status(200).json(user);
    });
  } catch (err) {
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message});
  }
}

module.exports = {
  test,
  create,
  read
}