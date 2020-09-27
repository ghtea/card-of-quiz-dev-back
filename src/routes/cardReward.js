import express from 'express';

//import queryString from 'query-string';

import CardReward from '../models/CardReward';

var router = express.Router();



// 
router.get('/:idCardReward', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCardReward
    };

  CardReward.findOne(filter, (err, founCardReward) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founCardReward) {
        return res.status(404).json({
          error: 'CardReward not found'
        });
      } else {
        res.json(founCardReward);
      }
    });

  } catch (error) {
    next(error)
  }

});





router.get('/', (req, res) => {


  const query = req.query;

  const filterType = (query.filterType) ? {
    type: query.type
  } : {};
  
  const filterTags = (query.filterTags && JSON.parse(query.filterTags).length !== 0) ? {
    tags: {
      $all: JSON.parse(query.filterTag)
    }
  } : {};

  const filter = {

    $and: [
      filterType,
      filterTags
    ]

  };
  
  
  let pipeline = [{
    "$match": filter
  }]


  CardReward.aggregate(pipeline, (err, listCardReward) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listCardReward);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoCardReward = new CardReward({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoCardReward.save();


    res.send("new CardReward has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idCardReward', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idCardReward
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await CardReward.updateOne(filter, update);

    res.send("The CardReward has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idCardReward', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idCardReward
      };
      await CardReward.deleteOne(filter);


      res.send("The CardReward has been deleted");

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