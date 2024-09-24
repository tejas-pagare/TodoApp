import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "../utils/constant";
import { FaArrowAltCircleUp } from "react-icons/fa";


function OpenAi() {
  const [userPrompt, setUserPrompt] = useState("");
  const [response, setResponse] = useState("");

  

  const onClickHandler = async(e) => {
    e.preventDefault();
    console.log(userPrompt)

    const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Act as a task description generator for a todo app. Given a title or topic, generate a brief and clear description.

      Input: A task title (e.g., "Grocery Shopping").
      
      Output: A short, actionable description of the task.
      
      Example Input: "Grocery Shopping"
      
      Example Output:
      - Make a list of groceries needed for the week.
      - Include essentials like fruits, vegetables, and dairy.
      
      Process:
      1. Identify the key action related to the title.
      2. Generate a clear and concise description.
      3. Keep the response brief, ideally one to two sentences.
      
      User Input: ${userPrompt}`;  // Concatenate user input here
      
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setResponse(result.response.text());

  };
  return (
    <form className="flex gap-2 mx-auto w-[80%] mt-4 flex-col justify-center" onSubmit={(e)=>{e.preventDefault()
      e.target.reset();
    }}>
      {
        
          <div className="flex flex-col gap-4 w-[100%] sm:w-[80%] mx-auto  text-gray-600 bg-gray-100 rounded-md text-sm p-4">
       {response!== "" ?(  <div  className="overflow-auto h-1/2 ">{response}
        
        </div>): null}
        <div className="flex gap-4 justify-between items-center p-2 bg-gray-50 rounded-2xl w-full ">

        <input className="outline-none bg-transparent w-[90%]" value={userPrompt} onChange={(e)=>setUserPrompt(e.target.value)} placeholder="Enter the promt" />
        {/* <button className="bg-black text-white w-[100px] p-1 rounded-full" onClick={onClickHandler}>{"->"}</button> */}
        <FaArrowAltCircleUp className="text-2xl" onClick={onClickHandler} />
        </div>
          </div>
      
      
      }
    
    </form>
  );
}

export default OpenAi;
