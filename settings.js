var settings = {
  development: {
    db: "notejam.db",
    dsn: "sqlite://notejam.db"
  },
  prod: {
    db: "notejam",
    dsn: "rm1txo0up0wr8ww.cfsc92rpwd74.ap-southeast-1.rds.amazonaws.com",
    port: "3306",
    password: "belal123",
    user: "notejam"
  },
  test: {
    db: "notejam_test.db",
    dsn: "sqlite://notejam_test.db"
  }
};


var env = process.env.NODE_ENV
if (!env) {
  env = 'development'
};
module.exports = settings[env];
