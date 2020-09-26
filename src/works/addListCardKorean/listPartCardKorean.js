import { v4 as uuidv4 } from 'uuid';

const listPartCardKorean = [
	
	{
		quiz: {
      instruction: ['Translate into Korean'],
      text: ['Good Night / Did you have a good sleep?'],
      hint: ['']
    },
    answer: { kind: 'text', text: { value: '잘자 / 잘잤어?', placeholder: 'OO / OOO?' } },   // text, choice },
    reward: { appointed: false, number: 1, tags: ['love', 'cute', 'character'] }
	},
	
	{
		quiz: {
      instruction: ['Answer the question in Korean'],
      text: ["Your and your husband's Korean name"],
      hint: ['']
    },
    answer: { kind: 'text', text: { value: '지아 - 재현', placeholder: 'OO - OO?' } },   // text, choice },
    reward: { appointed: false, number: 1, tags: ['love', 'cute', 'character'] }
	}
	
]


export default listPartCardKorean;
