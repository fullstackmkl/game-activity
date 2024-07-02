document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const gameSection = document.getElementById('game-section');
    const signupSection = document.getElementById('signup-section');
    const questionText = document.getElementById('question-text');
    const answersDiv = document.getElementById('answers');
    const scoreElement = document.getElementById('score');
    const highscoresList = document.getElementById('highscores-list');
    let playerName = '';
    let score = 0;
    let currentQuestionIndex = 0;
    const questions = [
        {
            question: "What is the primary benefit of using temp labor in 2024?",
            answers: [
                "Flexibility in workforce management",
                "Higher cost",
                "Permanent employment",
                "Reduced productivity"
            ],
            correct: 0
        },
        {
            question: "Which best practice is crucial for temp labor onboarding?",
            answers: [
                "Ignoring training",
                "Comprehensive orientation programs",
                "Minimal communication",
                "No background checks"
            ],
            correct: 1
        },
        {
            question: "What is a key factor in retaining top temp talent?",
            answers: [
                "Low wages",
                "Lack of feedback",
                "Frequent layoffs",
                "Providing growth opportunities"
            ],
            correct: 3
        },
        {
            question: "Which technology is essential for managing a temp workforce?",
            answers: [
                "Manual spreadsheets",
                "Outdated software",
                "Workforce management platforms",
                "Phone calls"
            ],
            correct: 2
        },
        {
            question: "What is the role of a temp labor consultant?",
            answers: [
                "Hiring permanent staff",
                "Ignoring client needs",
                "Streamlining workforce strategies",
                "Increasing costs"
            ],
            correct: 2
        },
        {
            question: "Which is a critical component of a successful temp labor program?",
            answers: [
                "Ineffective communication",
                "Robust compliance policies",
                "Lack of monitoring",
                "No feedback mechanisms"
            ],
            correct: 1
        },
        {
            question: "How can a company ensure legal compliance in temp labor hiring?",
            answers: [
                "Ignoring labor laws",
                "Bypassing safety regulations",
                "Avoiding documentation",
                "Regular compliance audits"
            ],
            correct: 3
        },
        {
            question: "What is a major challenge in managing temp labor?",
            answers: [
                "Low employee turnover",
                "High turnover and retention",
                "Excessive stability",
                "Lack of flexibility"
            ],
            correct: 1
        },
        {
            question: "Which practice helps in integrating temp workers with full-time staff?",
            answers: [
                "Excluding temp workers from team activities",
                "Segregating temp workers",
                "Inclusive team-building activities",
                "Providing no support"
            ],
            correct: 2
        },
        {
            question: "What is the future trend in temp labor workforce management for 2024?",
            answers: [
                "Decreased use of technology",
                "Greater reliance on AI and automation",
                "Manual workforce management",
                "Reduction in temp labor demand"
            ],
            correct: 1
        }
    ];
    // Handle signup form submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        playerName = document.getElementById('name').value;
        signupSection.style.display = 'none';
        gameSection.style.display = 'block';
        startGame();
    });
    // Start the game
    function startGame() {
        score = 0;
        currentQuestionIndex = 0;
        updateScore(score);
        showQuestion(currentQuestionIndex);
    }
    // Show a question
    function showQuestion(index) {
        if (index < questions.length) {
            const question = questions[index];
            questionText.textContent = question.question;
            answersDiv.innerHTML = '';
            question.answers.forEach((answer, i) => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.addEventListener('click', () => handleAnswer(i));
                answersDiv.appendChild(button);
            });
        } else {
            endGame();
        }
    }
    // Handle answer selection
    function handleAnswer(selectedIndex) {
        if (selectedIndex === questions[currentQuestionIndex].correct) {
            score += 10;
            updateScore(score);
        }
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
    // Update the score display
    function updateScore(newScore) {
        scoreElement.textContent = newScore;
    }
    // End the game
    function endGame() {
        alert(`Quiz Over! Your score is ${score}`);
        recordHighScore();
        gameSection.style.display = 'none';
        signupSection.style.display = 'block';
    }
    // Record the high score
    function recordHighScore() {
        if (playerName) {
            saveHighScore(playerName, score);
            displayHighScores();
        }
    }
    // Save high score to local storage
    function saveHighScore(name, score) {
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const existingIndex = highScores.findIndex(entry => entry.name === name);
        if (existingIndex !== -1) {
            highScores[existingIndex].score = score;
        } else {
            highScores.push({ name, score });
        }
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
    // Display high scores
    function displayHighScores() {
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highscoresList.innerHTML = '';
        highScores.forEach((entry) => {
            let li = document.createElement('li');
            li.textContent = `${entry.name}: ${entry.score}`;
            highscoresList.appendChild(li);
        });
    }
    // Initial display of high scores
    displayHighScores();
 });