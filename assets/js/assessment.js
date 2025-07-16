let currentSection = 1;
let assessmentData = {};

function nextSection(sectionNumber) {
    document.getElementById(`section-${currentSection}`).style.display = 'none';
    document.getElementById(`section-${sectionNumber}`).style.display = 'block';
    
    currentSection = sectionNumber;
}

function calculateRisk() {
    assessmentData.businessType = document.getElementById('business-type').value;
    assessmentData.employeeCount = document.getElementById('employee-count').value;
    assessmentData.mfa = document.querySelector('input[name="mfa"]:checked')?.value;
    assessmentData.passwords = document.querySelector('input[name="passwords"]:checked')?.value;
    assessmentData.backup = document.querySelector('input[name="backup"]:checked')?.value;
    
    let riskScore = 0;
    let riskFactors = [];
    
    if (assessmentData.mfa === 'no') {
        riskScore += 30;
        riskFactors.push('No multi-factor authentication');
    } else if (assessmentData.mfa === 'some') {
        riskScore += 15;
        riskFactors.push('Incomplete MFA coverage');
    }
    
    if (assessmentData.passwords === 'memory' || assessmentData.passwords === 'written') {
        riskScore += 25;
        riskFactors.push('Weak password management');
    }
    
    if (assessmentData.backup === 'no') {
        riskScore += 20;
        riskFactors.push('No data backup strategy');
    } else if (assessmentData.backup === 'manual') {
        riskScore += 10;
        riskFactors.push('Manual backup process');
    }
    
    // Business type risk
    if (assessmentData.businessType === 'retail' || assessmentData.businessType === 'healthcare') {
        riskScore += 10;
    }
    
    showResults(riskScore, riskFactors);
}

function showResults(score, factors) {
    document.getElementById('section-3').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    let riskLevel, riskColor, recommendations;
    
    if (score <= 20) {
        riskLevel = 'Low Risk';
        riskColor = '#28a745';
        recommendations = generateLowRiskRecommendations();
    } else if (score <= 50) {
        riskLevel = 'Medium Risk';
        riskColor = '#ffc107';
        recommendations = generateMediumRiskRecommendations(factors);
    } else {
        riskLevel = 'High Risk';
        riskColor = '#dc3545';
        recommendations = generateHighRiskRecommendations(factors);
    }
    
    document.getElementById('risk-score').innerHTML = `
        <div class="risk-badge" style="background-color: ${riskColor}">
            <h3>${riskLevel}</h3>
            <p>Score: ${score}/100</p>
        </div>
    `;
    
    document.getElementById('recommendations').innerHTML = recommendations;
}

function generateLowRiskRecommendations() {
    return `
        <h3>Great job! Your security is on track.</h3>
        <ul>
            <li>Continue regular security updates</li>
            <li>Consider annual security training for staff</li>
            <li>Review and test your backup system quarterly</li>
        </ul>
        <a href="../guides/advanced-security.html" class="btn">Advanced Security Tips</a>
    `;
}

function generateMediumRiskRecommendations(factors) {
    let recommendations = '<h3>You have some security gaps to address:</h3><ul>';
    
    factors.forEach(factor => {
        if (factor.includes('MFA')) {
            recommendations += '<li><strong>Set up multi-factor authentication</strong> - <a href="../guides/mfa-setup.html">MFA Setup Guide</a></li>';
        }
        if (factor.includes('password')) {
            recommendations += '<li><strong>Use a password manager</strong> - <a href="../guides/password-security.html">Password Security Guide</a></li>';
        }
        if (factor.includes('backup')) {
            recommendations += '<li><strong>Implement automatic backups</strong> - <a href="../guides/backup-strategy.html">Backup Guide</a></li>';
        }
    });
    
    recommendations += '</ul>';
    return recommendations;
}

function generateHighRiskRecommendations(factors) {
    return `
        <h3>Immediate action needed - your business is vulnerable</h3>
        <div class="urgent-actions">
            <h4>Do these TODAY:</h4>
            <ul>
                <li>Enable MFA on all business accounts</li>
                <li>Set up automatic backups</li>
                <li>Install a password manager</li>
                <li>Update all software</li>
            </ul>
        </div>
        <a href="../guides/emergency-checklist.html" class="btn btn-urgent">Emergency Security Checklist</a>
        <a href="../../templates/incident-response.html" class="btn">Get Incident Response Template</a>
    `;
}

function restartAssessment() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('section-1').style.display = 'block';
    currentSection = 1;
    assessmentData = {};
    
    document.getElementById('assessment-form').reset();
}