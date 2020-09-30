import express from 'express';

//import queryString from 'query-string';

import Quiz from '../models/Quiz';

var router = express.Router();



// 
router.get('/:idQuiz', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idQuiz
    };

  Quiz.findOne(filter, (err, founQuiz) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founQuiz) {
        return res.status(404).json({
          error: 'Quiz not found'
        });
      } else {
        res.json(founQuiz);
      }
    });

  } catch (error) {
    next(error)
  }

});





router.get('/', (req, res) => {


  const query = req.query;


  const filterAuthor = (query.author) ? {
    author: query.author
  } : {};
  
  const filterSubject = (query.subject) ? {
    author: query.subject
  } : {};
  
  const filterSymbol = (query.symbol) ? {
    author: query.symbol
  } : {};


  const filter = {

    $and: [

      filterAuthor,
      filterSubject,
      filterSymbol
      
    ]

  };
  
  
  let pipeline = [{
    "$match": filter
  }]


  Quiz.aggregate(pipeline, (err, listQuiz) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listQuiz);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoQuiz = new Quiz({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoQuiz.save();


    res.send("new Quiz has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idQuiz', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idQuiz
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await Quiz.updateOne(filter, update);

    res.send("The Quiz has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idQuiz', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idQuiz
      };
      await Quiz.deleteOne(filter);


      res.send("The Quiz has been deleted");

    } catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }

  } catch (error) {
    next(error)
  }

});


module.exports = router;