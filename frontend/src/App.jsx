




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




import { useState } from "react"

function App() {

const [file, setFile] = useState(null)
const [result, setResult] = useState("")
const [status, setStatus] = useState("idle")

const upload = async () => {


if (!file) {
  alert("Please upload an audio file")
  return
}

setStatus("analyzing")
setResult("")

const formData = new FormData()
formData.append("file", file)

const res = await fetch("http://localhost:9090/detect", {
  method: "POST",
  body: formData
})

const text = await res.text()

setTimeout(() => {
  setResult(text)
  setStatus("done")
}, 2000)


}

return ( <div className="container">

  <h1 className="title">Deepfake Voice Detection</h1>

  <div className="grid">

    <div className="left">

      <h2>Upload Audio</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>
        Detect Voice
      </button>

    </div>

    <div className="right">

      <h2 className="result-title">🤔</h2>

      {status === "analyzing" && (
        <div className="scanner">
          <div className="heartbeat"></div>
          <p>AI Analyzing Voice Pattern...</p>
        </div>
      )}

      {status === "done" && (
        <div className={`result-card ${result.toLowerCase().includes("fake") ? "fake" : "real"}`}>
          {result}
        </div>
      )}

    </div>

  </div>

</div>


)
}

export default App
