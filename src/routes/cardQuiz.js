import express from 'express';

//import queryString from 'query-string';

import CardQuiz from '../models/CardQuiz';

var router = express.Router();



// 
router.get('/:idCardQuiz', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCardQuiz
    };

  CardQuiz.findOne(filter, (err, founCardQuiz) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founCardQuiz) {
        return res.status(404).json({
          error: 'CardQuiz not found'
        });
      } else {
        res.json(founCardQuiz);
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


  CardQuiz.aggregate(pipeline, (err, listCardQuiz) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listCardQuiz);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoCardQuiz = new CardQuiz({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoCardQuiz.save();


    res.send("new CardQuiz has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idCardQuiz', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCardQuiz
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await CardQuiz.updateOne(filter, update);

    res.send("The CardQuiz has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idCardQuiz', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idCardQuiz
      };
      await CardQuiz.deleteOne(filter);


      res.send("The CardQuiz has been deleted");

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