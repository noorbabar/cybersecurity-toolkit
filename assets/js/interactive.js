class InteractiveGuides {
    constructor() {
        this.init();
    }

    init() {
        this.initRiskCalculator();
        this.initPhishingChecker();
        this.initRansomwareTimeline();
        this.initCIAExplorer();
        this.initPasswordBuilder();
        this.initMFADemo();
        this.initIncidentSimulator();
        this.initComplianceChecker();
        this.initSecurityTrainingSimulator();
        this.initNISTFrameworkMapper();
    }

    initRiskCalculator() {
        const threatSlider = document.getElementById('threat-slider');
        const vulnerabilitySlider = document.getElementById('vulnerability-slider');
        const impactSlider = document.getElementById('impact-slider');

        if (!threatSlider) return;

        const updateRisk = () => {
            const threat = parseInt(threatSlider.value);
            const vulnerability = parseInt(vulnerabilitySlider.value);
            const impact = parseInt(impactSlider.value);
            const riskScore = threat * vulnerability * impact;

            document.getElementById('threat-value').textContent = threat;
            document.getElementById('vulnerability-value').textContent = vulnerability;
            document.getElementById('impact-value').textContent = impact;
            document.getElementById('risk-total').textContent = riskScore;

            const riskLevel = document.getElementById('risk-level');
            const riskAction = document.getElementById('risk-action');

            let level, action, className;
            if (riskScore <= 25) {
                level = 'LOW RISK';
                action = 'Monitor and review annually';
                className = 'low';
            } else if (riskScore <= 50) {
                level = 'MEDIUM RISK';
                action = 'Implement controls within 90 days';
                className = 'medium';
            } else if (riskScore <= 100) {
                level = 'HIGH RISK';
                action = 'Implement controls within 30 days';
                className = 'high';
            } else {
                level = 'CRITICAL RISK';
                action = 'Implement controls immediately';
                className = 'critical';
            }

            riskLevel.textContent = level;
            riskLevel.className = 'risk-level ' + className;
            riskAction.textContent = action;
        };

        [threatSlider, vulnerabilitySlider, impactSlider].forEach(slider => {
            slider.addEventListener('input', updateRisk);
        });

        updateRisk();
    }

    initPhishingChecker() {
        const clickableElements = document.querySelectorAll('.clickable-element');
        const flagCounter = document.getElementById('flags-found');
        const resetBtn = document.getElementById('reset-phishing');
        const feedback = document.getElementById('phishing-feedback');

        if (!clickableElements.length) return;

        let foundFlags = 0;
        const totalFlags = clickableElements.length;

        const flagMessages = {
            'suspicious-sender': 'Good catch! "amazom.com" is not the real Amazon domain.',
            'urgency': 'Correct! Urgent language is a common phishing tactic.',
            'suspicious-link': 'Well spotted! Shortened URLs can hide malicious sites.',
            'generic-greeting': 'Right! Legitimate companies use your name, not generic greetings.'
        };

        clickableElements.forEach(element => {
            element.addEventListener('click', () => {
                if (element.classList.contains('found')) return;

                element.classList.add('found');
                foundFlags++;
                flagCounter.textContent = foundFlags;

                const flag = element.dataset.flag;
                feedback.innerHTML = `<div class="flag-found">🎯 ${flagMessages[flag]}</div>`;

                if (foundFlags === totalFlags) {
                    feedback.innerHTML += '<div class="completion-message">🎉 Excellent! You found all the phishing red flags. You\'re ready to spot real attacks!</div>';
                }
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                clickableElements.forEach(el => el.classList.remove('found'));
                foundFlags = 0;
                flagCounter.textContent = '0';
                feedback.innerHTML = '';
            });
        }
    }

    initRansomwareTimeline() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        const timelineButtons = document.querySelectorAll('.timeline-btn');
        const choicePanel = document.getElementById('ransomware-choices');
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const choiceResult = document.getElementById('choice-result');

        if (!timelineSteps.length) return;

        let currentStep = 1;

        const showStep = (stepNumber) => {
            timelineSteps.forEach((step, index) => {
                if (index < stepNumber) {
                    step.classList.remove('hidden');
                    step.classList.add('active');
                } else {
                    step.classList.add('hidden');
                }
            });
        };

        timelineButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                
                if (action === 'investigate' || action === 'continue') {
                    currentStep++;
                    showStep(currentStep);
                } else if (action === 'choices') {
                    choicePanel.classList.remove('hidden');
                }
            });
        });

        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const choice = button.dataset.choice;
                let resultMessage = '';

                if (choice === 'pay') {
                    resultMessage = '<div class="bad-result">❌ Bad choice! Paying doesn\'t guarantee file recovery and funds more attacks. Only 65% get their files back after paying.</div>';
                } else if (choice === 'backup') {
                    resultMessage = '<div class="good-result">✅ Smart choice! With good backups, you can restore everything without paying criminals. Business back online in hours, not weeks.</div>';
                } else if (choice === 'negotiate') {
                    resultMessage = '<div class="bad-result">❌ Risky approach! Criminals rarely negotiate in good faith. You\'re just giving them more time to cause damage.</div>';
                }

                choiceResult.innerHTML = resultMessage;
                choiceResult.classList.remove('hidden');
            });
        });

        showStep(1);
    }

    initCIAExplorer() {
        const businessButtons = document.querySelectorAll('.business-btn');
        const scenariosDiv = document.getElementById('cia-scenarios');
        const scenarioTabs = document.querySelectorAll('.scenario-tab');
        const scenarioContent = document.getElementById('scenario-content');

        if (!businessButtons.length) return;

        const scenarios = {
            restaurant: {
                confidentiality: {
                    title: 'Protecting Customer Privacy',
                    example: 'A food delivery app displays your customer orders on screens visible to other customers.',
                    impact: 'Customers stop using your service due to privacy concerns.',
                    solution: 'Position screens away from customer view and use order numbers instead of names.'
                },
                integrity: {
                    title: 'Keeping Orders Accurate',
                    example: 'Your point-of-sale system shows wrong prices due to a software glitch.',
                    impact: 'Customers are overcharged, leading to complaints and refunds.',
                    solution: 'Regular system backups and daily price verification checks.'
                },
                availability: {
                    title: 'Staying Open for Business',
                    example: 'Your payment system goes down during the dinner rush.',
                    impact: 'You can\'t process orders, losing customers and revenue.',
                    solution: 'Backup payment methods and manual order-taking procedures.'
                }
            },
            clinic: {
                confidentiality: {
                    title: 'Protecting Patient Records',
                    example: 'Patient files are left open on computer screens when staff step away.',
                    impact: 'Privacy violations, regulatory fines, and loss of patient trust.',
                    solution: 'Automatic screen locks and secure file storage systems.'
                },
                integrity: {
                    title: 'Keeping Medical Records Accurate',
                    example: 'A system error changes patient allergies in their medical record.',
                    impact: 'Dangerous medication interactions and potential medical emergencies.',
                    solution: 'Regular data backups and verification procedures for critical information.'
                },
                availability: {
                    title: 'Always Available for Patients',
                    example: 'Your appointment system crashes and you can\'t see patient schedules.',
                    impact: 'Missed appointments, confused patients, and disrupted care.',
                    solution: 'Paper backup schedules and redundant systems.'
                }
            },
            shop: {
                confidentiality: {
                    title: 'Protecting Customer Data',
                    example: 'Customer payment details are visible on receipts or screens.',
                    impact: 'Identity theft risks and loss of customer confidence.',
                    solution: 'Mask payment details and secure customer databases.'
                },
                integrity: {
                    title: 'Accurate Inventory and Pricing',
                    example: 'Inventory system shows wrong stock levels, causing overselling.',
                    impact: 'Disappointed customers and inability to fulfill orders.',
                    solution: 'Regular inventory audits and system verification.'
                },
                availability: {
                    title: 'Always Ready to Serve',
                    example: 'Cash register system fails during a busy sale period.',
                    impact: 'Lost sales, frustrated customers, and potential security issues.',
                    solution: 'Manual backup processes and multiple payment options.'
                }
            },
            office: {
                confidentiality: {
                    title: 'Protecting Business Information',
                    example: 'Confidential client proposals are accidentally shared publicly.',
                    impact: 'Loss of competitive advantage and client trust.',
                    solution: 'Access controls and document classification systems.'
                },
                integrity: {
                    title: 'Maintaining Data Accuracy',
                    example: 'Financial reports contain errors due to data corruption.',
                    impact: 'Poor business decisions based on incorrect information.',
                    solution: 'Regular backups and data validation processes.'
                },
                availability: {
                    title: 'Always Connected and Productive',
                    example: 'Email system goes down, preventing client communication.',
                    impact: 'Delayed responses, missed opportunities, and frustrated clients.',
                    solution: 'Backup communication methods and redundant systems.'
                }
            }
        };

        let selectedBusiness = '';
        let selectedCIA = 'confidentiality';

        const updateScenario = () => {
            if (!selectedBusiness) return;

            const scenario = scenarios[selectedBusiness][selectedCIA];
            scenarioContent.innerHTML = `
                <h4>${scenario.title}</h4>
                <div class="scenario-example">
                    <h5>Example Problem:</h5>
                    <p>${scenario.example}</p>
                </div>
                <div class="scenario-impact">
                    <h5> Business Impact:</h5>
                    <p>${scenario.impact}</p>
                </div>
                <div class="scenario-solution">
                    <h5>Solution:</h5>
                    <p>${scenario.solution}</p>
                </div>
            `;
        };

        businessButtons.forEach(button => {
            button.addEventListener('click', () => {
                businessButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                selectedBusiness = button.dataset.business;
                scenariosDiv.classList.remove('hidden');
                updateScenario();
            });
        });

        scenarioTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                scenarioTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                selectedCIA = tab.dataset.cia;
                updateScenario();
            });
        });
    }

initPasswordBuilder() {
    const passwordInput = document.getElementById('live-password');
    const indicators = document.querySelectorAll('.indicator');
    const strengthDisplay = document.getElementById('password-strength');
    const crackTimeDisplay = document.getElementById('crack-time');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    if (!passwordInput) return;

    const weakPatterns = [
        /password/i, /123/, /qwerty/i, /admin/i, /login/i,
        /business/i, /company/i, /2024|2023|2025/, /welcome/i,
        /manager/i, /office/i, /staff/i, /team/i, /user/i,
        /secret/i, /private/i, /secure/i
    ];

    const personalPatterns = [
        /john|jane|mike|sarah|david|mary/i, 
        /birthday|born|birth/i,
        /family|wife|husband|kids/i,
        /home|house|address/i,
        /phone|mobile|cell/i
    ];

    const checkPasswordStrength = (password) => {
        const rules = {
            length: password.length >= 14, 
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            personal: !weakPatterns.some(pattern => pattern.test(password)) && 
                     !personalPatterns.some(pattern => pattern.test(password))
        };

        indicators.forEach(indicator => {
            const rule = indicator.dataset.rule;
            const icon = indicator.querySelector('.indicator-icon');
            
            if (rules[rule]) {
                indicator.classList.add('met');
                icon.textContent = '✅';
            } else {
                indicator.classList.remove('met');
                icon.textContent = '❌';
            }
        });

        const metRules = Object.values(rules).filter(Boolean).length;
        let strength, crackTime;

        if (metRules <= 2) {
            strength = 'Very Weak';
            crackTime = 'Instantly';
        } else if (metRules === 3) {
            strength = 'Weak';
            crackTime = 'Minutes to hours';
        } else if (metRules === 4) {
            strength = 'Fair';
            crackTime = 'Days to weeks';
        } else if (metRules === 5) {
            strength = 'Good';
            crackTime = 'Years';
        } else {
            strength = 'Very Strong';
            crackTime = 'Centuries';
        }

        strengthDisplay.textContent = strength;
        crackTimeDisplay.textContent = crackTime;
    };

    passwordInput.addEventListener('input', (e) => {
        checkPasswordStrength(e.target.value);
    });

    suggestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const suggestion = button.dataset.suggestion;
            passwordInput.value = suggestion;
            checkPasswordStrength(suggestion);
            passwordInput.focus();
        });
    });
}
    initMFADemo() {
        const startBtn = document.getElementById('start-attack');
        const enableMFABtn = document.getElementById('enable-mfa');
        const resetBtn = document.getElementById('reset-sim');
        const stages = document.querySelectorAll('.stage');
        const simResult = document.getElementById('sim-result');

        if (!startBtn) return;

        let mfaEnabled = false;
        let simulationRunning = false;

        const updateStageStatus = (stageNum, status, className = '') => {
            const stage = document.querySelector(`[data-stage="${stageNum}"]`);
            const statusEl = document.getElementById(`stage${stageNum}-status`);
            
            if (stage && statusEl) {
                statusEl.textContent = status;
                stage.classList.remove('active', 'success', 'failed');
                if (className) stage.classList.add(className);
            }
        };

        const runSimulation = async () => {
            if (simulationRunning) return;
            simulationRunning = true;
            
            stages.forEach(stage => stage.classList.remove('active', 'success', 'failed'));
            simResult.innerHTML = '';

            updateStageStatus(1, 'Password compromised!', 'active');
            await this.delay(1000);
            updateStageStatus(1, 'Stolen via phishing', 'failed');

            updateStageStatus(2, 'Attempting login...', 'active');
            await this.delay(1500);
            updateStageStatus(2, 'Login successful', 'failed');

            updateStageStatus(3, 'Checking for MFA...', 'active');
            await this.delay(1000);

            if (mfaEnabled) {
                updateStageStatus(3, 'MFA required!', 'success');
                await this.delay(1000);
                
                updateStageStatus(4, 'Attack blocked!', 'success');
                simResult.innerHTML = '<div class="success-result">🛡️ <strong>Attack Prevented!</strong><br>MFA stopped the attacker even though they had your password.</div>';
            } else {
                updateStageStatus(3, 'No MFA enabled', 'failed');
                await this.delay(1000);
                
                updateStageStatus(4, 'Account compromised!', 'failed');
                simResult.innerHTML = '<div class="failure-result">💥 <strong>Security Breach!</strong><br>Attacker gained full access to your business systems.</div>';
            }

            simulationRunning = false;
        };

        startBtn.addEventListener('click', () => {
            runSimulation();
            enableMFABtn.classList.remove('disabled');
        });

        enableMFABtn.addEventListener('click', () => {
            if (enableMFABtn.classList.contains('disabled')) return;
            
            mfaEnabled = !mfaEnabled;
            enableMFABtn.textContent = mfaEnabled ? 'Disable MFA' : 'Enable MFA';
            enableMFABtn.style.background = mfaEnabled ? '#ff7043' : '#66bb6a';
            
            if (simulationRunning) return;
            runSimulation();
        });

        resetBtn.addEventListener('click', () => {
            mfaEnabled = false;
            simulationRunning = false;
            enableMFABtn.textContent = 'Enable MFA';
            enableMFABtn.style.background = '#66bb6a';
            enableMFABtn.classList.add('disabled');
            
            stages.forEach(stage => stage.classList.remove('active', 'success', 'failed'));
            [1, 2, 3, 4].forEach(i => updateStageStatus(i, 'Waiting...'));
            simResult.innerHTML = '';
        });
    }

initSecurityTrainingSimulator() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    const trainingScenario = document.getElementById('training-scenario');
    const scenarioDetails = document.getElementById('scenario-details');
    const scenarioQuestion = document.getElementById('scenario-question');
    const responseOptions = document.getElementById('response-options');
    const scenarioResult = document.getElementById('scenario-result');
    const resetBtn = document.getElementById('reset-scenario');

    if (!scenarioButtons.length) return;

    const scenarios = {
        phishing: {
            title: 'Suspicious Email Test',
            situation: `You receive this email:
            
            FROM: accounts@paypaI-security.com
            SUBJECT: URGENT: Your business account will be suspended
            
            "Dear Business Owner,
            
            We have detected suspicious activity on your PayPal business account. Your account will be suspended in 24 hours unless you verify your information immediately.
            
            Click here to verify your account: bit.ly/pp-verify-urgent
            
            Thank you,
            PayPal Security Team"`,
            question: 'What should you do?',
            options: [
                {
                    text: 'Click the link immediately to prevent account suspension',
                    correct: false,
                    explanation: 'Wrong! This is a phishing email. The domain "paypaI-security.com" uses a capital "i" instead of lowercase "l" in PayPal. Legitimate companies never use urgent threats or shortened URLs.'
                },
                {
                    text: 'Forward it to your accountant to handle',
                    correct: false,
                    explanation: 'Wrong! This spreads the phishing email to more people. Never forward suspicious emails.'
                },
                {
                    text: 'Delete it and log into PayPal directly through their official website',
                    correct: true,
                    explanation: 'Correct! Always go directly to the official website instead of clicking email links. If there was a real problem, you would see it when you log in normally.'
                },
                {
                    text: 'Reply asking for more details about the suspicious activity',
                    correct: false,
                    explanation: 'Wrong! Replying confirms your email address is active and will result in more scam attempts.'
                }
            ]
        },
        phone: {
            title: 'Phone Scam Test',
            situation: `Your receptionist receives this call:
            
            "Hi, this is Mark from your IT support company. We're seeing some security alerts from your network and need to remote access your computers to fix them right away. Can you help me log into the main computer? I just need the admin username and password to resolve this quickly."`,
            question: 'What should your receptionist do?',
            options: [
                {
                    text: 'Provide the login details since it\'s the IT support company',
                    correct: false,
                    explanation: 'Wrong! This is a social engineering attack. Real IT support never calls asking for passwords. They would either have access already or come in person with proper identification.'
                },
                {
                    text: 'Ask for their company name and call them back on the official number',
                    correct: true,
                    explanation: 'Correct! Always verify identity independently. Hang up and call the IT company\'s official number to confirm if they really called and need access.'
                },
                {
                    text: 'Transfer the call to the business owner',
                    correct: false,
                    explanation: 'Better than giving access, but still wrong. The business owner might fall for the same trick. Always verify through independent contact first.'
                },
                {
                    text: 'Ask them to email the request instead',
                    correct: false,
                    explanation: 'Wrong! Scammers can easily send convincing emails too. The problem isn\'t the communication method - it\'s the request for passwords, which legitimate IT never does.'
                }
            ]
        },
        physical: {
            title: 'Physical Security Test',
            situation: `You\'re working late in the office when someone knocks on the door. A well-dressed person with a clipboard says:
            
            "Hi, I\'m from the building maintenance company. We had reports of a gas leak and need to check your office. Can you let me in? I left my access card at home but this is urgent for everyone\'s safety."`,
            question: 'What should you do?',
            options: [
                {
                    text: 'Let them in immediately - gas leaks are dangerous',
                    correct: false,
                    explanation: 'Wrong! This is a common social engineering tactic using urgency and safety concerns. Real emergency services would have proper identification and authorization.'
                },
                {
                    text: 'Ask to see their ID and call the building management to verify',
                    correct: true,
                    explanation: 'Correct! Always verify unexpected visitors independently. Call building management or security to confirm any maintenance requests, especially urgent ones.'
                },
                {
                    text: 'Let them in but stay with them the whole time',
                    correct: false,
                    explanation: 'Wrong! Even supervised, an unauthorized person could plant devices, take photos, or cause damage. Always verify identity first.'
                },
                {
                    text: 'Tell them to come back during business hours',
                    correct: false,
                    explanation: 'Partially right for questioning the timing, but wrong response. Real emergencies do happen after hours. The issue is the lack of proper identification and verification.'
                }
            ]
        },
        access: {
            title: 'Access Request Test',
            situation: `You receive this text from your business partner while they\'re overseas:
            
            "Hey, I\'m in meetings all day but need to send an urgent payment to our new supplier. Can you log into the business banking and transfer $8,500 to this account? [bank details]. Time sensitive - they need payment today or we lose the contract. I\'ll reimburse you when I\'m back."`,
            question: 'What should you do?',
            options: [
                {
                    text: 'Make the transfer immediately to avoid losing the contract',
                    correct: false,
                    explanation: 'Wrong! This is a business email compromise (BEC) scam. Criminals hack or spoof communications to trick people into making fraudulent payments.'
                },
                {
                    text: 'Call your partner directly to verify before making any payment',
                    correct: true,
                    explanation: 'Correct! Always verify unusual financial requests through a different communication method. Call your partner directly on their known phone number to confirm.'
                },
                {
                    text: 'Ask for more details about the supplier via text',
                    correct: false,
                    explanation: 'Wrong! If this is a scammer, they can provide convincing fake details. The red flag is the urgent payment request, not the lack of details.'
                },
                {
                    text: 'Transfer half the amount as a compromise',
                    correct: false,
                    explanation: 'Wrong! Any payment to an unverified request is dangerous. Scammers often ask for large amounts hoping victims will "compromise" with smaller amounts.'
                }
            ]
        }
    };

    const showScenario = (scenarioKey) => {
        const scenario = scenarios[scenarioKey];
        
        scenarioDetails.innerHTML = `
            <h5>${scenario.title}</h5>
            <div class="scenario-situation">
                <h6>Situation:</h6>
                <div class="situation-text">${scenario.situation.replace(/\n/g, '<br>')}</div>
            </div>
        `;
        
        scenarioQuestion.innerHTML = `<h6>${scenario.question}</h6>`;
        
        responseOptions.innerHTML = '';
        scenario.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'response-option';
            optionDiv.innerHTML = `
                <button class="option-btn" data-index="${index}">
                    ${option.text}
                </button>
            `;
            responseOptions.appendChild(optionDiv);
        });

        responseOptions.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIndex = parseInt(btn.dataset.index);
                showResult(scenario.options[selectedIndex]);
                
                responseOptions.querySelectorAll('.option-btn').forEach(b => {
                    b.disabled = true;
                    if (parseInt(b.dataset.index) === selectedIndex) {
                        b.style.background = scenario.options[selectedIndex].correct ? '#4caf50' : '#f44336';
                        b.style.color = 'white';
                    }
                });
            });
        });

        trainingScenario.classList.remove('hidden');
        scenarioResult.classList.add('hidden');
        resetBtn.classList.add('hidden');
    };

    const showResult = (selectedOption) => {
        const resultClass = selectedOption.correct ? 'correct-answer' : 'incorrect-answer';
        const resultIcon = selectedOption.correct ? '✓' : '✗';
        
        scenarioResult.innerHTML = `
            <div class="result-feedback ${resultClass}">
                <div class="result-icon">${resultIcon}</div>
                <div class="result-explanation">${selectedOption.explanation}</div>
            </div>
        `;
        
        scenarioResult.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
    };

    scenarioButtons.forEach(button => {
        button.addEventListener('click', () => {
            scenarioButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            showScenario(button.dataset.scenario);
        });
    });

    resetBtn.addEventListener('click', () => {
        trainingScenario.classList.add('hidden');
        scenarioResult.classList.add('hidden');
        resetBtn.classList.add('hidden');
        scenarioButtons.forEach(b => b.classList.remove('active'));
    });
}

    initIncidentSimulator() {
        const scenarioButtons = document.querySelectorAll('.scenario-btn');
        const incidentSim = document.getElementById('incident-sim');
        const timerDisplay = document.getElementById('incident-timer');
        const costDisplay = document.getElementById('business-cost');
        const resetBtn = document.getElementById('reset-incident');

        if (!scenarioButtons.length) return;

        let currentScenario = '';
        let simulationTimer = null;
        let elapsedTime = 0;
        let businessCost = 0;

        const scenarios = {
            ransomware: {
                name: 'Ransomware Attack',
                phases: [
                    {
                        phase: 'identification',
                        situation: 'Staff report computers showing "Your files have been encrypted" messages.',
                        options: [
                            { text: 'Immediately disconnect all systems from network', correct: true, time: 5, cost: 1000 },
                            { text: 'Try to negotiate with attackers', correct: false, time: 30, cost: 5000 },
                            { text: 'Continue working and see what happens', correct: false, time: 60, cost: 15000 }
                        ]
                    },
                    {
                        phase: 'containment',
                        situation: 'Network is isolated. You need to assess the damage scope.',
                        options: [
                            { text: 'Check which systems are infected', correct: true, time: 15, cost: 2000 },
                            { text: 'Immediately start restoring from backups', correct: false, time: 45, cost: 8000 },
                            { text: 'Call law enforcement first', correct: false, time: 30, cost: 4000 }
                        ]
                    },
                    {
                        phase: 'recovery',
                        situation: 'Infected systems identified. Ready to restore operations.',
                        options: [
                            { text: 'Restore from clean backups after verification', correct: true, time: 120, cost: 5000 },
                            { text: 'Pay the ransom to get files back', correct: false, time: 180, cost: 50000 },
                            { text: 'Rebuild all systems from scratch', correct: false, time: 480, cost: 25000 }
                        ]
                    }
                ]
            },
            breach: {
                name: 'Data Breach',
                phases: [
                    {
                        phase: 'identification',
                        situation: 'Unusual network activity detected. Possible unauthorized access to customer database.',
                        options: [
                            { text: 'Immediately investigate and document everything', correct: true, time: 10, cost: 500 },
                            { text: 'Wait and monitor to gather more information', correct: false, time: 60, cost: 5000 },
                            { text: 'Shut down all systems immediately', correct: false, time: 5, cost: 10000 }
                        ]
                    },
                    {
                        phase: 'containment',
                        situation: 'Confirmed: Attackers accessed customer records. Need to stop further damage.',
                        options: [
                            { text: 'Change all passwords and revoke compromised access', correct: true, time: 20, cost: 1000 },
                            { text: 'Shut down entire network', correct: false, time: 10, cost: 15000 },
                            { text: 'Only monitor the attackers activities', correct: false, time: 60, cost: 25000 }
                        ]
                    },
                    {
                        phase: 'recovery',
                        situation: 'Breach contained. Must comply with notification requirements.',
                        options: [
                            { text: 'Notify authorities within 72 hours and affected customers', correct: true, time: 24, cost: 3000 },
                            { text: 'Wait to see if anyone notices the breach', correct: false, time: 168, cost: 100000 },
                            { text: 'Only notify if customers complain', correct: false, time: 720, cost: 500000 }
                        ]
                    }
                ]
            },
            email: {
                name: 'Email Compromise',
                phases: [
                    {
                        phase: 'identification',
                        situation: 'Employee reports they cannot access email and password was changed.',
                        options: [
                            { text: 'Immediately reset password and check sent items', correct: true, time: 5, cost: 100 },
                            { text: 'Ask employee to try logging in again', correct: false, time: 30, cost: 2000 },
                            { text: 'Wait until tomorrow to investigate', correct: false, time: 1440, cost: 10000 }
                        ]
                    },
                    {
                        phase: 'containment',
                        situation: 'Confirmed compromise. Malicious emails sent to customers asking for payments.',
                        options: [
                            { text: 'Warn all contacts about fake emails and secure account', correct: true, time: 30, cost: 500 },
                            { text: 'Only respond if customers call about suspicious emails', correct: false, time: 120, cost: 5000 },
                            { text: 'Delete the compromised email account', correct: false, time: 15, cost: 8000 }
                        ]
                    },
                    {
                        phase: 'recovery',
                        situation: 'Account secured. Need to rebuild trust with customers.',
                        options: [
                            { text: 'Send official communication explaining the incident', correct: true, time: 60, cost: 1000 },
                            { text: 'Hope customers forget about the fake emails', correct: false, time: 0, cost: 25000 },
                            { text: 'Blame the employee for weak password', correct: false, time: 0, cost: 15000 }
                        ]
                    }
                ]
            },
            outage: {
                name: 'System Outage',
                phases: [
                    {
                        phase: 'identification',
                        situation: 'All business systems are down. Customers cannot place orders or make payments.',
                        options: [
                            { text: 'Activate manual backup procedures immediately', correct: true, time: 15, cost: 2000 },
                            { text: 'Wait for systems to come back online', correct: false, time: 120, cost: 20000 },
                            { text: 'Close business until systems are fixed', correct: false, time: 60, cost: 50000 }
                        ]
                    },
                    {
                        phase: 'containment',
                        situation: 'Manual processes active. Need to determine cause of outage.',
                        options: [
                            { text: 'Check if its a cyber attack or technical failure', correct: true, time: 30, cost: 1000 },
                            { text: 'Immediately call all customers to apologize', correct: false, time: 180, cost: 5000 },
                            { text: 'Post on social media that systems are down', correct: false, time: 10, cost: 3000 }
                        ]
                    },
                    {
                        phase: 'recovery',
                        situation: 'Technical failure identified. Systems being restored from backups.',
                        options: [
                            { text: 'Test all systems thoroughly before going live', correct: true, time: 90, cost: 3000 },
                            { text: 'Bring systems online as soon as possible', correct: false, time: 30, cost: 15000 },
                            { text: 'Work with manual processes until next week', correct: false, time: 10080, cost: 100000 }
                        ]
                    }
                ]
            }
        };

        let currentPhaseIndex = 0;
        let phaseResults = [];

        const startTimer = () => {
            simulationTimer = setInterval(() => {
                elapsedTime++;
                const hours = Math.floor(elapsedTime / 60);
                const minutes = elapsedTime % 60;
                timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                costDisplay.textContent = businessCost.toLocaleString();
            }, 100);
        };

        const stopTimer = () => {
            if (simulationTimer) {
                clearInterval(simulationTimer);
                simulationTimer = null;
            }
        };

        const updatePhaseTracker = (phase) => {
            document.querySelectorAll('.phase-step').forEach(step => {
                step.classList.remove('active', 'completed');
            });

            const currentStep = document.querySelector(`[data-phase="${phase}"]`);
            if (currentStep) {
                currentStep.classList.add('active');
            }

            const phases = ['preparation', 'identification', 'containment', 'eradication', 'recovery'];
            const currentIndex = phases.indexOf(phase);
            
            for (let i = 0; i < currentIndex; i++) {
                const step = document.querySelector(`[data-phase="${phases[i]}"]`);
                if (step) step.classList.add('completed');
            }
        };
 
        const showPhase = (phaseData, phaseIndex) => {
            const situationText = document.getElementById('situation-text');
            const decisionOptions = document.getElementById('decision-options');
 
            situationText.innerHTML = `
                <h5>Situation:</h5>
                <p>${phaseData.situation}</p>
            `;
 
            decisionOptions.innerHTML = '';
            phaseData.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = `decision-option ${option.correct ? 'good' : 'bad'}`;
                optionDiv.textContent = option.text;
                optionDiv.addEventListener('click', () => handleDecision(option, phaseIndex));
                decisionOptions.appendChild(optionDiv);
            });
 
            updatePhaseTracker(phaseData.phase);
        };
 
        const handleDecision = (option, phaseIndex) => {
            elapsedTime += option.time;
            businessCost += option.cost;
 
            phaseResults.push({
                phase: phaseIndex,
                correct: option.correct,
                timeCost: option.time,
                moneyCost: option.cost
            });
 
            const scenario = scenarios[currentScenario];
            
            if (phaseIndex < scenario.phases.length - 1) {
                setTimeout(() => {
                    currentPhaseIndex++;
                    showPhase(scenario.phases[currentPhaseIndex], currentPhaseIndex);
                }, 1500);
            } else {
                setTimeout(() => {
                    showResults();
                }, 1500);
            }
        };
 
        const showResults = () => {
            const resultDiv = document.getElementById('incident-result');
            const correctDecisions = phaseResults.filter(r => r.correct).length;
            const totalPhases = phaseResults.length;
 
            let resultClass = 'success';
            let resultMessage = '';
 
            if (correctDecisions === totalPhases) {
                resultMessage = `🎉 <strong>Excellent Response!</strong><br>You made all the right decisions. Total cost: $${businessCost.toLocaleString()}, Time: ${Math.floor(elapsedTime/60)}h ${elapsedTime%60}m`;
            } else if (correctDecisions >= totalPhases * 0.7) {
                resultMessage = `✅ <strong>Good Response!</strong><br>You handled most situations well. Total cost: $${businessCost.toLocaleString()}, Time: ${Math.floor(elapsedTime/60)}h ${elapsedTime%60}m`;
            } else {
                resultClass = 'failure';
                resultMessage = `⚠️ <strong>Needs Improvement!</strong><br>Several poor decisions increased cost and time. Total cost: $${businessCost.toLocaleString()}, Time: ${Math.floor(elapsedTime/60)}h ${elapsedTime%60}m`;
            }
 
            resultDiv.className = `incident-result ${resultClass}`;
            resultDiv.innerHTML = resultMessage;
            resultDiv.classList.remove('hidden');
 
            stopTimer();
            updatePhaseTracker('recovery');
            document.querySelector('[data-phase="recovery"]').classList.add('completed');
        };
 
        scenarioButtons.forEach(button => {
            button.addEventListener('click', () => {
                scenarioButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                currentScenario = button.dataset.scenario;
                currentPhaseIndex = 0;
                phaseResults = [];
                elapsedTime = 0;
                businessCost = 0;
 
                incidentSim.classList.remove('hidden');
                document.getElementById('incident-result').classList.add('hidden');
 
                startTimer();
                showPhase(scenarios[currentScenario].phases[0], 0);
            });
        });
 
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                stopTimer();
                elapsedTime = 0;
                businessCost = 0;
                currentPhaseIndex = 0;
                phaseResults = [];
                
                timerDisplay.textContent = '00:00';
                costDisplay.textContent = '0';
                incidentSim.classList.add('hidden');
                
                scenarioButtons.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.phase-step').forEach(step => {
                    step.classList.remove('active', 'completed');
                });
            });
        }
    }

initNISTFrameworkMapper() {
    const checklist = document.getElementById('framework-checklist');
    const scoreNumber = document.getElementById('score-number');
    const maturityLevel = document.getElementById('maturity-level');
    const nextSteps = document.getElementById('next-steps');

    if (!checklist) return;

    const nistControls = [
        {
            category: 'Identify',
            items: [
                'Asset inventory completed (all devices, software, data)',
                'Business environment documented',
                'Governance policies established',
                'Risk assessment conducted',
                'Risk management strategy defined'
            ]
        },
        {
            category: 'Protect',
            items: [
                'Identity management and access control implemented',
                'Staff security awareness training completed',
                'Data security measures in place',
                'Information protection processes defined',
                'Protective technology deployed (antivirus, firewalls)',
                'System maintenance procedures established'
            ]
        },
        {
            category: 'Detect',
            items: [
                'Anomalies and events detection capabilities',
                'Security monitoring ongoing',
                'Detection processes regularly tested'
            ]
        },
        {
            category: 'Respond',
            items: [
                'Response planning documented',
                'Response communications plan ready',
                'Response analysis procedures defined',
                'Response mitigation activities planned',
                'Response improvements incorporated'
            ]
        },
        {
            category: 'Recover',
            items: [
                'Recovery planning documented',
                'Recovery improvements incorporated',
                'Recovery communications established'
            ]
        }
    ];

    const loadNISTChecklist = () => {
        let checklistHTML = '';
        let totalItems = 0;

        nistControls.forEach(category => {
            checklistHTML += `
                <div class="framework-category">
                    <h5>${category.category}</h5>
                    <div class="framework-items">
            `;

            category.items.forEach((item, index) => {
                const itemId = `nist-${category.category.toLowerCase()}-${index}`;
                totalItems++;
                checklistHTML += `
                    <div class="framework-item">
                        <input type="checkbox" id="${itemId}" data-category="${category.category}">
                        <label for="${itemId}">${item}</label>
                    </div>
                `;
            });

            checklistHTML += `
                    </div>
                </div>
            `;
        });

        checklist.innerHTML = checklistHTML;

        checklist.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => updateNISTScore(totalItems));
        });

        updateNISTScore(totalItems);
    };

    const updateNISTScore = (totalItems) => {
        const checkedBoxes = checklist.querySelectorAll('input[type="checkbox"]:checked');
        const score = Math.round((checkedBoxes.length / totalItems) * 100);
        scoreNumber.textContent = score;

        let level, recommendations;
        
        if (score >= 90) {
            level = 'Advanced';
            recommendations = [
                'Maintain current security posture',
                'Consider additional specialized controls',
                'Regular security assessments and audits',
                'Share lessons learned with other businesses'
            ];
        } else if (score >= 70) {
            level = 'Mature';
            recommendations = [
                'Address remaining gaps in framework implementation',
                'Enhance detection and response capabilities',
                'Conduct regular tabletop exercises',
                'Consider third-party security assessment'
            ];
        } else if (score >= 50) {
            level = 'Developing';
            recommendations = [
                'Focus on completing Protect function controls',
                'Implement basic detection capabilities',
                'Develop incident response procedures',
                'Enhance staff security training program'
            ];
        } else if (score >= 30) {
            level = 'Initial';
            recommendations = [
                'Complete asset inventory and risk assessment',
                'Implement basic security controls (passwords, MFA)',
                'Establish data backup procedures',
                'Begin staff security awareness training'
            ];
        } else {
            level = 'Getting Started';
            recommendations = [
                'Start with Essential 8 implementation',
                'Focus on basic asset identification',
                'Implement password security and MFA',
                'Set up basic data backups'
            ];
        }

        maturityLevel.textContent = level;

        let recommendationsHTML = '<h5>Priority Recommendations:</h5>';
        recommendations.forEach(rec => {
            recommendationsHTML += `<div class="recommendation-item">• ${rec}</div>`;
        });
        nextSteps.innerHTML = recommendationsHTML;

        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            scoreCircle.className = 'score-circle'; 
            if (score >= 70) {
                scoreCircle.classList.add('score-high');
            } else if (score >= 40) {
                scoreCircle.classList.add('score-medium');
            } else {
                scoreCircle.classList.add('score-low');
            }
        }
    };

    loadNISTChecklist();
}

initComplianceChecker() {
    const checkButton = document.getElementById('check-compliance');
    const complianceResults = document.getElementById('compliance-results');
    const complianceStatus = document.getElementById('compliance-status');
    const requiredActions = document.getElementById('required-actions');

    if (!checkButton) return;

    checkButton.addEventListener('click', () => {
        const turnover = document.getElementById('turnover').value;
        const healthInfo = document.getElementById('health-info').value;
        const personalInfo = document.getElementById('personal-info').value;

        const isSubjectToPrivacyAct = turnover === 'over3m' || healthInfo === 'yes';
        
        let statusHTML = '';
        let actionsHTML = '';

        if (isSubjectToPrivacyAct) {
            statusHTML = `
                <div class="status-indicator required">
                    ⚠️ Privacy Act Compliance Required
                </div>
                <p>Your business must comply with the Australian Privacy Act 1988.</p>
            `;

            const actions = [
                'Create a privacy policy explaining how you handle personal information',
                'Implement data breach notification procedures (72-hour reporting)',
                'Establish data collection limitation practices',
                'Set up individual access request procedures',
                'Implement reasonable security safeguards for personal information'
            ];

            if (personalInfo === 'sensitive') {
                actions.push('Implement additional security for sensitive personal information');
                actions.push('Consider obtaining cyber liability insurance');
            }

            actionsHTML = '<h5>Required Actions:</h5>';
            actions.forEach(action => {
                actionsHTML += `<div class="action-item">• ${action}</div>`;
            });

            actionsHTML += `
                <div class="compliance-timeline">
                    <h5>Implementation Timeline:</h5>
                    <div class="timeline-item">
                        <strong>Week 1-2:</strong> Draft privacy policy and data handling procedures
                    </div>
                    <div class="timeline-item">
                        <strong>Week 3-4:</strong> Implement data breach notification procedures
                    </div>
                    <div class="timeline-item">
                        <strong>Month 2:</strong> Train staff on privacy requirements and test procedures
                    </div>
                </div>
            `;
        } else {
            statusHTML = `
                <div class="status-indicator not-required">
                    Privacy Act Compliance Not Required
                </div>
                <p>Your business is not currently subject to Privacy Act requirements.</p>
            `;

            actionsHTML = `
                <h5>Recommended Best Practices:</h5>
                <div class="action-item">• Consider creating a privacy policy anyway (builds customer trust)</div>
                <div class="action-item">• Implement basic data security measures</div>
                <div class="action-item">• Monitor for changes in business size or data handling</div>
                
                <div class="compliance-timeline">
                    <h5>Future Considerations:</h5>
                    <div class="timeline-item">
                        <strong>Monitor:</strong> Annual turnover approaching $3 million
                    </div>
                    <div class="timeline-item">
                        <strong>Review:</strong> Data collection practices if business model changes
                    </div>
                </div>
            `;
        }

        complianceStatus.innerHTML = statusHTML;
        requiredActions.innerHTML = actionsHTML;
        complianceResults.classList.remove('hidden');
    });
}

    // Helper functions
    getResultBackground(resultClass) {
        switch(resultClass) {
            case 'success': return 'rgba(102, 187, 106, 0.2)';
            case 'warning': return 'rgba(255, 170, 0, 0.2)';
            case 'failure': return 'rgba(255, 112, 67, 0.2)';
            case 'critical': return 'rgba(244, 67, 54, 0.2)';
            default: return 'rgba(255, 255, 255, 0.05)';
        }
    }
 
    getResultBorder(resultClass) {
        switch(resultClass) {
            case 'success': return '2px solid #66bb6a';
            case 'warning': return '2px solid #ffaa00';
            case 'failure': return '2px solid #ff7043';
            case 'critical': return '2px solid #f44336';
            default: return '2px solid rgba(0, 150, 255, 0.3)';
        }
    }
 
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
 }
 
 document.addEventListener('DOMContentLoaded', () => {
    new InteractiveGuides();
 });
                