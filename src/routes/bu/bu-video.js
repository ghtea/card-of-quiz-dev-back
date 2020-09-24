import express from 'express';

//import queryString from 'query-string';

import Video from '../models/Video';
import User from '../models/User';
import Comp from '../models/Comp';

var router = express.Router();



// READ Video
router.get('/:idVideo', async (req, res, next) => {
  
  try {
  
    const filter = { _id: req.params.idVideo };
    
    Video.findOne(filter, (err, foundVideo) => {
      if(err) return res.status(500).json({error: err});
      else if(!foundVideo) { return res.status(404).json({error: 'Video not found'}); }
      else { res.json(foundVideo); }
    });
    
  } catch(error) { next(error) }
  
});



router.get('/', (req, res) => {
  
  
  const query = req.query;
  
  const listSort = query.listSort || []; // 
  let limitEach = 0; //  매번 한번에 가져올 갯수
  let skipEntire = 0; // 이미 프론트가 받은 총량  300
  
  if (query.limitEach) { limitEach = parseInt(query.limitEach) }
  if (query.skipEntire) { skipEntire = parseInt(query.skipEntire) }
  
  
  const filterReport = (query.idUser)?
    { listUserReport: { $nin: [query.idUser] }  }
    : {  };
    
  const filterSubject = (query.modelSubject && query.idSubject)? 
    { 
      "subject._id": query.idSubject
      ,  "subject.model": query.modelSubject
    }
    : {  };
    
  const filterAuthor = (query.idAuthor)? 
    { 
      author: query.idAuthor
    }
    : {  };
    
  const filterUserLike = (query.idUserLike)? 
    { 
      listUserLike: query.idUserLike
    }
    : {  };
    
    
  const filter={
    
    $and : [
      
      filterReport
      , filterSubject
      , filterAuthor
      , filterUserLike
     
    ]
    
  };
  
  let pipeline = [ {"$match": filter} ]
    
  if (listSort.length >0 ) {
    let objAddFields ={};
    let objSort = {};
 
    
    if ( listSort.includes("numberLike") ) { // [ ] 안에 "numberLike", "createdNew", "createdOld"
    
      objAddFields['numberLike'] = { $size: "$listUserLike" }
      objSort['numberLike'] = -1;
      
    } // if "numberLike"
    
    if ( listSort.includes("updatedNew") ) { // [ ] 안에 "numberLike", "createdNew", "createdOld"
      objSort['updated'] = -1;
    } // if "createdNew"
    
    if ( listSort.includes("createdNew") ) { // [ ] 안에 "numberLike", "createdNew", "createdOld"
      objSort['created'] = -1;
    } // if "createdNew"
    
    if ( listSort.includes("createdOld") ) { // [ ] 안에 "numberLike", "createdNew", "createdOld"
      objSort['created'] = 1;
    } // if "createdNew"
      
      // 여러 묶기
      if (listSort.includes("numberLike")) {
        pipeline.push({
          $addFields: objAddFields
        })
      }
      
      pipeline.push({
        $sort: objSort
      })
      
      
  } // if listSort.length >0  
  else { // default sorting
    pipeline.push({
        $sort: {created: -1}
      })
  }
      
  if (limitEach !== 0) {
    pipeline.push({
      "$limit": skipEntire + limitEach
    })
  }
  if (skipEntire !== 0) {
    pipeline.push({
      "$skip": skipEntire
    })
  }
  
      
  Video.aggregate(pipeline, (err, listVideo) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listVideo);
  })
  
});


  
  
  
// CREATE
router.post('/', async (req, res, next) => {
  
  try {
    
    try {
      let mongoVideo = new Video(
        { 
          _id: req.body._id
          , subject: req.body.subject
          
          , author: req.body.author
          
          , type: req.body.type
          , urlContent:  req.body.urlContent
          , idContent:  req.body.idContent
          
          , listUserLike: []
          , listUserReport: []
          
          , created: Date.now()
          , updated: Date.now()
        });
        
      
      await mongoVideo.save();
    
      
      
      if (req.body.subject.model === "Comp") {
        const filterComp = {_id: req.body.subject._id};
        const updateComp = {
          $push: { listIdVideo: req.body._id }
        };
        
        await Comp.updateOne(filterComp, updateComp);
      }
      
      
      res.send("new Video has been created!");
      
    }
    
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    
    
  } catch(error) { next(error) }
  
});

/*
const filterUser = {_id: req.body.author};
      const updateUser = {
        $push: { "works.listIdVideo": req.body._id }
      };
      
      await User.updateOne(filterUser, updateUser);
*/


// UPDATE

router.put('/:idVideo', async (req, res, next) => {
  try {
  
    const filter = { _id: req.params.idVideo };
    
    
    const update = {
      subject: req.body.subject
          
      , author: req.body.author
      
      , type: req.body.type
      , urlContent: req.body.urlContent 
      , idContent: req.body.idContent 
      
      , updated: Date.now()
    }
    
    try {
      await Video.updateOne(filter, update);
      console.log("successfully updated video");
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    res.send("successfully updated the video");
    
  } catch(error) {next(error)}
  
});


router.put('/like', async (req, res, next) => {
  try {
  
    const query = req.query;
    
    const idVideo = query.idVideo; 
    const idUser = query.idUser;  
    const how = query.how;
    
    
    const filterUser = { _id:idUser};
    const filterVideo = { _id:idVideo};
    let updateUser = {};
    let updateVideo = {};
    
    if (how !== 'false') {
      updateUser = {
        $addToSet: { "likes.listIdVideo": idVideo }
      }
      updateVideo = {
        $addToSet: { "listUserLike": idUser }
      }
    }
    else {
      updateUser = {
        $pull: { "likes.listIdVideo": idVideo }
      }
      updateVideo = {
        $pull: { "listUserLike": idUser }
      }
    }
    
    
    try {
      await User.updateOne(filterUser, updateUser);
      console.log("successfully updated user");
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    try {
      await Video.updateOne(filterVideo, updateVideo);
      console.log("successfully updated video");
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    res.send("successfully updated user and video")
    
  } catch(error) {next(error)}
  
});



router.put('/report/:idVideo', async (req, res, next) => {
  try {
  
    const query = req.query;
    
    const idVideo = req.params.idVideo;
    const idUser = query.idUser;  
    const typeUser = query.typeUser;  
    
    
    const filter = { _id:idVideo};
    let update = { $addToSet: { "listUserReport": idUser } };
    
    
    try {
      const foundVideo = await Video.findOne(filter);
      console.log(foundVideo);
      let lengthReportAlready = 0;
      if (foundVideo.listUserReport) {
        lengthReportAlready = foundVideo.listUserReport.length;
      }
      
      let lengthLike = 0;
      if (foundVideo.listUserLike) {
        lengthLike = foundVideo.listUserLike.length;
      }
      
      //console.log(lengthReportAlready);
      //console.log(lengthLike);
      if (lengthReportAlready >= lengthLike * 5 + 5 || typeUser === 'administrator') {
        // 리포트 수가 좋아요 대비해서 너무 많으면 삭제 or 관리자이면
        await Video.deleteOne(filter);
        
        
        const filterUser = {
          "works.listIdVideo": idVideo
        };
        const updateUser = {
          $pull: {
            "works.listIdVideo": idVideo
          }
        };
        await User.updateOne(filterUser, updateUser);
        
        
        console.log("successfully delete video");
      }
      else {
        // 너무 많지 않으면 그냥 리스트에 추가
        await Video.updateOne(filter, update);
        console.log("successfully updated video");
      }
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    res.send("successfully applied report");
    
  } catch(error) {next(error)}
  
});




router.delete('/:idVideo', async (req, res, next) => {
  
  try {
    
    try {
      const filter = { _id: req.params.idVideo };
      await Video.deleteOne(filter);
      
      
      
      
      const filterComp = {
        listIdVideo: req.params.idVideo
      };
      const updateComp = {
        $pull: { listIdVideo: req.params.idVideo }
      };
      
      await Comp.updateOne(filterComp, updateComp);
      
      
      
      res.send("The video has been deleted");
      
    }
    
    catch (error) {
      console.log(error);
      res.status(500).send(error); // 여기선 내가 잘 모르는 에러라 뭘 할수가...   나중에 알수없는 에러라고 표시하자...
      return;
    }
    
    
    
  } catch(error) { next(error) }
  
});




module.exports = router;


