var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    emailVerficationDate: {type: Date, default: null},
    registered:  {type: Date},
    lastLogin: {type: Date},
    dob: {type: Date},
    gender: {type: String},
    lookingFor: {
        men: {type: Boolean, default: false},
        women: {type: Boolean, default: false},
        transWomen: {type: Boolean, default: false},
        transMen: {type: Boolean, default: false},
        couple: {type: Boolean, default: false},
    },
    profile: {
        tagline: {type: String, default: ""},
        intro: {type: String, default: ""},
        followers: {type: Array, default: []},
        following: {type: Array, default: []},
        profileQuestions: {type: Array, default: []},
        langsSpoken: {type: Array, default: []}
    },
    location: {
        city: {type: String, default: ""},
        state: {type: String, default: ""},
        country: {type: String, default: ""},
        zipCode: {type: String, default: ""},
        lat: {type: String, default: ""},
        lon: {type: String, default: ""},
    },
    wallet: {
        membershipLevel: {type: Number, default: 100},
        credits: {type: Number, default: 0},
        elite: {type: Boolean, default: false},
        gifts: {type: Array, default: []},
        referrals: {type: Array, default: []},
        transactions: {type: Array, default: []}
    },
    billing: {
        orders: {type: Array, default: []},
        savedPayments: {type: Array, default: []},
        paymentMethods: {type: Array, default: ["creditcard"]},
        declines: {type: Number, default: 0},
        affilliateId: {type: String, default: 'internal'},
        coupons: {type: Array, default: []}
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;