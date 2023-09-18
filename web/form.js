import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
const summ = document.querySelector("#summ")
const transcrip = document.querySelector("#transcrip")
const textTranscrip = document.querySelector("#textTranscrip")
const p = document.querySelector("#p")

form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    content.classList.add("placeholder")
    summ.classList.add("subtitle")
    transcrip.classList.add("subtitle")
    textTranscrip.classList.add("placeholder")
    textTranscrip.textContent=""
    const videoURL = input.value
    
    if (!videoURL.includes("shorts")){
        return content.textContent = "Esse vídeo não é um SHORT."
    }

    const [_,params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")
    console.log(videoID)

    content.textContent = "Obtendo o texto do áudio..."
    const transcription = await server.get("/summary/"+videoID)
    content.textContent = "Construindo o resumo"

    const summary = await server.post("/summary", {
        text: transcription.data.result,
    })

    content.textContent = summary.data.result
    textTranscrip.textContent = transcription.data.result
    content.classList.remove("placeholder")
    summ.classList.remove("subtitle")
    transcrip.classList.remove("subtitle")
    textTranscrip.classList.remove("placeholder")
    
    
})