module.exports = function (app) {
    require('./task.route')(app);
    require('./user.route')(app);
    require('./auth')(app);
}
