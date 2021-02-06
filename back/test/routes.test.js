let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let faker = require('faker');

chai.use(chaiHttp);
let sampleTask = [];



describe('routes testing', () => {

    before(function (done) {
        server.on("started", function(){
            done();
        });
    });

    let user = {
        _id: '',
        email: 'testing@gmail.com',
        password: 'testing',
        firstName: 'testing',
        lastName: 'testing'
    }

    describe('Auth routes', () => {
        it('should not sign up user ', (done) => {
            chai.request(server)
                .post('/sign-up')
                .send()
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should sign up user', (done) => {
            chai.request(server)
                .post('/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should login user', (done) => {
            chai.request(server)
                .post('/sign-in')
                .send({
                    email: user.email,
                    password: user.password
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    user._id = res.body._id;
                    done();
                });
        });
    });
    /*
     * Test the /POST route
    */
    describe('/POST Task', () => {
        it('should POST a task ', (done) => {
            chai.request(server)
                .post('/task')
                .send({
                    name: 'Tasking',
                    datetime: Date.now(),
                    user: user._id
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not POST a task ', (done) => {
            chai.request(server)
                .post('/task')
                .send({
                    name: faker.name.jobTitle(),
                    datetime: faker.name.jobTitle(),
                    user: user._id
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
    /**
     * TEST GET ROUTES
     */
    describe('/Get Task routes', () => {
        it('should get all tasks', (done) => {
            chai.request(server)
                .get('/tasks/' + user._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    sampleTask = res.body;
                    done();
                });
        });
        it('should get one tasks', (done) => {
            chai.request(server)
                .get('/task/' + sampleTask[0]._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    sampleTask = res.body;
                    done();
                });
        });
    });
    /**
     * Delete requests
     */
    describe('Delete tasks request',()=> {
       it('should delete a task',(done)=> {
           chai.request(server)
               .delete('/task/' + sampleTask._id)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   done();
               });
       });
    });

    /**
     * @description Delete user and his tasks
     */
    describe('End tests',()=> {
        it('should delete user and its tasks', (done) => {
            chai.request(server)
                .delete('/user/' + user.email + '/' + user.password)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

