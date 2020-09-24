import express from 'express';

//import queryString from 'query-string';

import Theme from '../models/Theme';

var router = express.Router();



// 
router.get('/:iTheme', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.iTheme
    };

  Theme.findOne(filter, (err, founTheme) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founTheme) {
        return res.status(404).json({
          error: 'Theme not found'
        });
      } else {
        res.json(founTheme);
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


  Theme.aggregate(pipeline, (err, listTheme) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listTheme);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const themeReq = req.body.theme;
    
    let mongoTheme = new Theme({
      
      ...themeReq
      
      , created: date
      , updated: date
        
    });

    await mongoTheme.save();


    res.send("new theme has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idTheme', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idTheme
    };

    const date = Date.now();



    const themeReq = req.body;



    let update = {

      ...themeReq
      
      , updated: date
    };


    await Theme.updateOne(filter, update);

    res.send("The theme has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idTheme', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idTheme
      };
      await Theme.deleteOne(filter);


      res.send("The theme has been deleted");

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