// Function to simulate FIFO
function simulateFIFO() {
    const numFrames = parseInt(document.getElementById('num-frames').value);
    const pageSequenceInput = document.getElementById('page-sequence').value.trim(); // Trim whitespace
    const pageSequence = pageSequenceInput.split(' ').map(Number).filter(num => !isNaN(num)); // Filter out non-numeric values

    const memoryFrames = [];
    let pageFaults = 0;
    let outputText = '';

    for (let i = 0; i < pageSequence.length; i++) {
        const currentPage = pageSequence[i];
        let pageFault = !memoryFrames.includes(currentPage);

        if (pageFault) {
            pageFaults++;
            if (memoryFrames.length === numFrames) {
                memoryFrames.shift(); // Remove oldest page (FIFO)
            }
            memoryFrames.push(currentPage); // Add new page
        }
        // Display output
        outputText += `Page ${currentPage}: Memory frames [${memoryFrames.join(', ')}]${pageFault ? '' : ' - Hit'}<br>`;
    }
    outputText += `<hr>`;
    outputText += `<br>Total Hit: ${pageSequence.length - pageFaults}`;
    outputText += `<br>Total Miss: ${pageFaults}`;
    outputText += `<br>Hit Ratio: ${pageSequence.length - pageFaults}`+'/'+`${pageSequence.length}`;
    document.getElementById('output').innerHTML = outputText;
}

// Function to simulate LRU
function simulateLRU() {
    const numFrames = parseInt(document.getElementById('num-frames').value);
    const pageSequenceInput = document.getElementById('page-sequence').value.trim(); // Trim whitespace
    const pageSequence = pageSequenceInput.split(' ').map(Number).filter(num => !isNaN(num)); // Filter out non-numeric values

    const memoryFrames = [];
    let pageFaults = 0;
    let outputText = '';

    for (let i = 0; i < pageSequence.length; i++) {
        const currentPage = pageSequence[i];
        let pageFault = !memoryFrames.includes(currentPage);

        if (pageFault) {
            pageFaults++;
            if (memoryFrames.length === numFrames) {
                const leastRecentlyUsedIndex = memoryFrames.map((page, index) => [page, index]).sort((a, b) => a[1] - b[1])[0][1]; // Find the index of the least recently used page
                memoryFrames.splice(leastRecentlyUsedIndex, 1); // Remove the least recently used page
            }
            memoryFrames.push(currentPage); // Add new page
        } else {
            // If it's a hit, move the current page to the end to indicate it was recently used
            memoryFrames.splice(memoryFrames.indexOf(currentPage), 1);
            memoryFrames.push(currentPage);
        }
        // Display output
        outputText += `Page ${currentPage}: Memory frames [${memoryFrames.join(', ')}]${pageFault ? '' : ' - Hit'}<br>`;
    }
    outputText += `<hr>`;
    outputText += `<br>Total Hit: ${pageSequence.length - pageFaults}`;
    outputText += `<br>Total Miss: ${pageFaults}`;
    outputText += `<br>Hit Ratio: ${pageSequence.length - pageFaults}`+'/'+`${pageSequence.length}`;
    document.getElementById('output').innerHTML = outputText;
}

// Function to simulate OPT
function simulateOPT() {
    const numFrames = parseInt(document.getElementById('num-frames').value);
    const pageSequenceInput = document.getElementById('page-sequence').value.trim(); // Trim whitespace
    const pageSequence = pageSequenceInput.split(' ').map(Number).filter(num => !isNaN(num)); // Filter out non-numeric values

    const memoryFrames = [];
    let pageFaults = 0;
    let outputText = '';

    for (let i = 0; i < pageSequence.length; i++) {
        const currentPage = pageSequence[i];
        let pageFault = !memoryFrames.includes(currentPage);

        if (pageFault) {
            pageFaults++;
            if (memoryFrames.length === numFrames) {
                const remainingPageSequence = pageSequence.slice(i + 1); // Remaining page sequence after current position
                const futureReferences = new Map();

                // Calculate future references for each page in memory
                memoryFrames.forEach(page => {
                    const futureIndex = remainingPageSequence.indexOf(page);
                    futureReferences.set(page, futureIndex !== -1 ? futureIndex : Infinity); // If page is not referenced again, set its future index to Infinity
                });
                // Find the page in memory with the farthest future reference
                const pageToRemove = Array.from(futureReferences.keys()).reduce((a, b) => futureReferences.get(a) > futureReferences.get(b) ? a : b);
                memoryFrames.splice(memoryFrames.indexOf(pageToRemove), 1); // Remove the page with the farthest future reference
            }
            memoryFrames.push(currentPage); // Add new page
        }
        // Display output
        outputText += `Page ${currentPage}: Memory frames [${memoryFrames.join(', ')}]${pageFault ? '' : ' - Hit'}<br>`;
    }
    outputText += `<hr>`;
    outputText += `<br>Total Hit: ${pageSequence.length - pageFaults}`;
    outputText += `<br>Total Miss: ${pageFaults}`;
    outputText += `<br>Hit Ratio: ${pageSequence.length - pageFaults}`+'/'+`${pageSequence.length}`;
    document.getElementById('output').innerHTML = outputText;
}


function copyExample() {
    const exampleValue = "1 5 4 1 4 2 3 4 2 6 8 1 4 6 5 4 3 1";
    const input = document.createElement('textarea');
    input.value = exampleValue;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Example copied: ' + exampleValue + '\n\nJust paste it.');
}
