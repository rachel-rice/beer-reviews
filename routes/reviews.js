const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Review = require('../models/Review')

// @desc    Show add page
// @route   GET /reviews/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('reviews/add')
})

// @desc    Process add form
// @route   POST /reviews
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Review.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all reviews
// @route   GET /reviews
router.get('/', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('reviews/index', {
      reviews,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show single review
// @route   GET /review/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).populate('user').lean()

    if (!review) {
      return res.render('error/404')
    }

    if (review.user._id != req.user.id && review.status == 'private') {
      res.render('error/404')
    } else {
      res.render('reviews/show', {
        review,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// @desc    Show edit page
// @route   GET /reviews/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
    }).lean()

    if (!review) {
      return res.render('error/404')
    }

    if (review.user != req.user.id) {
      res.redirect('/reviews')
    } else {
      res.render('reviews/edit', {
        review,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update review
// @route   PUT /reviews/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean()

    if (!review) {
      return res.render('error/404')
    }

    if (review.user != req.user.id) {
      res.redirect('/reviews')
    } else {
      review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete review
// @route   DELETE /reviews/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean()

    if (!review) {
      return res.render('error/404')
    }

    if (review.user != req.user.id) {
      res.redirect('/reviews')
    } else {
      await Review.deleteOne({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete review
// @route   DELETE /reviews/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean()

    if (!review) {
      return res.render('error/404')
    }

    if (review.user != req.user.id) {
      res.redirect('/reviews')
    } else {
      await Review.deleteOne({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

//@desc Search reviews by title
//@route GET /reviews/search/:query
router.get('/search/:query', ensureAuth, async (req, res) => {
  try{
      const reviews = await Review.find({title: new RegExp(req.query.query,'i'), status: 'public'},)
      .populate('user')
      .sort({ createdAt: 'desc'})
      .lean()
     res.render('reviews/index', { reviews })
  } catch(err){
      console.log(err)
      res.render('error/404')
  }
})

//@desc Search reviews by brewery
//@route GET /reviews/search/:query
// router.get('/search/:query', ensureAuth, async (req, res) => {
//   try{
//       const reviews = await Review.find({brewery: new RegExp(req.query.query,'i'), status: 'public'})
//       .populate('user')
//       .sort({ createdAt: 'desc'})
//       .lean()
//      res.render('reviews/index', { reviews })
//   } catch(err){
//       console.log(err)
//       res.render('error/404')
//   }
// })

// @desc    User reviews
// @route   GET /reviews/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.params.userId,
      status: 'public'
    })
    .populate('user')
    .lean()
    
    res.render('reviews/index', {
      reviews
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


module.exports = router