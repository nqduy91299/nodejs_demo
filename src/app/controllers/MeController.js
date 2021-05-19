const Course = require('../Models/Course')
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose')

class CourseController{
    
    // [GET] /me/store/courses
    storedCourses(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
        .then(([courses, countDeletedCourses]) => {
            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses), 
                countDeletedCourses, 
                user
            })
        })
        .catch(next);
        
    }

    // [GET] /me/bin/courses
    binCourses(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
        Course.findDeleted({})
        .then((course) => {
            res.render('me/bin-courses', {courses: multipleMongooseToObject(course), user})
        })
        .catch(next);
    }

   
}

module.exports = new CourseController;