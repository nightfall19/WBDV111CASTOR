// CHATBOT LOGIC
const chatBtn = document.querySelector('.chat-submit-btn');
const textarea = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

let chatStep = 0; 
let userData = {
    type: "", 
    name: "",
    email: "",
    phone: "",
    message: ""
};

const responses = {
    "hello": "Hi there! I'm Hiraya. How can Flor's Canteen help you today? Type 'Concern' or 'Feedback' to start.",
    "menu": "Our menu features classic Filipino favorites! You can check the 'Menu' page for details.",
    "hours": "We are open Mon-Fri (7am-5pm) and Sat (7am-4pm). We are closed on Sundays.",
    "location": "We are located at 1165 Morong St. Tondo, Manila.",
    "default": "I'm sorry, I didn't quite understand that. Please type 'Concern' or 'Feedback' so I can assist you better."
};

const addBotMessage = (text) => {
    const bMsg = document.createElement('div');
    bMsg.className = 'message bot-msg';
    bMsg.innerText = text;
    chatMessages.appendChild(bMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const sendMessage = () => {
    const text = textarea.value.trim();
    if (!text) return;

    // Display User Message
    const uMsg = document.createElement('div');
    uMsg.className = 'message user-msg';
    uMsg.innerText = text;
    chatMessages.appendChild(uMsg);
    textarea.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const lowerText = text.toLowerCase();

        // STEP 0: Start
        if (chatStep === 0) {
            if (lowerText.includes("concern")) {
                userData.type = "Concern";
                addBotMessage("I'm sorry to hear that. What is your Full Name?");
                chatStep = 1;
            } else if (lowerText.includes("feedback")) {
                userData.type = "Feedback";
                addBotMessage("We love feedback! What is your Full Name?");
                chatStep = 1;
            } else if (lowerText.includes("hi") || lowerText.includes("hello")) {
                addBotMessage(responses.hello);
            } else {
                addBotMessage(responses.default);
            }
        } 
        // STEP 1: Name
        else if (chatStep === 1) {
            userData.name = text;
            addBotMessage(`Nice to meet you, ${userData.name}. What is your Email Address?`);
            chatStep = 2;
        } 
        // STEP 2: Email
        else if (chatStep === 2) {
            userData.email = text;
            addBotMessage("Got it. What is your Contact Number? (Must be 11 digits)");
            chatStep = 3;
        } 
        // STEP 3: Phone Validation (The Fix)
        else if (chatStep === 3) {
            // Remove any spaces or dashes to check the actual digit count
            const cleanPhone = text.replace(/\D/g, ''); 
            
            if (cleanPhone.length !== 11) {
                addBotMessage("That doesn't look like a valid 11-digit number. What is your number again?");
                // We do NOT increment chatStep, so it stays on Step 3 until correct
            } else {
                userData.phone = text;
                addBotMessage(`Thank you. Now, please type your ${userData.type.toLowerCase()} below:`);
                chatStep = 4;
            }
        } 
        // STEP 4: Final Message
        else if (chatStep === 4) {
            userData.message = text;
            const finalReply = userData.type === "Concern" 
                ? `Thank you, ${userData.name}. Your concern has been received. We will contact you at ${userData.phone} soon.`
                : `Thank you for your feedback, ${userData.name}!`;

            addBotMessage(finalReply);
            chatStep = 0;
            userData = { type: "", name: "", email: "", phone: "", message: "" };
        }
    }, 700);
};

chatBtn.addEventListener('click', sendMessage);
textarea.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter' && !e.shiftKey) { 
        e.preventDefault(); 
        sendMessage(); 
    } 
});