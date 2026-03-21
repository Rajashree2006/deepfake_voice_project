




// import { useState } from "react"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState("")
//   const [loading, setLoading] = useState(false)

//   const upload = async () => {

//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setLoading(true)
//     setResult("")

//     const formData = new FormData()
//     formData.append("file", file)

//     const res = await fetch("http://localhost:9090/detect", {
//       method: "POST",
//       body: formData
//     })

//     const text = await res.text()

//     setTimeout(() => {
//       setResult(text)
//       setLoading(false)
//     }, 1500)

//   }

//   return (
//     <div className="container">

//       <h1 className="title">Deepfake Voice Detection</h1>

//       <div className="grid">

//         <div className="left">

//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <br />

//           <button onClick={upload}>
//             Detect Voice
//           </button>

//         </div>

//         <div className="right">

//           <h2>Result</h2>

//           {loading && (
//             <div className="loader">
//               <div className="pulse"></div>
//               <p>Analyzing Voice...</p>
//             </div>
//           )}

//           {!loading && result && (
//             <div className="result">
//               {result}
//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   )
// }

// export default App




// import { useState } from "react"

// function App() {

// const [file, setFile] = useState(null)
// const [result, setResult] = useState("")
// const [status, setStatus] = useState("idle")

// const upload = async () => {


// if (!file) {
//   alert("Please upload an audio file")
//   return
// }

// setStatus("analyzing")
// setResult("")

// const formData = new FormData()
// formData.append("file", file)

// const res = await fetch("http://localhost:9090/detect", {
//   method: "POST",
//   body: formData
// })

// const text = await res.text()

// setTimeout(() => {
//   setResult(text)
//   setStatus("done")
// }, 2000)


// }

// return ( <div className="container">

//   <h1 className="title">Deepfake Voice Detection</h1>

//   <div className="grid">

//     <div className="left">

//       <h2>Upload Audio</h2>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <button onClick={upload}>
//         Detect Voice
//       </button>

//     </div>

//     <div className="right">

//       <h2 className="result-title">🤔</h2>

//       {status === "analyzing" && (
//         <div className="scanner">
//           <div className="heartbeat"></div>
//           <p>AI Analyzing Voice Pattern...</p>
//         </div>
//       )}

//       {status === "done" && (
//         <div className={`result-card ${result.toLowerCase().includes("fake") ? "fake" : "real"}`}>
//           {result}
//         </div>
//       )}

//     </div>

//   </div>

// </div>


// )
// }

// export default App



// import { useState } from "react"

// function App() {

// const [file, setFile] = useState(null)
// const [result, setResult] = useState("")
// const [status, setStatus] = useState("idle")

// const upload = async () => {

// if (!file) {
//   alert("Please upload an audio file")
//   return
// }

// setStatus("analyzing")
// setResult("")

// const formData = new FormData()
// formData.append("file", file)

// const res = await fetch("http://localhost:9090/detect", {
//   method: "POST",
//   body: formData
// })

// const text = await res.text()

// setTimeout(() => {
//   setResult(text)
//   setStatus("done")
// }, 2000)

// }

// const getEmoji = () => {
//   if (status === "analyzing") return "🤔"
//   if (status === "done" && result.toLowerCase().includes("fake")) return "🤖"
//   if (status === "done" && result.toLowerCase().includes("real")) return "🤠"
//   return "🙂"
// }

// return (

// <div className="container">

//   <h1 className="title">Deepfake Voice Detection</h1>

//   <div className="grid">

//     <div className="left">

//       <h2>Upload Audio</h2>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <button onClick={upload}>
//         Detect Voice
//       </button>

//     </div>

//     <div className="right">

//       <h2 className="result-title">{getEmoji()}</h2>

//       {status === "analyzing" && (
//         <div className="scanner">
//           <div className="heartbeat"></div>
//           <p>AI Analyzing Voice Pattern...</p>
//         </div>
//       )}

//       {status === "done" && (
//         <div className={`result-card ${result.toLowerCase().includes("fake") ? "fake" : "real"}`}>
//           {result}
//         </div>
//       )}

//     </div>

//   </div>

// </div>

// )
// }

// export default App




// import { useState } from "react"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState(null)
//   const [status, setStatus] = useState("idle")

//   const upload = async () => {

//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setStatus("analyzing")
//     setResult(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const res = await fetch("http://localhost:9090/detect", {
//         method: "POST",
//         body: formData
//       })

//       const data = await res.json()

//       setTimeout(() => {
//         setResult(data)
//         setStatus("done")
//       }, 1500)

//     } catch (err) {
//       console.error(err)
//       setStatus("error")
//     }
//   }

//   const getEmoji = () => {
//     if (status === "analyzing") return "🤔"
//     if (status === "done" && result?.label === "FAKE") return "🤖"
//     if (status === "done" && result?.label === "REAL") return "🤠"
//     return "🙂"
//   }

//   return (

//     <div className="container">

//       <h1 className="title">Deepfake Voice Detection</h1>

//       <div className="grid">

//         {/* LEFT PANEL */}
//         <div className="left">

//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <button onClick={upload}>
//             Detect Voice
//           </button>

//         </div>

//         {/* RIGHT PANEL */}
//         <div className="right">

//           <h2 className="result-title">{getEmoji()}</h2>

//           {status === "analyzing" && (
//             <div className="scanner">
//               <div className="heartbeat"></div>
//               <p>AI Analyzing Voice Pattern...</p>
//             </div>
//           )}

//           {status === "error" && (
//             <div className="result-card">
//               Error processing audio
//             </div>
//           )}

//           {status === "done" && result && (
//             <div>

//               {/* RESULT */}
//               <div className={`result-card ${result.label === "FAKE" ? "fake" : "real"}`}>
//                 {result.label} ({(result.probability * 100).toFixed(2)}%)
//               </div>

//               {/* SPECTROGRAM */}
//               <h3>Spectrogram</h3>
//               <img
//                 src={`http://localhost:9090/images/${result.spectrogram}`}
//                 width="100%"
//                 alt="spectrogram"
//               />

//               {/* CNN ACTIVATIONS */}
//               <h3>CNN Activations</h3>
//               {result.activations.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`http://localhost:9090/images/${img}`}
//                   width="100%"
//                   alt={`activation-${i}`}
//                 />
//               ))}

//               {/* FEATURES */}
//               <h3>Feature Strength</h3>
//               <img
//                 src={`http://localhost:9090/images/${result.features}`}
//                 width="100%"
//                 alt="features"
//               />

//             </div>
//           )}

//         </div>

//       </div>

//     </div>

//   )
// }

// export default App



// import { useState } from "react"
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from "recharts"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState(null)
//   const [status, setStatus] = useState("idle")

//   const upload = async () => {
//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setStatus("analyzing")
//     setResult(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const res = await fetch("http://localhost:9090/detect", {
//         method: "POST",
//         body: formData
//       })

//       const data = await res.json()

//       setTimeout(() => {
//         setResult(data)
//         setStatus("done")
//       }, 1000)

//     } catch (err) {
//       console.error(err)
//       setStatus("error")
//     }
//   }

//   const getEmoji = () => {
//     if (status === "analyzing") return "🤔"
//     if (status === "done" && result?.label === "FAKE") return "🤖"
//     if (status === "done" && result?.label === "REAL") return "🤠"
//     return "🙂"
//   }

//   const formatData = (arr) =>
//     arr.map((v, i) => ({ name: i, value: v }))

//   return (
//     <div className="container">

//       <h1 className="title">Deepfake Voice Detection</h1>

//       <div className="grid">

//         {/* LEFT */}
//         <div className="left">
//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <button onClick={upload}>
//             Detect Voice
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="right">

//           <h2 className="result-title">{getEmoji()}</h2>

//           {status === "analyzing" && (
//             <p>Analyzing...</p>
//           )}

//           {status === "error" && (
//             <div>Error processing audio</div>
//           )}

//           {status === "done" && result && (
//             <div>

//               {/* RESULT */}
//               <div className={`result-card ${result.label === "FAKE" ? "fake" : "real"}`}>
//                 {result.label} ({(result.probability * 100).toFixed(2)}%)
//               </div>

//               {/* CONFIDENCE BAR */}
//               <div style={{ margin: "20px 0" }}>
//                 <div style={{ background: "#333", height: "10px", borderRadius: "5px" }}>
//                   <div
//                     style={{
//                       width: `${result.probability * 100}%`,
//                       height: "10px",
//                       background: result.label === "FAKE" ? "red" : "green"
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* BLOCK 1 */}
//               <h3>Block 1</h3>
//               <ResponsiveContainer width="100%" height={150}>
//                 <BarChart data={formatData(result.activations.block1)}>
//                   <XAxis dataKey="name" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* BLOCK 2 */}
//               <h3>Block 2</h3>
//               <ResponsiveContainer width="100%" height={150}>
//                 <BarChart data={formatData(result.activations.block2)}>
//                   <XAxis dataKey="name" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* BLOCK 3 */}
//               <h3>Block 3</h3>
//               <ResponsiveContainer width="100%" height={150}>
//                 <BarChart data={formatData(result.activations.block3)}>
//                   <XAxis dataKey="name" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* FEATURES */}
//               <h3>Feature Strength</h3>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={formatData(result.features)}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" />
//                 </BarChart>
//               </ResponsiveContainer>

//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   )
// }

// export default App



// import { useState } from "react"
// import {
//   BarChart, Bar,
//   LineChart, Line,
//   XAxis, YAxis,
//   Tooltip, CartesianGrid,
//   ResponsiveContainer
// } from "recharts"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState(null)
//   const [status, setStatus] = useState("idle")

//   const upload = async () => {
//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setStatus("analyzing")
//     setResult(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const res = await fetch("http://localhost:9090/detect", {
//         method: "POST",
//         body: formData
//       })

//       const data = await res.json()

//       setTimeout(() => {
//         setResult(data)
//         setStatus("done")
//       }, 1000)

//     } catch (err) {
//       console.error(err)
//       setStatus("error")
//     }
//   }

//   const getEmoji = () => {
//     if (status === "analyzing") return "🤔"
//     if (status === "done" && result?.label === "FAKE") return "🤖"
//     if (status === "done" && result?.label === "REAL") return "🤠"
//     return "🙂"
//   }

//   const formatData = (arr) =>
//     arr.map((v, i) => ({ name: i, value: v }))

//   const chartGrid = (
//     <CartesianGrid stroke="#444" strokeDasharray="3 3" />
//   )

//   const tooltipStyle = {
//     backgroundColor: "#222",
//     border: "1px solid #555",
//     color: "#fff"
//   }

//   return (
//     <div className="container">

//       <h1 className="title">Deepfake Voice Detection</h1>

//       <div className="grid">

//         {/* LEFT PANEL */}
//         <div className="left">
//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <button onClick={upload}>
//             Detect Voice
//           </button>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="right">

//           <h2 className="result-title">{getEmoji()}</h2>

//           {/* {status === "analyzing" && (
//             <p>Analyzing...</p>
//           )} */}
//          {status === "analyzing" && (
//   <div className="wave-loader">
//     🎧 Listening to audio...
//     <div className="wave">
//       <span></span>
//       <span></span>
//       <span></span>
//       <span></span>
//       <span></span>
//     </div>
//   </div>
// )}
//           {status === "error" && (
//             <div>Error processing audio</div>
//           )}

//           {status === "done" && result && (
//             <div>

//               {/* RESULT CARD */}
//               <div
//                 className={`result-card ${
//                   result.label === "FAKE" ? "fake" : "real"
//                 }`}
//               >
//                 {result.label} ({(result.probability * 100).toFixed(2)}%)
//               </div>

//               {/* CONFIDENCE BAR */}
//               <div style={{ margin: "20px 0" }}>
//                 <div
//                   style={{
//                     background: "#333",
//                     height: "10px",
//                     borderRadius: "5px"
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${result.probability * 100}%`,
//                       height: "10px",
//                       borderRadius: "5px",
//                       background:
//                         result.label === "FAKE"
//                           ? "#ff4d4d"
//                           : "#22c55e"
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* BLOCK 1 */}
//               <h3>Block 1</h3>
//               <ResponsiveContainer width="100%" height={180}>
//                 <BarChart data={formatData(result.activations.block1)}>
//                   {chartGrid}
//                   <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
//                   <YAxis tick={{ fill: "#ddd" }} />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Bar
//                     dataKey="value"
//                     fill="#1E90FF"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* BLOCK 2 */}
//               <h3>Block 2</h3>
//               <ResponsiveContainer width="100%" height={180}>
//                 <BarChart data={formatData(result.activations.block2)}>
//                   {chartGrid}
//                   <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
//                   <YAxis tick={{ fill: "#ddd" }} />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Bar
//                     dataKey="value"
//                     fill="#00C49F"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* BLOCK 3 */}
//               <h3>Block 3</h3>
//               <ResponsiveContainer width="100%" height={180}>
//                 <BarChart data={formatData(result.activations.block3)}>
//                   {chartGrid}
//                   <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
//                   <YAxis tick={{ fill: "#ddd" }} />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Bar
//                     dataKey="value"
//                     fill="#FFBB28"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* FEATURE STRENGTH */}
//               <h3>Feature Strength</h3>
//               <ResponsiveContainer width="100%" height={220}>
//                 <LineChart data={formatData(result.features)}>
//                   {chartGrid}
//                   <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
//                   <YAxis tick={{ fill: "#ddd" }} />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#FF6347"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>

//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   )
// }

// export default App







// import { useState, useRef } from "react"
// import {
//   BarChart, Bar,
//   LineChart, Line,
//   XAxis, YAxis,
//   Tooltip, CartesianGrid,
//   ResponsiveContainer
// } from "recharts"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState(null)
//   const [status, setStatus] = useState("idle")

//   const audioRef = useRef(null)
//   const [isPlaying, setIsPlaying] = useState(false)

//   // AUDIO PLAY / PAUSE FUNCTION
//   const togglePlay = () => {
//     if (!audioRef.current) return

//     if (isPlaying) {
//       audioRef.current.pause()
//     } else {
//       audioRef.current.play()
//     }

//     setIsPlaying(!isPlaying)
//   }

//   // FILE UPLOAD FUNCTION
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]

//     if (!selectedFile) return

//     setFile(selectedFile)
//     setIsPlaying(false)

//     const audioURL = URL.createObjectURL(selectedFile)

//     if (audioRef.current) {
//       audioRef.current.src = audioURL
//     }
//   }

//   // DETECT FUNCTION
//   const upload = async () => {

//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setStatus("analyzing")
//     setResult(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {

//       const res = await fetch("http://localhost:9090/detect", {
//         method: "POST",
//         body: formData
//       })

//       const data = await res.json()

//       setTimeout(() => {
//         setResult(data)
//         setStatus("done")
//       }, 1000)

//     } catch (err) {

//       console.error(err)
//       setStatus("error")

//     }
//   }

//   // RESULT EMOJI
//   const getEmoji = () => {

//     if (status === "analyzing") return "🤔"
//     if (status === "done" && result?.label === "FAKE") return "🤖"
//     if (status === "done" && result?.label === "REAL") return "🤠"

//     return "🙂"
//   }

//   // FORMAT CHART DATA
//   const formatData = (arr) =>
//     arr.map((v, i) => ({ name: i, value: v }))

//   const chartGrid =
//     <CartesianGrid stroke="#444" strokeDasharray="3 3" />

//   const tooltipStyle = {
//     backgroundColor: "#222",
//     border: "1px solid #555",
//     color: "#fff"
//   }

//   return (

//     <div className="container">

//       <h1 className="title">
//         Deepfake Voice Detection
//       </h1>

//       <div className="grid">

//         {/* LEFT PANEL */}

//         <div className="left">

//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//           />

//           {/* AUDIO PLAYER (HIDDEN ELEMENT) */}

//           <audio
//             ref={audioRef}
//             onEnded={() => setIsPlaying(false)}
//           />

//           {/* PLAY BUTTON */}

//           {file && (

//             <button
//               onClick={togglePlay}
//               style={{ marginTop: "10px" }}
//             >

//               {isPlaying
//                 ? "Pause Audio ⏸️"
//                 : "Play Audio ▶️"}

//             </button>

//           )}

//           {/* DETECT BUTTON */}

//           <button
//             onClick={upload}
//             style={{ marginTop: "10px" }}
//           >

//             Detect Voice

//           </button>

//         </div>


//         {/* RIGHT PANEL */}

//         <div className="right">

//           <h2 className="result-title">
//             {getEmoji()}
//           </h2>


//           {/* WAVE LOADER */}

//           {status === "analyzing" && (

//             <div className="wave-loader">

//               🎧 Listening to audio...

//               <div className="wave">

//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>

//               </div>

//             </div>

//           )}


//           {/* ERROR */}

//           {status === "error" && (

//             <div>
//               Error processing audio
//             </div>

//           )}


//           {/* RESULT SECTION */}

//           {status === "done" && result && (

//             <div>


//               {/* RESULT CARD */}

//               <div
//                 className={`result-card ${
//                   result.label === "FAKE"
//                     ? "fake"
//                     : "real"
//                 }`}
//               >

//                 {result.label}
//                 (
//                 {(result.probability * 100).toFixed(2)}
//                 %
//                 )

//               </div>


//               {/* CONFIDENCE BAR */}

//               <div style={{ margin: "20px 0" }}>

//                 <div
//                   style={{
//                     background: "#333",
//                     height: "10px",
//                     borderRadius: "5px"
//                   }}
//                 >

//                   <div
//                     style={{
//                       width:
//                         `${result.probability * 100}%`,
//                       height: "10px",
//                       borderRadius: "5px",
//                       background:
//                         result.label === "FAKE"
//                           ? "#ff4d4d"
//                           : "#22c55e"
//                     }}
//                   />

//                 </div>

//               </div>


//               {/* BLOCK 1 */}

//               <h3>Block 1</h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={180}
//               >

//                 <BarChart
//                   data={
//                     formatData(
//                       result.activations.block1
//                     )
//                   }
//                 >

//                   {chartGrid}

//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <YAxis
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <Tooltip
//                     contentStyle={tooltipStyle}
//                   />

//                   <Bar
//                     dataKey="value"
//                     fill="#1E90FF"
//                     radius={[4,4,0,0]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>


//               {/* BLOCK 2 */}

//               <h3>Block 2</h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={180}
//               >

//                 <BarChart
//                   data={
//                     formatData(
//                       result.activations.block2
//                     )
//                   }
//                 >

//                   {chartGrid}

//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <YAxis
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <Tooltip
//                     contentStyle={tooltipStyle}
//                   />

//                   <Bar
//                     dataKey="value"
//                     fill="#00C49F"
//                     radius={[4,4,0,0]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>


//               {/* BLOCK 3 */}

//               <h3>Block 3</h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={180}
//               >

//                 <BarChart
//                   data={
//                     formatData(
//                       result.activations.block3
//                     )
//                   }
//                 >

//                   {chartGrid}

//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <YAxis
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <Tooltip
//                     contentStyle={tooltipStyle}
//                   />

//                   <Bar
//                     dataKey="value"
//                     fill="#FFBB28"
//                     radius={[4,4,0,0]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>


//               {/* FEATURE STRENGTH */}

//               <h3>Feature Strength</h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={220}
//               >

//                 <LineChart
//                   data={
//                     formatData(
//                       result.features
//                     )
//                   }
//                 >

//                   {chartGrid}

//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <YAxis
//                     tick={{ fill: "#ddd" }}
//                   />

//                   <Tooltip
//                     contentStyle={tooltipStyle}
//                   />

//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#FF6347"
//                     strokeWidth={2}
//                     dot={false}
//                   />

//                 </LineChart>

//               </ResponsiveContainer>

//             </div>

//           )}

//         </div>

//       </div>

//     </div>

//   )

// }

// export default App

// import { useState, useRef } from "react"
// import {
//   BarChart, Bar,
//   LineChart, Line,
//   XAxis, YAxis,
//   Tooltip, CartesianGrid,
//   ResponsiveContainer
// } from "recharts"

// function App() {

//   const [file, setFile] = useState(null)
//   const [result, setResult] = useState(null)
//   const [status, setStatus] = useState("idle")

//   const audioRef = useRef(null)

//   const [isPlaying, setIsPlaying] = useState(false)
//   const [duration, setDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(0)

//   // PLAY / PAUSE AUDIO
//   const togglePlay = () => {

//     if (!audioRef.current) return

//     if (isPlaying)
//       audioRef.current.pause()
//     else
//       audioRef.current.play()

//     setIsPlaying(!isPlaying)
//   }

//   // FORMAT AUDIO TIME
//   const formatTime = (time) => {

//     if (!time) return "00:00"

//     const minutes = Math.floor(time / 60)
//     const seconds = Math.floor(time % 60)

//     return `${minutes}:${seconds
//       .toString()
//       .padStart(2, "0")}`
//   }

//   // FILE SELECT
//   const handleFileChange = (e) => {

//     const selectedFile = e.target.files[0]

//     if (!selectedFile) return

//     setFile(selectedFile)
//     setIsPlaying(false)
//     setCurrentTime(0)

//     const audioURL = URL.createObjectURL(selectedFile)

//     if (audioRef.current)
//       audioRef.current.src = audioURL
//   }

//   // DETECT AUDIO
//   const upload = async () => {

//     if (!file) {
//       alert("Please upload an audio file")
//       return
//     }

//     setStatus("analyzing")
//     setResult(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {

//       const res = await fetch(
//         "http://localhost:9090/detect",
//         {
//           method: "POST",
//           body: formData
//         }
//       )

//       const data = await res.json()

//       setTimeout(() => {

//         setResult(data)
//         setStatus("done")

//       }, 1000)

//     } catch (err) {

//       console.error(err)
//       setStatus("error")

//     }
//   }

//   // RESULT EMOJI
//   const getEmoji = () => {

//     if (status === "analyzing") return "🤔"

//     if (
//       status === "done" &&
//       result?.label === "FAKE"
//     )
//       return "🤖"

//     if (
//       status === "done" &&
//       result?.label === "REAL"
//     )
//       return "🤠"

//     return "🙂"
//   }

//   // CHART FORMATTER
//   const formatData = (arr) =>
//     arr.map((v, i) => ({
//       name: i,
//       value: v
//     }))

//   const chartGrid =
//     <CartesianGrid
//       stroke="#444"
//       strokeDasharray="3 3"
//     />

//   const tooltipStyle = {
//     backgroundColor: "#222",
//     border: "1px solid #555",
//     color: "#fff"
//   }

//   return (

//     <div className="container">

//       <h1 className="title">
//         Deepfake Voice Detection
//       </h1>

//       <div className="grid">

//         {/* LEFT PANEL */}

//         <div className="left">

//           <h2>Upload Audio</h2>

//           <input
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//           />

//           {/* AUDIO ELEMENT */}

//           <audio
//             ref={audioRef}
//             onLoadedMetadata={() =>
//               setDuration(
//                 audioRef.current.duration
//               )
//             }
//             onTimeUpdate={() =>
//               setCurrentTime(
//                 audioRef.current.currentTime
//               )
//             }
//             onEnded={() =>
//               setIsPlaying(false)
//             }
//           />

//           {/* PLAY BUTTON */}

//           {file && (

//             <button
//               onClick={togglePlay}
//               style={{
//                 marginTop: "10px"
//               }}
//             >

//               {isPlaying
//                 ? "Pause Audio ⏸️"
//                 : "Play Audio ▶️"}

//             </button>

//           )}

//           {/* SEEK BAR */}

//           {file && (

//             <div
//               style={{
//                 marginTop: "10px"
//               }}
//             >

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent:
//                     "space-between",
//                   fontSize: "12px",
//                   color: "#aaa"
//                 }}
//               >

//                 <span>
//                   {formatTime(
//                     currentTime
//                   )}
//                 </span>

//                 <span>
//                   {formatTime(
//                     duration
//                   )}
//                 </span>

//               </div>

//               <input
//                 type="range"
//                 min="0"
//                 max={duration}
//                 step="0.01"
//                 value={currentTime}
//                 onChange={(e) => {

//                   const time =
//                     e.target.value

//                   audioRef.current.currentTime =
//                     time

//                   setCurrentTime(time)

//                 }}
//                 style={{
//                   width: "100%",
//                   marginTop: "5px"
//                 }}
//               />

//             </div>

//           )}

//           {/* DETECT BUTTON */}

//           <button
//             onClick={upload}
//             style={{
//               marginTop: "10px"
//             }}
//           >

//             Detect Voice

//           </button>

//         </div>

//         {/* RIGHT PANEL */}

//         <div className="right">

//           <h2 className="result-title">
//             {getEmoji()}
//           </h2>

//           {/* WAVE LOADER */}

//           {status === "analyzing" && (

//             <div className="wave-loader">

//               🎧 Listening to audio...

//               <div className="wave">

//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>

//               </div>

//             </div>

//           )}

//           {/* ERROR */}

//           {status === "error" && (

//             <div>
//               Error processing audio
//             </div>

//           )}

//           {/* RESULT */}

//           {status === "done" &&
//             result && (

//               <div>

//                 <div
//                   className={`result-card ${
//                     result.label === "FAKE"
//                       ? "fake"
//                       : "real"
//                   }`}
//                 >

//                   {result.label}
//                   (
//                   {(
//                     result.probability *
//                     100
//                   ).toFixed(2)}
//                   %
//                   )

//                 </div>

//                 <div
//                   style={{
//                     margin:
//                       "20px 0"
//                   }}
//                 >

//                   <div
//                     style={{
//                       background:
//                         "#333",
//                       height:
//                         "10px",
//                       borderRadius:
//                         "5px"
//                     }}
//                   >

//                     <div
//                       style={{
//                         width:
//                           `${result.probability * 100}%`,
//                         height:
//                           "10px",
//                         borderRadius:
//                           "5px",
//                         background:
//                           result.label ===
//                           "FAKE"
//                             ? "#ff4d4d"
//                             : "#22c55e"
//                       }}
//                     />

//                   </div>

//                 </div>

//                 {/* BLOCK 1 */}

//                 <h3>Block 1</h3>

//                 <ResponsiveContainer
//                   width="100%"
//                   height={180}
//                 >

//                   <BarChart
//                     data={formatData(
//                       result.activations
//                         .block1
//                     )}
//                   >

//                     {chartGrid}

//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <YAxis
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <Tooltip
//                       contentStyle={
//                         tooltipStyle
//                       }
//                     />

//                     <Bar
//                       dataKey="value"
//                       fill="#1E90FF"
//                       radius={[
//                         4,
//                         4,
//                         0,
//                         0
//                       ]}
//                     />

//                   </BarChart>

//                 </ResponsiveContainer>

//                 {/* BLOCK 2 */}

//                 <h3>Block 2</h3>

//                 <ResponsiveContainer
//                   width="100%"
//                   height={180}
//                 >

//                   <BarChart
//                     data={formatData(
//                       result.activations
//                         .block2
//                     )}
//                   >

//                     {chartGrid}

//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <YAxis
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <Tooltip
//                       contentStyle={
//                         tooltipStyle
//                       }
//                     />

//                     <Bar
//                       dataKey="value"
//                       fill="#00C49F"
//                       radius={[
//                         4,
//                         4,
//                         0,
//                         0
//                       ]}
//                     />

//                   </BarChart>

//                 </ResponsiveContainer>

//                 {/* BLOCK 3 */}

//                 <h3>Block 3</h3>

//                 <ResponsiveContainer
//                   width="100%"
//                   height={180}
//                 >

//                   <BarChart
//                     data={formatData(
//                       result.activations
//                         .block3
//                     )}
//                   >

//                     {chartGrid}

//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <YAxis
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <Tooltip
//                       contentStyle={
//                         tooltipStyle
//                       }
//                     />

//                     <Bar
//                       dataKey="value"
//                       fill="#FFBB28"
//                       radius={[
//                         4,
//                         4,
//                         0,
//                         0
//                       ]}
//                     />

//                   </BarChart>

//                 </ResponsiveContainer>

//                 {/* FEATURES */}

//                 <h3>Feature Strength</h3>

//                 <ResponsiveContainer
//                   width="100%"
//                   height={220}
//                 >

//                   <LineChart
//                     data={formatData(
//                       result.features
//                     )}
//                   >

//                     {chartGrid}

//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <YAxis
//                       tick={{
//                         fill:
//                           "#ddd"
//                       }}
//                     />

//                     <Tooltip
//                       contentStyle={
//                         tooltipStyle
//                       }
//                     />

//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="#FF6347"
//                       strokeWidth={2}
//                       dot={false}
//                     />

//                   </LineChart>

//                 </ResponsiveContainer>

//               </div>

//             )}

//         </div>

//       </div>

//     </div>

//   )

// }

// export default App










import { useState, useRef } from "react"
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts"

function App() {

  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState("idle")

  const audioRef = useRef(null)
  const canvasRef = useRef(null)

  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // ================= AUDIO VISUALIZER =================

  const setupVisualizer = () => {
    if (!audioRef.current) return

    const audioContext = new window.AudioContext()
    const analyser = audioContext.createAnalyser()

    analyser.fftSize = 128

    const source = audioContext.createMediaElementSource(audioRef.current)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    audioContextRef.current = audioContext
    analyserRef.current = analyser

    drawVisualizer()
  }

  const drawVisualizer = () => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current

    if (!canvas || !analyser) return

    const ctx = canvas.getContext("2d")

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i]

        ctx.fillStyle = "rgb(30,144,255)"

        ctx.fillRect(
          x,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        )

        x += barWidth
      }
    }

    draw()
  }

  // ================= PLAY / PAUSE =================

  const togglePlay = () => {
    if (!audioRef.current) return

    if (!audioContextRef.current)
      setupVisualizer()

    if (isPlaying)
      audioRef.current.pause()
    else
      audioRef.current.play()

    setIsPlaying(!isPlaying)
  }

  // ================= TIME FORMAT =================

  const formatTime = (time) => {
    if (!time) return "00:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // ================= FILE SELECT =================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setIsPlaying(false)
    setCurrentTime(0)

    const audioURL = URL.createObjectURL(selectedFile)

    if (audioRef.current)
      audioRef.current.src = audioURL
  }

  // ================= DETECT =================

  const upload = async () => {
    if (!file) {
      alert("Please upload an audio file")
      return
    }

    setStatus("analyzing")
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(
        "http://localhost:9090/detect",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await res.json()

      setTimeout(() => {
        setResult(data)
        setStatus("done")
      }, 1000)

    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  // ================= EMOJI =================

  const getEmoji = () => {
    if (status === "analyzing") return "🤔"

    if (status === "done" && result?.label === "FAKE")
      return "🤖"

    if (status === "done" && result?.label === "REAL")
      return "🤠"

    return "🙂"
  }

  // ================= CHART =================

  const formatData = (arr) =>
    arr.map((v, i) => ({ name: i, value: v }))

  const chartGrid = (
    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
  )

  const tooltipStyle = {
    backgroundColor: "#222",
    border: "1px solid #555",
    color: "#fff"
  }

  return (
    <div className="container">

      <h1 className="title">
        Deepfake Voice Detection
      </h1>

      <div className="grid">

        {/* LEFT PANEL */}

        <div className="left">

          <h2>Upload Audio</h2>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
          />

          <audio
            ref={audioRef}
            onLoadedMetadata={() =>
              setDuration(audioRef.current.duration)
            }
            onTimeUpdate={() =>
              setCurrentTime(audioRef.current.currentTime)
            }
            onEnded={() => setIsPlaying(false)}
          />

          {file && (
            <button onClick={togglePlay} style={{ marginTop: "10px" }}>
              {isPlaying ? "Pause Audio ⏸️" : "Play Audio ▶️"}
            </button>
          )}

          {/* VISUALIZER */}

          {file && (
            <>
              <canvas
                ref={canvasRef}
                width="320"
                height="80"
                style={{
                  marginTop: 10,
                  background: "#111",
                  borderRadius: 6
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#aaa" }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <input
                type="range"
                min="0"
                max={duration}
                step="0.01"
                value={currentTime}
                onChange={(e) => {
                  const time = e.target.value
                  audioRef.current.currentTime = time
                  setCurrentTime(time)
                }}
                style={{
                  width: "70%",
                  marginTop: "8px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  accentColor: "#a855f7"
                }}
              />
            </>
          )}

          <button onClick={upload} style={{ marginTop: "10px" }}>
            Detect Voice
          </button>

        </div>

        {/* RIGHT PANEL */}

        <div className="right">

          <h2 className="result-title">{getEmoji()}</h2>

          {status === "analyzing" && (
            <div className="wave-loader">
              🎧 Listening to audio...
              <div className="wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {status === "error" && (
            <div>Error processing audio</div>
          )}

          {status === "done" && result && (
            <div>

              <div className={`result-card ${result.label === "FAKE" ? "fake" : "real"}`}>
                {result.label} ({(result.probability * 100).toFixed(2)}%)
              </div>

              {/* BLOCK 1 */}
              <h3>Block 1</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={formatData(result.activations.block1)}>
                  {chartGrid}
                  <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
                  <YAxis tick={{ fill: "#ddd" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#1E90FF" />
                </BarChart>
              </ResponsiveContainer>

              {/* BLOCK 2 */}
              <h3>Block 2</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={formatData(result.activations.block2)}>
                  {chartGrid}
                  <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
                  <YAxis tick={{ fill: "#ddd" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>

              {/* BLOCK 3 */}
              <h3>Block 3</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={formatData(result.activations.block3)}>
                  {chartGrid}
                  <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
                  <YAxis tick={{ fill: "#ddd" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>

              {/* FEATURES */}
              <h3>Feature Strength</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={formatData(result.features)}>
                  {chartGrid}
                  <XAxis dataKey="name" tick={{ fill: "#ddd" }} />
                  <YAxis tick={{ fill: "#ddd" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="value" stroke="#FF6347" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default App
