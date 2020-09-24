import express from 'express';

//import queryString from 'query-string';

import Palette from '../models/Palette';

var router = express.Router();



// 
router.get('/:iPalette', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.iPalette
    };

  Palette.findOne(filter, (err, founPalette) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founPalette) {
        return res.status(404).json({
          error: 'Palette not found'
        });
      } else {
        res.json(founPalette);
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


  Palette.aggregate(pipeline, (err, listPalette) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listPalette);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const PaletteReq = req.body.Palette;
    
    let mongoPalette = new Palette({
      
      ...PaletteReq
      
      , created: date
      , updated: date
        
    });

    await mongoPalette.save();


    res.send("new Palette has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idPalette', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idPalette
    };

    const date = Date.now();



    const PaletteReq = req.body;



    let update = {

      ...PaletteReq
      
      , updated: date
    };


    await Palette.updateOne(filter, update);

    res.send("The Palette has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idPalette', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idPalette
      };
      await Palette.deleteOne(filter);


      res.send("The Palette has been deleted");

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