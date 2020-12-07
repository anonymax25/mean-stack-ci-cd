let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let faker = require('faker');

chai.use(chaiHttp);
let sampleTask = [];



describe('routes testing', () => {

    let user = {
        _id: '',
        login: 'testing',
        password: 'testing'
    }

    describe('Auth routes', () => {
        it('should not sign up user ', (done) => {
            chai.request(server)
                .post('/signup')
                .send()
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should sign up user', (done) => {
            chai.request(server)
                .post('/signup')
                .send({
                    login: user.login,
                    password: user.password
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should login user', (done) => {
            chai.request(server)
                .get('/login/'+ user.login + '/' + user.password)
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
        it('it should POST a task ', (done) => {
            chai.request(server)
                .post('/task')
                .send({
                    name: 'Tasking',
                    days: 3,
                    user: user._id
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('it should not POST a task ', (done) => {
            chai.request(server)
                .post('/task')
                .send({
                    name: faker.name.jobTitle(),
                    days: faker.name.jobTitle(),
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
        it('should get a string with all /', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should get all tasks', (done) => {
            chai.request(server)
                .get('/task/' + user._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
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
               .delete('/task/' + sampleTask[0]._id)
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
                .delete('/user/' + user.login + '/' + user.password)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

