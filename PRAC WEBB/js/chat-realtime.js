        const emojiList = ['🦗', '🌟', '🚀', '🐱', '🎉', '🍀', '💬'];

        function getRandomEmoji() {
            const randomIndex = Math.floor(Math.random() * emojiList.length);
            return emojiList[randomIndex];
        }

        let username = prompt('Por favor, ingresa tu nombre de usuario:');
        if (!username) {
            username = getRandomEmoji(); // Esto permite que si el usuario no pone un nombre se seleccione un emoji en su lugar es solo experimental
        }

        document.addEventListener('DOMContentLoaded', () => {
            const ws = new WebSocket('https://grobchat.onrender.com');

             ws.onopen = () => {
                console.log('By SlavickBoneWall ;)');
                ws.send(`Bienvenido al chat de ayuda, usuario: ${username}`);
            };

            ws.onmessage = (event) => {
                const messagesDiv = document.getElementById('messages');
                const newMessage = document.createElement('div');
                newMessage.classList.add('message');

                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newMessage.textContent = reader.result; 
                        messagesDiv.appendChild(newMessage);
                    };
                    reader.readAsText(event.data);
                } else {
                    newMessage.textContent = event.data; 
                    messagesDiv.appendChild(newMessage);
                }
            };

            document.getElementById('sendButton').onclick = () => {
                const messageInput = document.getElementById('messageInput');
                const message = messageInput.value;
                if (message) {
                    const formattedMessage = `${username}: ${message}`; // Usa el nombre de usuario
                    ws.send(formattedMessage);
                    messageInput.value = '';
                }
            };
        });
