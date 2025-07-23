import React, { useState } from "react";
import StepIdeas from "./components/StepIdeas";
import StepStories from "./components/StepStories";
import StepScenes from "./components/StepScenes";
import "./App.css";

export default function App() {
 const [step, setStep] = useState(1);
 const [ideas, setIdeas] = useState([]);
 const [selectedIdeas, setSelectedIdeas] = useState([]);
 const [stories, setStories] = useState([]);
 const [selectedStories, setSelectedStories] = useState([]);
 const [scenes, setScenes] = useState([]);

 return (
  <div className="container">
   <div className="header">
    <h1>🎭 Story Flow Client</h1>
    <p>Tạo câu chuyện AI từ ý tưởng đến cảnh quay (kết nối MCP Server)</p>
   </div>
   <div className="steps-container">
    <StepIdeas
     active={step === 1}
     onNext={() => setStep(2)}
     setIdeas={setIdeas}
     ideas={ideas}
     selectedIdeas={selectedIdeas}
     setSelectedIdeas={setSelectedIdeas}
    />
    <StepStories
     active={step === 2}
     onNext={() => setStep(3)}
     ideas={ideas}
     selectedIdeas={selectedIdeas}
     setSelectedIdeas={setSelectedIdeas}
     stories={stories}
     setStories={setStories}
     selectedStories={selectedStories}
     setSelectedStories={setSelectedStories}
    />
    <StepScenes
     active={step === 3}
     stories={stories}
     selectedStories={selectedStories}
     setSelectedStories={setSelectedStories}
     scenes={scenes}
     setScenes={setScenes}
    />
   </div>
  </div>
 );
}
