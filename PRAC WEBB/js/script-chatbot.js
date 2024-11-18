let awaitingInput = false;

        function addMessage(message, isBot = true) {
            const chatBox = document.getElementById("chat-box");
            const messageDiv = document.createElement("div");
            messageDiv.className = isBot ? "bot-message" : "user-message";
            messageDiv.innerText = message;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function handleOption(option) {
            clearChat();
            if (option === "turno") {
                addMessage("Pedir un turno", false);
                addMessage("Para pedir un turno, selecciona una una fecha preferida.");
            } else if (option === "consulta") {
                addMessage("Realizar una consulta", false);
                addMessage("¿Cuál es tu consulta? Estoy aca para ayudarte.");
            } else if (option === "sintomas") {
                addMessage("Redactar mis síntomas", false);
                addMessage("¿Crees que tus síntomas están relacionados con alguna de estas enfermedades comunes?");
                const diseases = ["Gripe", "Alergia", "Infección estomacal", "Dolor de cabeza crónico"];
                diseases.forEach(disease => {
                    const button = document.createElement("button");
                    button.className = "option-button";
                    button.innerText = disease;
                    button.onclick = () => handleSymptomRelation(true);
                    document.getElementById("chat-box").appendChild(button);
                });
                const noButton = document.createElement("button");
                noButton.className = "option-button";
                noButton.innerText = "No estoy seguro/a";
                noButton.onclick = () => handleSymptomRelation(false);
                document.getElementById("chat-box").appendChild(noButton);
            }
        }

        function handleSymptomRelation(related) {
            clearChat();
            if (related) {
                addMessage("Por favor, redacta tus síntomas con el mayor detalle posible.");
                awaitingInput = true;
            } else {
                addMessage("Está bien, contame tus síntomas de forma libre y cómoda.");
                awaitingInput = true;
            }
        }

        function handleUserInput() {
            const userInput = document.getElementById("user-input").value;
            if (userInput.trim() && awaitingInput) {
                addMessage(userInput, false);
                addMessage("Gracias por compartir tus síntomas. Un profesional de la salud los revisará.");
                document.getElementById("user-input").value = "";
                awaitingInput = false;
            }
        }

        function clearChat() {
            const chatBox = document.getElementById("chat-box");
            chatBox.innerHTML = "";
        }