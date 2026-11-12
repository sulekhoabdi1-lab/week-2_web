/* ==========================================
   SpendWise JavaScript Foundation - Week 6
   ========================================== */
let totalMonthlyBudget = 2500.00;
let userName = "MAANAF 7";

// 2. Store Application Data (Variables & Data Types)
let totalMonthlyBudget = 2500.00; // Number data type representing total budget
let userName = "MAANAF 7";         // String data type representing user

// Array containing expense objects with name and amount properties
let expensesList = [
    { name: "Food & Dining", amount: 345.50 },
    { name: "Transport", amount: 120.00 },
    { name: "Rent & Housing", amount: 850.00 },
    { name: "Entertainment", amount: 75.20 },
    { name: "Utilities", amount: 190.40 }
    { name: "Food & Dining", amount: 345.50, category: "Expense" },
    { name: "Transport", amount: 120.00, category: "Expense" },
    { name: "Rent & Housing", amount: 850.00, category: "Fixed" },
    { name: "Entertainment", amount: 75.20, category: "Expense" },
    { name: "Utilities", amount: 190.40, category: "Bills" }
];

// 5. Create Reusable Functions
// Function to calculate total expenses from an array
function calculateTotalExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
@@ -25,58 +17,85 @@ function calculateTotalExpenses(expenses) {
    return total;
}

// Function to calculate the remaining balance
function calculateRemainingBalance(budget, totalExpenses) {
    return budget - totalExpenses;
}

// Function to display results clearly labeled in the browser console
function displayFinancialSummary(user, budget, expenses) {
    console.log("========================================");
    console.log(`       SPENDWISE FINANCIAL REPORT       `);
    console.log(`       User: ${user}                    `);
    console.log("========================================");
    console.log(`Initial Budget: $${budget.toFixed(2)}`);
    console.log("----------------------------------------");
    console.log("Expense Categories Breakdown:");
    
    for (let i = 0; i < expenses.length; i++) {
        console.log(`  - ${expenses[i].name}: $${expenses[i].amount.toFixed(2)}`);
    }
function updateDashboard() {
    const budgetEl = document.getElementById("summary-budget");
    const spentEl = document.getElementById("summary-spent");
    const balanceEl = document.getElementById("summary-balance");
    const alertEl = document.getElementById("budget-alert");
    const containerEl = document.getElementById("expenses-container");

    let totalSpent = calculateTotalExpenses(expensesList);
    let remainingBalance = calculateRemainingBalance(totalMonthlyBudget, totalSpent);

    // 4. Perform Budget Calculations using reusable functions
    let totalSpent = calculateTotalExpenses(expenses);
    let remainingBalance = calculateRemainingBalance(budget, totalSpent);
    budgetEl.textContent = `$${totalMonthlyBudget.toFixed(2)}`;
    spentEl.textContent = `$${totalSpent.toFixed(2)}`;
    balanceEl.textContent = `$${remainingBalance.toFixed(2)}`;

    console.log("----------------------------------------");
    console.log(`Total Expenses: $${totalSpent.toFixed(2)}`);
    console.log(`Remaining Balance: $${remainingBalance.toFixed(2)}`);
    
    containerEl.innerHTML = "";
    for (let i = 0; i < expensesList.length; i++) {
        let item = expensesList[i];
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute("tabindex", "0");
        card.innerHTML = `
            <div class="card-header">
                <h3>${item.name}</h3>
                <span class="badge">${item.category || 'Expense'}</span>
            </div>
            <div class="card-body">
                <p class="amount">$${item.amount.toFixed(2)}</p>
                <span class="sub-text">Recorded Expense</span>
            </div>
        `;
        containerEl.appendChild(card);
    }

    alertEl.style.display = "block";
    if (remainingBalance < 0) {
        console.log("ALERT: You have exceeded your budget!");
        alertEl.style.backgroundColor = "#fee2e2";
        alertEl.style.color = "#991b1b";
        alertEl.textContent = "ALERT: You have exceeded your monthly budget! Review your spending.";
    } else if (remainingBalance < (totalMonthlyBudget * 0.2)) {
        alertEl.style.backgroundColor = "#fef3c7";
        alertEl.style.color = "#92400e";
        alertEl.textContent = "WARNING: You are running low on funds (less than 20% remaining).";
    } else {
        console.log("STATUS: Your budget is balanced and healthy.");
        alertEl.style.backgroundColor = "#dcfce7";
        alertEl.style.color = "#166534";
        alertEl.textContent = "STATUS: Your budget is balanced and healthy.";
    }
    console.log("========================================");
}

// 3. Collect User Input via JavaScript Prompt (Interactive feature)
function initSpendWiseApp() {
    let userInput = prompt("Enter your total monthly budget amount (or click OK to keep default $2500):", totalMonthlyBudget);
    
    if (userInput !== null && userInput.trim() !== "") {
        let parsedInput = parseFloat(userInput);
        if (!isNaN(parsedInput)) {
            totalMonthlyBudget = parsedInput;
            console.log(`User updated budget to: $${totalMonthlyBudget.toFixed(2)}`);
        } else {
            console.log("Invalid input detected. Using default budget value.");
        }
    }
document.addEventListener("DOMContentLoaded", function() {
    updateDashboard();

    // Display the calculated report in the console
    displayFinancialSummary(userName, totalMonthlyBudget, expensesList);
}
    const form = document.getElementById("expense-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nameInput = document.getElementById("expense-name");
        let amountInput = document.getElementById("expense-amount");

        let nameVal = nameInput.value.trim();
        let amountVal = parseFloat(amountInput.value);

// Execute application logic on load
initSpendWiseApp();
        if (nameVal !== "" && !isNaN(amountVal) && amountVal > 0) {
            expensesList.push({
                name: nameVal,
                amount: amountVal,
                category: "Custom"
            });

            nameInput.value = "";
            amountInput.value = "";

            updateDashboard();
        } else {
            alert("Please enter a valid expense name and a positive amount.");
        }
    });
});
