let currentEmail = 1;
let flagsFound = 0;
let totalFlags = 0;
let foundFlags = new Set();

function startSimulation() {
    flagsFound = 0;
    foundFlags.clear();
    updateFeedback();
    
    document.getElementById('explanation-panel').style.display = 'none';
    
    showEmail(1);
    addClickListeners();
}

function addClickListeners() {
    const suspiciousElements = document.querySelectorAll('.suspicious-element');
    totalFlags = suspiciousElements.length;
    
    suspiciousElements.forEach((element, index) => {
        element.addEventListener('click', function() {
            if (!foundFlags.has(index)) {
                foundFlags.add(index);
                flagsFound++;
                
                showWarning(element.dataset.warning);
                
                element.classList.add('found-flag');
                
                updateFeedback();
            }
        });
    });
}

function showEmail(emailNumber) {
    document.querySelectorAll('.email-simulation').forEach(email => {
        email.style.display = 'none';
    });
    
    document.getElementById(`email-${emailNumber}`).style.display = 'block';
    currentEmail = emailNumber;
    
    resetFlags();
}

function resetFlags() {
    flagsFound = 0;
    foundFlags.clear();
    
    document.querySelectorAll('.found-flag').forEach(element => {
        element.classList.remove('found-flag');
    });
    
    updateFeedback();
    addClickListeners();
}

function nextEmail() {
    if (currentEmail < 2) {
        showEmail(currentEmail + 1);
    } else {
        showEmail(1); 
    }
}

function showWarning(warningText) {
    const feedbackText = document.getElementById('feedback-text');
    feedbackText.innerHTML = `
        <div class="warning-popup">
            <h4> Red Flag Detected!</h4>
            <p>${warningText}</p>
        </div>
    `;
    
    setTimeout(() => {
        feedbackText.innerHTML = '';
    }, 5000);
}

function updateFeedback() {
    document.getElementById('flags-found').textContent = flagsFound;
    
    if (flagsFound === totalFlags) {
        document.getElementById('feedback-text').innerHTML = `
            <div class="success-message">
                <h4>🎉 Excellent! You found all red flags!</h4>
                <p>You're getting good at spotting phishing emails.</p>
            </div>
        `;
    }
}

function showExplanation() {
    const explanationPanel = document.getElementById('explanation-panel');
    explanationPanel.style.display = 'block';
    
    const explanations = document.getElementById('all-explanations');
    const suspiciousElements = document.querySelectorAll('.suspicious-element');
    
    let explanationHTML = '<ul>';
    suspiciousElements.forEach(element => {
        explanationHTML += `<li><strong>${element.textContent.trim()}:</strong> ${element.dataset.warning}</li>`;
    });
    explanationHTML += '</ul>';
    
    explanations.innerHTML = explanationHTML;
}

function showLinkWarning() {
    alert('WARNING: This link would take you to a fake website designed to steal your login credentials. Never click suspicious links in emails!');
    return false;
}

function showDownloadWarning() {
    alert('WARNING: This download would install malware on your computer. Never download software from suspicious emails!');
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    startSimulation();
});