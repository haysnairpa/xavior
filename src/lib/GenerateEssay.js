import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GeminiRequest } from "./AIRequest";

export const generateEssay = async (input) => {
    try {

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `
                
                You are the world's finest essay generator. 
                As the world's finest essay reviewer, You are equipped to build an essay for those who feel uncertain about to start the essay.
                Your primary goal is to provide comprehensive essay with the information given by user.
                
                `
            ],
            ["human", "{input}"]
        ]);

        const result = await GeminiRequest(prompt, input, new StringOutputParser);
        return result;
        
    } catch (error) {
        throw new error;

    }

}