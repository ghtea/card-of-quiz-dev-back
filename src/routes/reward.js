import express from 'express';

//import queryString from 'query-string';

import Reward from '../models/Reward';

var router = express.Router();



// 
router.get('/:idReward', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idReward
    };

  Reward.findOne(filter, (err, founReward) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founReward) {
        return res.status(404).json({
          error: 'Reward not found'
        });
      } else {
        res.json(founReward);
      }
    });

  } catch (error) {
    next(error)
  }

});





router.get('/', (req, res) => {


  const query = req.query;

  const filterKind = (query.filterKind) ? {
    "kind": query.filterKind
  } : {};
  
  const filterTags = (query.filterTags && JSON.parse(query.filterTags).length !== 0) ? {
    "tags": {
      $all: JSON.parse(query.filterTags)
    }
  } : {};

  const filter = {

    $and: [
      filterKind,
      filterTags
    ]

  };
  
  
  let pipeline = [{
    "$match": filter
  }]


  Reward.aggregate(pipeline, (err, listReward) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listReward);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoReward = new Reward({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoReward.save();


    res.send("new Reward has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idReward', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idReward
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await Reward.updateOne(filter, update);

    res.send("The Reward has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idReward', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idReward
      };
      await Reward.deleteOne(filter);


      res.send("The Reward has been deleted");

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