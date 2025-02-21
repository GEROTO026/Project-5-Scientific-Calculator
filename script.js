// Variables para el historial
let history = [];

// Función para agregar operaciones al display
function appendOperation(operation) {
    const display = document.getElementById('display');
    display.value += operation;
}

// Función para limpiar el display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Función para eliminar el último carácter
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Función para calcular el resultado
function calculateResult() {
    const display = document.getElementById('display');
    try {
        const result = evaluateExpression(display.value);
        display.value = result;
        // Agregar al historial
        addToHistory(display.value, result);
    } catch (error) {
        display.value = 'Error';
    }
}

// Función para evaluar la expresión de manera segura
function evaluateExpression(expression) {
    expression = expression.replace(/Math\.sin\(/g, 'Math.sin(')
                           .replace(/Math\.cos\(/g, 'Math.cos(')
                           .replace(/Math\.tan\(/g, 'Math.tan(')
                           .replace(/Math\.log\(/g, 'Math.log(')
                           .replace(/Math\.sqrt\(/g, 'Math.sqrt(')
                           .replace(/Math\.pow\(/g, 'Math.pow(')
                           .replace(/π/g, 'Math.PI')
                           .replace(/e/g, 'Math.E');

    if (!/^[0-9+\-*/(). MathsincostanlogsqrtpowPIe]*$/.test(expression)) {
        throw new Error('Expresión inválida');
    }

    return new Function('return ' + expression)();
}

// Función para agregar una operación al historial
function addToHistory(operation, result) {
    history.push({ operation, result });
    updateHistory();
}

// Función para actualizar el historial en la interfaz
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.slice(-5).forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.operation} = ${item.result}`;
        historyList.appendChild(li);
    });
}

// Función para cambiar entre temas claro y oscuro
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
    }
}