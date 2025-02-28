const chatInput =  document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMeaage;
const API_KEY = "sk-7Pa1c22EziLHISrxbAVQT3B1bkFJY9WCOZiqdBhebjUy2XpH"; 


const createChatLi = (message,className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLI) =>{
    const API_URL ="https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLI.querySelector('p');

    const requestOptions = {
        method:"POST",
        Headers: {
            "content-Type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4o",
            "messages": [
              {
                "role": "user",
                "content": userMeaage}]
        })
    }
    fetch(API_URL,requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) =>{messageElement.textContent = "Hi, i'm your personal AI how can i help you!!!"})
}

const handleChat = () =>{
    userMeaage = chatInput.value.trim();
    if(!userMeaage) return;

    chatbox.appendChild(createChatLi(userMeaage,"outgoing"));
    setTimeout(() =>{
        const incomingChatLI = createChatLi("Thinking......","incoming")
        chatbox.appendChild(incomingChatLI);
        generateResponse(incomingChatLI);
    },600)

}
sendChatBtn.addEventListener("click",handleChat);