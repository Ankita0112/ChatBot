import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Spinner from "./Spinner";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(false);



  async function generateAnswer(e) {
    // setValue(false);
    setGeneratingAnswer(true);
    setLoading(true);
    e.preventDefault();
    // <Spinner />

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setLoading(false);
    setValue(true);
  }

  return (
    <>
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 min-h-screen p-3 flex flex-col justify-center items-center">
      <img src="/src/assets/chat-bot_13888994.png" className="h-20 mb-6" alt="Flowbite Logo" />
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-slate-600 py-6 px-4 transition-all duration-500 transform hover:scale-105"
      >

        <h1 className="text-4xl font-bold text-stone-100 mb-4 animate-bounce">Chat Bot</h1>

        <textarea
          required
          className="border border-gray-300 text-center rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
        ></textarea>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-all duration-300 ${
            generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
      </form>

      {/* {if(loading && generatingAnswer) {

      }} */}
      {(loading) ? (
          <div className='py-10 text-center'>
            <Spinner />
          </div>
            
        ) : (
          <div >
          </div>
      )}

      {value && !loading? 
        (<div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg">
          <ReactMarkdown className="p-4 ">{answer}</ReactMarkdown>
        </div>)
            
        : (
          <div></div>
          
      )}  

  
    </div>
    </>
  );
}

export default App;
