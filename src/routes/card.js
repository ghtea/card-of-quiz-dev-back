import express from 'express';

//import queryString from 'query-string';

import Card from '../models/Card';

var router = express.Router();



// 
router.get('/:idCard', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCard
    };

  Card.findOne(filter, (err, founCard) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founCard) {
        return res.status(404).json({
          error: 'Card not found'
        });
      } else {
        res.json(founCard);
      }
    });

  } catch (error) {
    next(error)
  }

});





router.get('/', (req, res) => {


  const query = req.query;


  const filterAuthor = (query.idAuthor) ? {
    author: query.idAuthor
  } : {};


  const filter = {

    $and: [

      filterAuthor
      
    ]

  };
  
  
  let pipeline = [{
    "$match": filter
  }]


  Card.aggregate(pipeline, (err, listCard) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listCard);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoCard = new Card({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoCard.save();


    res.send("new Card has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idCard', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCard
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await Card.updateOne(filter, update);

    res.send("The Card has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idCard', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idCard
      };
      await Card.deleteOne(filter);


      res.send("The Card has been deleted");

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