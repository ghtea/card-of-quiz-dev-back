import express from 'express';

//import queryString from 'query-string';

import ColorSeries from '../models/ColorSeries';

var router = express.Router();



// 
router.get('/:idColorSeries', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorSeries
    };

  ColorSeries.findOne(filter, (err, founColorSeries) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founColorSeries) {
        return res.status(404).json({
          error: 'ColorSeries not found'
        });
      } else {
        res.json(founColorSeries);
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


  ColorSeries.aggregate(pipeline, (err, listColorSeries) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listColorSeries);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorSeriesReq = req.body;

    let mongoColorSeries = new ColorSeries({
      
      ...colorSeriesReq
      
      , created: date
      , updated: date
        
    });

    await mongoColorSeries.save();


    res.send("new ColorSeries has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idColorSeries', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorSeries
    };

    const date = Date.now();



    const colorSeriesReq = req.body;



    let update = {

      ...colorSeriesReq
      
      , updated: date
    };


    await ColorSeries.updateOne(filter, update);

    res.send("The ColorSeries has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idColorSeries', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idColorSeries
      };
      await ColorSeries.deleteOne(filter);


      res.send("The ColorSeries has been deleted");

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