const express =require('express')

const router=express.Router()

const googleAuthControllers=require('../controllers/GoogleAuthControllers')

const gitHubAuthControllers =require('../controllers/GitHubAuthController')

const faceBookControllers= require('../controllers/FaceBookLoginControllers')

const getImagesController =require('../controllers/GetImageController')

const getmaxSearchController =require('../controllers/getMaxSearchData')

const getHistoryController =require('../controllers/GetHistoryController')

router.route('/auth/google').get(googleAuthControllers.googleLogin)
router.route('/auth/google/callback').get(googleAuthControllers.googleCallBack)

router.get('/test', (req, res) => res.send('Test route works'))

router.route('/auth/github').get(gitHubAuthControllers.gitHubLogin)
router.route('/auth/github/callback').get(gitHubAuthControllers.gitHubCallBack)

router.route('/auth/facebook').get(faceBookControllers.faceBookLogin)
router.route('/auth/facebook/callback').get(faceBookControllers.faceBookCallBack)

router.route('/get-images').post(getImagesController.getImages)

router.route('/get-max-search').get(getmaxSearchController.getmaxSearch)

router.route('/get-history').get(getHistoryController.getHistory)

module.exports =router