import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GeminiRequest } from "./AIRequest";

export const reviewEssay = async (input) => {
    try {

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `
                
                You are the world's finest essay reviewer. 
                As the world's finest essay reviewer, You are equipped to provide comprehensive review to the people who may feel uncertain about their essay.
                Your primary goal is to provide comprehensive review for the essay given to you.
        
                Your respond must follows these rules:
        
                - Respond with a valid JSON object, containing one field with name 'review'.
        
                The respond must be in JSON format.
                
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