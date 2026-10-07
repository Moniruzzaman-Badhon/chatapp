const defaultChats = [
    {
        id: 1,
        name: "Alex Johnson",
        image: "https://i.pravatar.cc/100?img=11",
        online: true,
        time: "10:24 AM",
        lastMessage: "Hey! How are you?",
        messages: [
            { type: "incoming", text: "Hey! How are you?", time: "10:12 AM" },
            { type: "outgoing", text: "I'm doing great! Thanks 😊", time: "10:15 AM" },
            { type: "incoming", text: "That's awesome! What are you working on these days?", time: "10:18 AM" },
            { type: "outgoing", text: "Working on my project 🚀<br>How about you?", time: "10:20 AM" },
            { type: "incoming", text: "Nice! I'm just finishing up some tasks.<br>Let's catch up later!", time: "10:22 AM" },
            { type: "outgoing", text: "Sure! Let's do that. 😁", time: "10:24 AM" }
        ]
    },
    {
        id: 2,
        name: "Sarah Williams",
        image: "https://i.pravatar.cc/100?img=47",
        online: true,
        time: "09:45 AM",
        lastMessage: "See you soon! 👋",
        messages: [
            { type: "incoming", text: "Hey! Are you free today?", time: "09:35 AM" },
            { type: "outgoing", text: "Yes, I think so. What's up?", time: "09:40 AM" },
            { type: "incoming", text: "Let's meet for coffee!", time: "09:43 AM" },
            { type: "incoming", text: "See you soon! 👋", time: "09:45 AM" }
        ]
    },
    {
        id: 3,
        name: "Michael Brown",
        image: "https://i.pravatar.cc/100?img=13",
        online: true,
        time: "Yesterday",
        lastMessage: "Working on my project 🚀",
        messages: [
            { type: "incoming", text: "How is your project going?", time: "Yesterday" },
            { type: "outgoing", text: "It's going really well.", time: "Yesterday" },
            { type: "incoming", text: "Working on my project 🚀", time: "Yesterday" }
        ]
    },
    {
        id: 4,
        name: "Emma Davis",
        image: "https://i.pravatar.cc/100?img=44",
        online: true,
        time: "Yesterday",
        lastMessage: "That sounds great!",
        messages: [
            { type: "incoming", text: "Are you joining the event?", time: "Yesterday" },
            { type: "outgoing", text: "Yes, I'll be there.", time: "Yesterday" },
            { type: "incoming", text: "That sounds great!", time: "Yesterday" }
        ]
    },
    {
        id: 5,
        name: "Daniel Wilson",
        image: "https://i.pravatar.cc/100?img=14",
        online: true,
        time: "Sunday",
        lastMessage: "Let's catch up this weekend.",
        messages: [
            { type: "incoming", text: "Hey! It's been a while.", time: "Sunday" },
            { type: "outgoing", text: "Yeah! We should meet soon.", time: "Sunday" },
            { type: "incoming", text: "Let's catch up this weekend.", time: "Sunday" }
        ]
    },
    {
        id: 6,
        name: "Olivia Martin",
        image: "https://i.pravatar.cc/100?img=45",
        online: true,
        time: "Saturday",
        lastMessage: "Haha 😂",
        messages: [
            { type: "incoming", text: "Did you see that video?", time: "Saturday" },
            { type: "outgoing", text: "Yes 😂 That was hilarious!", time: "Saturday" },
            { type: "incoming", text: "Haha 😂", time: "Saturday" }
        ]
    },
    {
        id: 7,
        name: "James Taylor",
        image: "https://i.pravatar.cc/100?img=15",
        online: true,
        time: "Friday",
        lastMessage: "Project is done!",
        messages: [
            { type: "incoming", text: "I finally finished my project!", time: "Friday" },
            { type: "outgoing", text: "That's awesome! 🎉", time: "Friday" },
            { type: "incoming", text: "Project is done!", time: "Friday" }
        ]
    },
    {
        id: 8,
        name: "Sophia Anderson",
        image: "https://i.pravatar.cc/100?img=46",
        online: true,
        time: "Thursday",
        lastMessage: "Okay, no worries!",
        messages: [
            { type: "incoming", text: "Can you send me the file?", time: "Thursday" },
            { type: "outgoing", text: "Sure, I'll send it shortly.", time: "Thursday" },
            { type: "incoming", text: "Okay, no worries!", time: "Thursday" }
        ]
    },
    {
        id: 9,
        name: "William Thomas",
        image: "https://i.pravatar.cc/100?img=16",
        online: true,
        time: "Wednesday",
        lastMessage: "See you tomorrow.",
        messages: [
            { type: "incoming", text: "Are you coming tomorrow?", time: "Wednesday" },
            { type: "outgoing", text: "Yes, I'll be there.", time: "Wednesday" },
            { type: "incoming", text: "See you tomorrow.", time: "Wednesday" }
        ]
    }
];

const STORAGE_KEY = "chatAppChats";
const CHAT_KEY = "chatAppCurrentChat";
const THEME_KEY = "chatAppTheme";

let chats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultChats;
let currentChatId = Number(localStorage.getItem(CHAT_KEY)) || 1;

const chatList = document.getElementById("chatList");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const searchInput = document.getElementById("searchInput");
const chatName = document.getElementById("chatName");
const chatStatus = document.getElementById("chatStatus");
const headerAvatar = document.getElementById("headerAvatar");
const themeBtn = document.getElementById("themeBtn");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const attachmentBtn = document.getElementById("attachmentBtn");
const fileInput = document.getElementById("fileInput");
const backButton = document.getElementById("backButton");
const conversationSidebar = document.querySelector(".conversation-sidebar");
const chatArea = document.querySelector(".chat-area");
const toast = document.getElementById("toast");

function saveChats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

function getCurrentChat() {
    return chats.find(chat => chat.id === currentChatId);
}

function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

function renderChatList(filter = "") {
    chatList.innerHTML = "";

    const term = filter.toLowerCase().trim();

    chats.forEach(chat => {
        const searchable = `${chat.name} ${chat.lastMessage}`.toLowerCase();

        if (term && !searchable.includes(term)) return;

        const item = document.createElement("button");
        item.className = `chat-item ${chat.id === currentChatId ? "active" : ""}`;
        item.dataset.id = chat.id;

        item.innerHTML = `
            <div class="chat-avatar">
                <img src="${chat.image}" alt="${escapeHTML(chat.name)}">
                ${chat.online ? '<span class="online-dot"></span>' : ""}
            </div>

            <div class="chat-details">
                <div class="chat-top">
                    <h4>${escapeHTML(chat.name)}</h4>
                    <span>${escapeHTML(chat.time || "")}</span>
                </div>
                <p>${escapeHTML(chat.lastMessage || "No messages yet")}</p>
            </div>
        `;

        item.addEventListener("click", () => {
            switchChat(chat.id);
        });

        chatList.appendChild(item);
    });

    if (!chatList.children.length) {
        chatList.innerHTML = `
            <div style="padding:30px 15px;text-align:center;color:#8190a5;font-size:12px;">
                No chats found
            </div>
        `;
    }
}

function updateHeader(chat) {
    chatName.textContent = chat.name;
    headerAvatar.src = chat.image;
    headerAvatar.alt = chat.name;

    chatStatus.innerHTML = chat.online
        ? '<span class="small-online-dot"></span> Online'
        : "Offline";
}

function renderMessages(chat) {
    messages.innerHTML = "";

    const dateDivider = document.createElement("div");
    dateDivider.className = "date-divider";
    dateDivider.innerHTML = "<span>Today, 30 Sep 2026</span>";
    messages.appendChild(dateDivider);

    chat.messages.forEach((message, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = `message ${message.type}`;

        if (message.type === "incoming") {
            wrapper.innerHTML = `
                <div class="message-avatar">
                    <img src="${chat.image}" alt="${escapeHTML(chat.name)}">
                </div>

                <div class="message-content">
                    <div class="message-bubble">${message.text}</div>
                    <span class="message-time">${escapeHTML(message.time)}</span>
                </div>
            `;
        } else {
            wrapper.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${message.text}</div>
                    <span class="message-time">
                        ${escapeHTML(message.time)}
                        <i class="fa-solid fa-check-double"></i>
                    </span>

                    <button class="delete-message"
                            title="Delete message"
                            data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        }

        messages.appendChild(wrapper);
    });

    const typing = document.createElement("div");
    typing.className = "message incoming typing-message";
    typing.innerHTML = `
        <div class="message-avatar">
            <img src="${chat.image}" alt="${escapeHTML(chat.name)}">
        </div>
        <div class="typing-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messages.appendChild(typing);

    messages.querySelectorAll(".delete-message").forEach(button => {
        button.addEventListener("click", () => {
            deleteMessage(Number(button.dataset.index));
        });
    });

    messages.scrollTop = messages.scrollHeight;
}

function switchChat(id) {
    currentChatId = Number(id);
    localStorage.setItem(CHAT_KEY, currentChatId);

    const chat = getCurrentChat();
    if (!chat) return;

    updateHeader(chat);
    renderMessages(chat);
    renderChatList(searchInput.value);

    if (window.innerWidth <= 700) {
        conversationSidebar.classList.remove("mobile-show");
        conversationSidebar.classList.add("mobile-hidden");
        chatArea.classList.add("mobile-show");
    }
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) {
        messageInput.focus();
        return;
    }

    const chat = getCurrentChat();
    if (!chat) return;

    const message = {
        type: "outgoing",
        text: escapeHTML(text).replace(/\n/g, "<br>"),
        time: getTime()
    };

    chat.messages.push(message);
    chat.lastMessage = text;
    chat.time = message.time;

    messageInput.value = "";
    saveChats();

    renderMessages(chat);
    renderChatList(searchInput.value);
    showToast("Message sent successfully");

    simulateTyping();
    messageInput.focus();
}

function simulateTyping() {
    const typing = messages.querySelector(".typing-message");
    if (!typing) return;

    typing.classList.add("show");
    messages.scrollTop = messages.scrollHeight;

    clearTimeout(simulateTyping.timer);

    simulateTyping.timer = setTimeout(() => {
        typing.classList.remove("show");
    }, 1800);
}

function deleteMessage(index) {
    const chat = getCurrentChat();
    if (!chat) return;

    if (!confirm("Delete this message?")) return;

    chat.messages.splice(index, 1);

    const last = chat.messages[chat.messages.length - 1];

    if (last) {
        chat.lastMessage = last.text.replace(/<br>/g, " ");
        chat.time = last.time;
    } else {
        chat.lastMessage = "No messages yet";
        chat.time = "";
    }

    saveChats();
    renderMessages(chat);
    renderChatList(searchInput.value);
    showToast("Message deleted");
}

function loadTheme() {
    const dark = localStorage.getItem(THEME_KEY) === "dark";

    document.body.classList.toggle("dark-mode", dark);

    const icon = themeBtn.querySelector("i");
    icon.className = dark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
}

function toggleTheme() {
    const dark = document.body.classList.toggle("dark-mode");

    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");

    const icon = themeBtn.querySelector("i");
    icon.className = dark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

    showToast(dark ? "Dark mode enabled" : "Light mode enabled");
}

function openMobileChatList() {
    if (window.innerWidth > 700) return;

    conversationSidebar.classList.add("mobile-show");
    conversationSidebar.classList.remove("mobile-hidden");
    chatArea.classList.remove("mobile-show");
}

searchInput.addEventListener("input", () => {
    renderChatList(searchInput.value);
});

messageInput.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

sendButton.addEventListener("click", sendMessage);

themeBtn.addEventListener("click", toggleTheme);

emojiBtn.addEventListener("click", event => {
    event.stopPropagation();
    emojiPicker.classList.toggle("show");
});

emojiPicker.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        messageInput.value += button.textContent;
        messageInput.focus();
    });
});

document.addEventListener("click", event => {
    if (!emojiPicker.contains(event.target) && event.target !== emojiBtn) {
        emojiPicker.classList.remove("show");
    }
});

attachmentBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    messageInput.value = `📎 ${file.name}`;
    messageInput.focus();
    showToast("Attachment selected");
});

backButton.addEventListener("click", openMobileChatList);

document.getElementById("callBtn").addEventListener("click", () => {
    showToast("Voice call UI coming soon");
});

document.getElementById("videoBtn").addEventListener("click", () => {
    showToast("Video call UI coming soon");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        conversationSidebar.classList.remove("mobile-show", "mobile-hidden");
        chatArea.classList.remove("mobile-show");
    }
});

loadTheme();
messageInput.value = "";
renderChatList();
switchChat(currentChatId);
