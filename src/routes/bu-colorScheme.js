import express from 'express';

//import queryString from 'query-string';

import ColorScheme from '../models/ColorScheme';

var router = express.Router();



// 
router.get('/:idColorScheme', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorScheme
    };

  ColorScheme.findOne(filter, (err, founColorScheme) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founColorScheme) {
        return res.status(404).json({
          error: 'ColorScheme not found'
        });
      } else {
        res.json(founColorScheme);
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


  ColorScheme.aggregate(pipeline, (err, listColorScheme) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listColorScheme);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const ColorSchemeReq = req.body.ColorScheme;
    
    let mongoColorScheme = new ColorScheme({
      
      ...ColorSchemeReq
      
      , created: date
      , updated: date
        
    });

    await mongoColorScheme.save();


    res.send("new ColorScheme has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idColorScheme', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorScheme
    };

    const date = Date.now();



    const ColorSchemeReq = req.body;



    let update = {

      ...ColorSchemeReq
      
      , updated: date
    };


    await ColorScheme.updateOne(filter, update);

    res.send("The ColorScheme has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idColorScheme', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idColorScheme
      };
      await ColorScheme.deleteOne(filter);


      res.send("The ColorScheme has been deleted");

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