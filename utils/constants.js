const { JWT_SECRET } = process.env;

module.exports = {
  urlRegex:
    /^(http(s)?:\/\/)(\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/,
  JWT_SECRET: JWT_SECRET || 'superpuperpassword',
};
