async function fetchResponse() {
    const message = document.getElementById('message').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = "Loading...";

    const url = `http://localhost:8080/ai/generate?message=${encodeURIComponent(message)}`;
    console.log("Attempting to fetch from:", url);

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });

        if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Response data:", data);
        responseDiv.innerText = data.generation || "No response received";
    } catch (error) {
        responseDiv.innerText = `Error fetching response: ${error.message}`;
        console.error("Detailed fetch error:", error);

        if (error.message.includes("Failed to fetch")) {
            responseDiv.innerText += "\n- Backend is running, but fetch failed.";
            responseDiv.innerText += "\n- Check browser console for CORS or network errors.";
            responseDiv.innerText += "\n- Test http://localhost:8080/ai/generate?message=hello in your browser.";
        }
    }
}