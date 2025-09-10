// References
const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const powerBtn = document.querySelector(".power");


let currentInput = "0"; // start value
// Initial state
let isOn = true;
powerBtn.classList.add("on"); // start green

powerBtn.addEventListener("click", () => {
    isOn = !isOn; // toggle state

    if (isOn) {
        powerBtn.textContent = "ON";
        powerBtn.classList.remove("off");
        powerBtn.classList.add("on");

        currentInput = "0";       // Display 0
        updateDisplay();

        enableButtons();

        display.disabled = false; // make input editable
        display.focus();          // Cursor starts blinking automatically
    } else {
        powerBtn.textContent = "OFF";
        powerBtn.classList.remove("on");
        powerBtn.classList.add("off");

         currentInput = "";        // reset currentInput
        updateDisplay();          // display blank
        disableButtons();

        display.readOnly = true;  // prevent typing
    }
});


function disableButtons() {
    document.querySelectorAll("button").forEach(btn => {
        if (!btn.classList.contains("power")) btn.disabled = true;
    });
}

function enableButtons() {
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });
}

// Numbers
numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!isOn) return;
        if (currentInput === "0") currentInput = "";
        currentInput += btn.textContent;
        updateDisplay();
    });
});

// Operators
operators.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!isOn) return;
        if (currentInput === "" || /[+\-*/]$/.test(currentInput)) return;
        currentInput += btn.textContent;
        updateDisplay();
    });
});

// Decimal
decimal.addEventListener("click", () => {
    if (!isOn) return;
    const parts = currentInput.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
        if (currentInput === "0") currentInput = "";
        currentInput += ".";
        updateDisplay();
    }
});

// Clear
clear.addEventListener("click", () => {
    if (!isOn) return;
    currentInput = "0";
    updateDisplay();
});

// Backspace
backspace.addEventListener("click", () => {
    if (!isOn) return;
    if (currentInput.length === 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
});

// Equals
equals.addEventListener("click", () => {
    if (!isOn) return;
    if (/[+\-*/]$/.test(currentInput)) return;
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch {
        display.value = "Error";
        currentInput = "0";
    }
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if (!isOn) return;
    if (e.key >= '0' && e.key <= '9') {
        if (currentInput === "0") currentInput = "";
        currentInput += e.key;
        updateDisplay();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        if (currentInput === "" || /[+\-*/]$/.test(currentInput)) return;
        currentInput += e.key;
        updateDisplay();
    } else if (e.key === 'Enter') {
        if (/[+\-*/]$/.test(currentInput)) return;
        try {
            currentInput = eval(currentInput).toString();
            updateDisplay();
        } catch {
            display.value = "Error";
            currentInput = "0";
        }
    } else if (e.key === 'Backspace') {
        if (currentInput.length === 1) {
            currentInput = "0";
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    } else if (e.key === '.') {
        const parts = currentInput.split(/[+\-*/]/);
        const lastPart = parts[parts.length - 1];
        if (!lastPart.includes(".")) {
            if (currentInput === "0") currentInput = "";
            currentInput += ".";
            updateDisplay();
        }
    }
});
