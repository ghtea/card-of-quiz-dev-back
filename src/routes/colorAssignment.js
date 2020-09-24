import express from 'express';

//import queryString from 'query-string';

import ColorAssignment from '../models/ColorAssignment';

var router = express.Router();



// 
router.get('/:idColorAssignment', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorAssignment
    };

  ColorAssignment.findOne(filter, (err, founColorAssignment) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founColorAssignment) {
        return res.status(404).json({
          error: 'ColorAssignment not found'
        });
      } else {
        res.json(founColorAssignment);
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


  ColorAssignment.aggregate(pipeline, (err, listColorAssignment) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listColorAssignment);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorAssignmentReq = req.body;

    let mongoColorAssignment = new ColorAssignment({
      
      ...colorAssignmentReq
      
      , created: date
      , updated: date
        
    });

    await mongoColorAssignment.save();


    res.send("new ColorAssignment has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idColorAssignment', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorAssignment
    };

    const date = Date.now();



    const colorAssignmentReq = req.body;



    let update = {

      ...colorAssignmentReq
      
      , updated: date
    };


    await ColorAssignment.updateOne(filter, update);

    res.send("The ColorAssignment has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idColorAssignment', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idColorAssignment
      };
      await ColorAssignment.deleteOne(filter);


      res.send("The ColorAssignment has been deleted");

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