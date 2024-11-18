document.querySelector("header button").addEventListener("click", async () => {
    const content = document.getElementById("noteContent").value;
    if (content) {
        await fetch("/save-note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });
        document.getElementById("noteContent").value = ""; 
        loadNotes(); 
    }
});
