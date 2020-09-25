import { v4 as uuidv4 } from 'uuid';

const listCard = [
	
	{
		_id: uuidv4(),
  
	  author: 'Jeyon',
	  
	  subject: 'Korean',   // Korean
	  symbol: 'heart',   // Star
	  number: 1,   // 1,2,3,4,5,...
	  
	  quiz: {
	    instruction: ['Translate followings into Korean'],
	    text: ['String'],
	    hint: ['5 letters: OO_OOO' ],
	    answer: String
	  },
	  
	  reward: {
	    //appointed: Boolean,
	    //_id: String,
	    number: 1,
	    tags: ['love', 'character', 'man to woman']
	  }
	},
	
	{
		_id: uuidv4(),
  
	  author: 'Jeyon',
	  
	  subject: 'Korean',   // Korean
	  symbol: 'heart',   // Star
	  number: 1,   // 1,2,3,4,5,...
	  
	  quiz: {
	    instruction: ['Answer the question in Korean'],
	    text: ['String'],
	    hint: ['5 letters: OO_OOO' ],
	    answer: String
	  },
	  
	  reward: {
	    //appointed: Boolean,
	    //_id: String,
	    number: 1,
	    tags: ['love', 'character', 'man to woman']
	  }
	}
	
]


export default listCard;
