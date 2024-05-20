import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.profilepic} alt=''/>
        </div>
        <div className="main-container">
          {!showResult
          ?<>
            <div className="greet">
              <p>Hello, Gourab</p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Give me a quick walkthrough of The Byzantine Empire</p>
                <img src={assets.bulb} alt=''/>
              </div>
              <div className="card">
                <p>Brainstorm presentation ideas about a topic</p>
                <img src={assets.explore} alt=''/>
              </div>
              <div className="card">
                <p>I’m sick and need help crafting a text message for my boss</p>
                <img src={assets.draw} alt=''/>
              </div>
              <div className="card">
                <p>Explain what the keto diet is in simple terms</p>
                <img src={assets.bulb} alt=''/>
              </div>
            </div>
          </>
          :<div className='result'>
            <div className="result-title">
              <img src={assets.profilepic} alt=""/>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini} alt=""/>
              {loading
              ?<div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            </div>
          </div>}
          
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' className="text" />
              <div>
                <img src={assets.gallery} alt="" />
              </div>
              <div>
                <img src={assets.mic} alt="" />
              </div>
              <div>
                {input?<img onClick={()=>onSent()} src={assets.send} alt="" />:null}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
            </p>
          </div>
        </div>
    </div>
  )
}

export default Main
