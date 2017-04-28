const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    portfolio: [{
	    symbol: String,
	    percent: Number
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addStock = function (username, stock, callback){
    const query = {
        username: username
    };

    User.findOneAndUpdate(query, {$push: {portfolio: {symbol: stock, percent: 0}}}, {safe: true, upsert:true}, callback);

};

module.exports.getStocksAndPercent = function (username, callback){
    User.find({username: username})
    .distinct("portfolio", {portfolio : {$exists : true}}, callback);
    //User.find({username: username}, '-_id portfolio.symbol portfolio.percent', callback);

};

module.exports.getStocks = function (username, callback) {
    User.find( {username: username}, '-id portfolio.symbol', callback);
};

module.exports.updateAlloc = function (username, portfolio, callback){
     var loop = portfolio;
     console.log(loop);

     loop.forEach(function(obj) {
        User.update({username: username, 'portfolio.symbol': obj.symbol}, {'$set': {
            'portfolio.$.percent': obj.percent}
        }, callback);
     }); 
};

module.exports.deleteStock = function (username, stock, callback) {
     User.collection.update( { username: username}, { $pull: {portfolio: {symbol: stock} } }, { safe: true }, callback );
};