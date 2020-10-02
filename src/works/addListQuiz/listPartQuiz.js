import { v4 as uuidv4 } from 'uuid';

const listPartQuiz = [
	
	{
	  author: 'Jeyon', subject: 'Korean', symbol: 'Heart',
	  
		question: {
      instruction: ['Translate into Korean'],
      content: ['Good Night']
    },
    answer: { 
      kind: 'text', 
      
      text: {
        content: '잘자',
        hint: 'ㅈㅈ'
      },
      
      explanation: ['잘: well, 자: sleep'],
      link: ['https://translate.google.co.kr/#view=home&op=translate&sl=auto&tl=en&text=%EC%9E%98%EC%9E%90']
    },  
    
    tagsReward:  ['love', 'cute', 'character'] 
	},
	
	{
	  author: 'Jeyon', subject: 'Korean', symbol: 'Heart',
	  
		question: {
      instruction: ['Translate into Korean'],
      content: ['Good Night']
    },
    answer: { 
      kind: 'text', 
      
      text: {
        content: '좋은 꿈 꿔',
        hint: 'ㅈㅇ ㄲ ㄲ'
      },
      
      explanation: ['좋은: good, 꿈: dream, 꿔: have(dream)'],
      link: ['https://translate.google.co.kr/#view=home&op=translate&sl=auto&tl=en&text=%EC%A2%8B%EC%9D%80%20%EA%BF%88%20%EA%BF%94']
    },  
    
    tagsReward:  ['love', 'cute', 'character'] 
	}
	
	
]


export default listPartQuiz;


/*
_id: String,
  
  author: String,
  //source: String,
  
  subject: String,   // Korean
  symbol: String,   // Star
  
  question: {
    instruction: [String],
    content: [String]
  },
  
  answer: {
    kind: String,   // text, choice
    
    text: {
      content: String,
      hint: String
    },
    
    explanation: [String],
    link: [String]
  },
  
  tagsReward: { type: [String], default: []},
  
  listScore: { type: [schemaScore], default: []},
  created: Date,
  updated: Date
  */