import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [previousPrompts, setPreviousPrompts] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else {
            response = await run(input)
            setRecentPrompt(input)
            setPreviousPrompts(prev=>[...prev, input])
        }
        let responseArray1 = response.split("**")
        let newResponse1;
        for (let i = 0; i < responseArray1.length; i++) {
            if (i % 2 === 0) {
                newResponse1 += responseArray1[i];
            }
            else {
                newResponse1 += "<b>" + responseArray1[i] + "</b>";
            }
        }
        let newResponse2 = newResponse1.split("*").join("<br>");

        let responseArray2 = newResponse2.split(" ")
        for (let i = 0; i < responseArray2.length; i++) {
            let nextWord = responseArray2[i];
            if(i === 0) {
                if (nextWord.startsWith("undefined")) {
                    nextWord = nextWord.slice(9);
                }
            }
            delayPara(i, nextWord + " ");
            
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider