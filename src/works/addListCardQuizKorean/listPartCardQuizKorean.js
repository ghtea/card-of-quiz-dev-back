import { v4 as uuidv4 } from 'uuid';

const listPartCardKorean = [
	
	{
		quiz: {
      instruction: ['Translate into Korean'],
      text: ['Good Night / Did you have a good sleep?'],
      hint: ['']
    },
    answer: { kind: 'text', text: { valueCorrect: '잘자 & 잘잤어?', valueTrying: '** & **ㅇ?', placeholder: '** & **ㅇ?' } },   // text, choice },
    reward: { appointed: ['love', 'cute', 'character'] }
	},
	
	{
		quiz: {
      instruction: ['Answer the question in Korean'],
      text: ["Your Korean name - your husband's Korean name"],
      hint: ['']
    },
    answer: { kind: 'text', text: { valueCorrect: '지아 & 재현', valueTrying: '** & *ㅎ', placeholder: '** & *ㅎ' } },   // text, choice },
    reward: { appointed: ['love', 'cute', 'character'] }
	}
	
]


export default listPartCardKorean;
