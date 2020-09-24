import express from 'express';

//import queryString from 'query-string';

import ColorTable from '../models/ColorTable';

var router = express.Router();



// 
router.get('/:idColorTable', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorTable
    };

  ColorTable.findOne(filter, (err, founColorTable) => {
      if (err) return res.status(500).json({
        error: err
      });
      else if (!founColorTable) {
        return res.status(404).json({
          error: 'ColorTable not found'
        });
      } else {
        res.json(founColorTable);
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


  ColorTable.aggregate(pipeline, (err, listColorTable) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listColorTable);
  })

});





router.post('/', async(req, res, next) => {

  try {

    const date = Date.now();

    const colorTableReq = req.body;

    let mongoColorTable = new ColorTable({
      
      ...colorTableReq
      
      , created: date
      , updated: date
        
    });

    await mongoColorTable.save();


    res.send("new ColorTable has been created!");

  } catch (error) {
    next(error)
  }

});








//UPDATE
router.put('/:idColorTable', async(req, res, next) => {

  try {

    const filter = {
      _id: req.params.idColorTable
    };

    const date = Date.now();



    const colorTableReq = req.body;



    let update = {

      ...colorTableReq
      
      , updated: date
    };


    await ColorTable.updateOne(filter, update);

    res.send("The ColorTable has benn updated!");

  } catch (error) {
    next(error)
  }

});






// DELETE Comp
router.delete('/:idColorTable', async(req, res, next) => {

  try {

    try {
      const filter = {
        _id: req.params.idColorTable
      };
      await ColorTable.deleteOne(filter);


      res.send("The ColorTable has been deleted");

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