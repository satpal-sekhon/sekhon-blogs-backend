let router = require('express').Router();
var categories = require('./controllers/categories');
var blogs = require('./controllers/blogs');
var projects = require('./controllers/projects');

router.route('/get-categories').get(categories.getCategories)
router.route('/get-categories-list').get(categories.getCategoriesList)
router.route('/add-category').post(categories.addCategory)
router.route('/get-category/:category').get(categories.getCategory)
router.route('/update-category').post(categories.updateCategory)
router.route('/update-category-status').post(categories.updateStatus)
router.route('/delete-category').post(categories.deleteCategory)


router.route('/add-blog').post(blogs.addBlog)
router.route('/get-blogs').get(blogs.getBlogs)
router.route('/get-blog/:id').get(blogs.getBlog)
router.route('/delete-blog').post(blogs.deleteBlog)
router.route('/update-blog').post(blogs.updateBlog)

router.route('/add-project').post(projects.addProject)
router.route('/get-projects').get(projects.getProjects)
router.route('/delete-project').post(projects.deleteProject)
module.exports = router;
