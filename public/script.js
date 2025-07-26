document.addEventListener('DOMContentLoaded', () => {
    const readBtn = document.getElementById('read-btn');
    const urlInput = document.getElementById('url-input');
    const statusDiv = document.getElementById('status');
    const contentDisplay = document.getElementById('content-display');
    const jsonOutput = document.getElementById('json-output');
    const filterSelect = document.getElementById('filter-select');

    readBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        const filter = filterSelect.value;

        if (!url) {
            statusDiv.textContent = 'Please enter a URL.';
            return;
        }

        statusDiv.textContent = 'Processing...';
        contentDisplay.value = '';
        jsonOutput.value = '';

        try {
            const response = await fetch('/process-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url, filter })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process URL');
            }

            const data = await response.json();
            contentDisplay.value = data.content;
            jsonOutput.value = JSON.stringify(data, null, 2);
            statusDiv.textContent = 'Processing complete.';
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
        }
    });
});