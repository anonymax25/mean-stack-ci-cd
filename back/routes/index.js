module.exports = function (app) {
    require('./task.routes')(app);
    require('./auth')(app);
}
