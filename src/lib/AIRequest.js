import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import {HarmBlockThreshold, HarmCategory} from '@google/generative-ai';

const llm = new ChatGoogleGenerativeAI(
    {
        modelName: 'gemini-1.5-pro', 
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
        ],
    }
);

export const GeminiRequest = async (prompt, input, parser) => {
    try {
        const chainJobs = RunnableSequence.from([
            {
                input: new RunnablePassthrough(),
            },
            prompt,
            llm,
            parser,
        ]);
    
        const result = await chainJobs.invoke(
            input
        );

        return result;
        
    
    } catch (e) {
        console.error(e)
    }

}





   
