const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async (token) => {
  // verify auth token
  const googleUser = await veriftyAuthToken(token);
  // check if user exists
  const user = await checkIfUserExists(googleUser.email);
  // if exists, return them; otherwise create new user
  return user ? user : createNewUser(googleUser);
}

const veriftyAuthToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });

    return ticket.getPayload();
  } catch (err) {
    console.error(err);
  }
}

const checkIfUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser =  googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save();
}