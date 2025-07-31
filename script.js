document.addEventListener('DOMContentLoaded', () => {
    const selectionScreen = document.getElementById('selection-screen');
    const calculatorContainer = document.getElementById('calculator-container');
    const selectVectorsBtn = document.getElementById('select-vectors');
    const selectMatricesBtn = document.getElementById('select-matrices');

    selectVectorsBtn.addEventListener('click', () => loadCalculator('vectors'));
    selectMatricesBtn.addEventListener('click', () => loadCalculator('matrices'));

    function loadCalculator(type) {
        selectionScreen.style.display = 'none';
        calculatorContainer.style.display = 'block';

        if (type === 'vectors') {
            calculatorContainer.innerHTML = `
                <div class="container">
                    <button id="back-button" class="back-button">Volver</button>
                    <h1>Calculadora de Vectores</h1>
                    <div class="dimension-selector">
                        <label for="dimension-select">Espacio Vectorial:</label>
                        <select id="dimension-select">
                            <option value="r3">R3 (X, Y, Z)</option>
                            <option value="r2">R2 (X, Y)</option>
                            <option value="rn">Rn (componentes por coma)</option>
                        </select>
                    </div>

                    <div class="controls">
                        <div id="component-inputs">
                            <div class="vector-input">
                                <label for="v1x">Vector 1</label>
                                <div class="vector-components">
                                    <input type="number" id="v1x" placeholder="X">
                                    <input type="number" id="v1y" placeholder="Y">
                                    <input type="number" id="v1z" placeholder="Z" class="component-z">
                                </div>
                            </div>
                            <div class="vector-input" id="vector2-component-input">
                                <label for="v2x">Vector 2</label>
                                <div class="vector-components">
                                    <input type="number" id="v2x" placeholder="X">
                                    <input type="number" id="v2y" placeholder="Y">
                                    <input type="number" id="v2z" placeholder="Z" class="component-z">
                                </div>
                            </div>
                        </div>

                        <div id="rn-inputs" style="display: none;">
                            <div class="vector-input-rn">
                                <label for="vector1-rn">Vector 1 (ej: 1,2,3,4)</label>
                                <input type="text" id="vector1-rn" placeholder="Componentes separadas por comas">
                            </div>
                            <div class="vector-input-rn" id="vector2-rn-input">
                                <label for="vector2-rn">Vector 2 (ej: 5,6,7,8)</label>
                                <input type="text" id="vector2-rn" placeholder="Componentes separadas por comas">
                            </div>
                        </div>

                        <div class="operation-selector">
                            <label for="operation">Operación:</label>
                            <select id="operation">
                                <option value="add">Suma</option>
                                <option value="subtract">Resta</option>
                                <option value="dot">Producto Punto</option>
                                <option value="cross">Producto Vectorial (solo R3)</option>
                                <option value="angle">Ángulo entre Vectores</option>
                                <option value="scalarMultiply">Multiplicación por Escalar</option>
                                <option value="unit">Vector Unitario</option>
                            </select>
                        </div>
                        <div class="scalar-input-container" style="display: none;">
                            <label for="scalar-input">Escalar:</label>
                            <input type="number" id="scalar-input" placeholder="Ingrese el escalar">
                        </div>
                        <button id="calculate">Calcular</button>
                    </div>

                    <div class="result">
                        <div class="result-header">
                            <h2>Resultado</h2>
                            <div class="format-toggle">
                                <button id="format-decimal" class="active">Decimal</button>
                                <button id="format-fraction">Fracción</button>
                            </div>
                        </div>
                        <p id="result-output">El resultado aparecerá aquí.</p>
                    </div>
                </div>
            `;
            initVectorCalculator();
        } else if (type === 'matrices') {
            calculatorContainer.innerHTML = `
                <div class="container">
                    <button id="back-button" class="back-button">Volver</button>
                    <h1>Calculadora de Matrices</h1>

                    <div class="matrix-controls">
                        <div class="matrix-size">
                            <label>Matriz A: </label>
                            <input type="number" id="rowsA" min="1" max="10" value="3">
                            <span>&times;</span>
                            <input type="number" id="colsA" min="1" max="10" value="3">
                        </div>
                        <div class="matrix-size">
                            <label>Matriz B: </label>
                            <input type="number" id="rowsB" min="1" max="10" value="3">
                            <span>&times;</span>
                            <input type="number" id="colsB" min="1" max="10" value="3">
                        </div>
                        <button id="create-matrices-btn">Crear / Reiniciar Matrices</button>
                    </div>

                    <div id="message-area" class="message"></div>

                    <div class="matrices-container">
                        <div class="matrix-wrapper">
                            <h2>Matriz A</h2>
                            <div id="matrixA-container" class="matrix-container"></div>
                        </div>
                        <div class="matrix-wrapper">
                            <h2>Matriz B</h2>
                            <div id="matrixB-container" class="matrix-container"></div>
                        </div>
                    </div>

                    <div class="operations">
                        <h2>Operaciones</h2>
                        <div class="op-buttons">
                            <button data-op="add">A + B</button>
                            <button data-op="subtract">A - B</button>
                            <button data-op="multiply">A &times; B</button>
                        </div>
                        <div class="op-buttons">
                            <button data-op="transposeA">Transpuesta(A)</button>
                            <button data-op="determinantA">Determinante(A)</button>
                            <button data-op="cofactorsA">Matriz de Cofactores(A)</button>
                            <button data-op="inverseA">Inversa(A)</button>
                        </div>
                         <div class="op-buttons">
                            <button data-op="transposeB">Transpuesta(B)</button>
                            <button data-op="determinantB">Determinante(B)</button>
                            <button data-op="cofactorsB">Matriz de Cofactores(B)</button>
                            <button data-op="inverseB">Inversa(B)</button>
                        </div>
                    </div>

                    <div class="result-container">
                        <h2>Resultado</h2>
                        <div id="result-display"></div>
                    </div>
                </div>
            `;
            initMatrixCalculator();
        }
    }

    function initVectorCalculator() {
        const dimensionSelect = document.getElementById('dimension-select');
        const componentInputs = document.getElementById('component-inputs');
        const rnInputs = document.getElementById('rn-inputs');
        const operationSelect = document.getElementById('operation');
        const calculateButton = document.getElementById('calculate');
        const resultOutput = document.getElementById('result-output');
        const vector2ComponentInput = document.getElementById('vector2-component-input');
        const vector2RnInput = document.getElementById('vector2-rn-input');
        const formatDecimalBtn = document.getElementById('format-decimal');
        const formatFractionBtn = document.getElementById('format-fraction');
        const backButton = document.getElementById('back-button');

        backButton.addEventListener('click', () => {
            calculatorContainer.style.display = 'none';
            selectionScreen.style.display = 'flex';
        });

        let currentRawResult = null;
        let currentFormat = 'decimal';

        function toFraction(decimal, tol = 1e-9) {
            if (decimal === 0) return "0";
            if (Math.abs(decimal - Math.round(decimal)) < tol) return `${Math.round(decimal)}`;

            let sign = decimal < 0 ? "-" : "";
            decimal = Math.abs(decimal);

            let n1 = 0, d1 = 1;
            let n2 = 1, d2 = 0;
            let b = decimal;
            while (true) {
                let a = Math.floor(b);
                let n = a * n2 + n1;
                let d = a * d2 + d1;
                if (d > 10000) break;
                n1 = n2; d1 = d2;
                n2 = n; d2 = d;
                if (Math.abs(decimal - n / d) < tol) return `${sign}${n}/${d}`;
                b = 1 / (b - a);
                if (b > 1e12) break;
            }
            return `${sign}${decimal.toFixed(5)}`;
        }

        function formatNumber(num) {
            if (currentFormat === 'fraction') return toFraction(num);
            return Math.abs(num - Math.round(num)) < 1e-9 ? num.toString() : num.toFixed(3);
        }

        function displayResult(result) {
            currentRawResult = result;
            if (currentFormat === 'fraction' && result.symbolic) {
                const { components, magSquared } = result.symbolic;
                const mag = Math.sqrt(magSquared);
                if (mag % 1 !== 0) { // It's an irrational root
                    const symbolicStrings = components.map(c => `${c}/√${magSquared}`);
                    resultOutput.textContent = `[${symbolicStrings.join(', ')}]`;
                    return;
                }
            }
            resultOutput.textContent = Array.isArray(result) ? `[${result.map(formatNumber).join(', ')}]` : formatNumber(result);
        }

        formatDecimalBtn.addEventListener('click', () => {
            currentFormat = 'decimal';
            formatDecimalBtn.classList.add('active');
            formatFractionBtn.classList.remove('active');
            if (currentRawResult !== null) displayResult(currentRawResult);
        });

        formatFractionBtn.addEventListener('click', () => {
            currentFormat = 'fraction';
            formatFractionBtn.classList.add('active');
            formatDecimalBtn.classList.remove('active');
            if (currentRawResult !== null) displayResult(currentRawResult);
        });

        dimensionSelect.addEventListener('change', () => {
            const dimension = dimensionSelect.value;
            const isRn = dimension === 'rn';
            componentInputs.style.display = isRn ? 'none' : 'grid';
            rnInputs.style.display = isRn ? 'grid' : 'none';
            document.querySelector('#operation option[value="cross"]').disabled = dimension !== 'r3';
            if (dimension !== 'r3' && operationSelect.value === 'cross') {
                operationSelect.value = 'add';
            }
            document.querySelectorAll('.component-z').forEach(el => {
                el.style.display = dimension === 'r2' ? 'none' : 'block';
            });
            clearInputs();
            resultOutput.textContent = 'El resultado aparecerá aquí.';
            operationSelect.dispatchEvent(new Event('change'));
        });

        operationSelect.addEventListener('change', () => {
            const operation = operationSelect.value;
            const isTwoVectorOp = ['add', 'subtract', 'dot', 'cross', 'angle'].includes(operation);
            const isScalarOp = operation === 'scalarMultiply';
            
            vector2ComponentInput.style.display = isTwoVectorOp ? 'flex' : 'none';
            vector2RnInput.style.display = isTwoVectorOp ? 'block' : 'none';
            document.querySelector('.scalar-input-container').style.display = isScalarOp ? 'flex' : 'none';

            if (!isTwoVectorOp && !isScalarOp) { // Handle single-vector ops like 'unit'
                 vector2ComponentInput.style.display = 'none';
                 vector2RnInput.style.display = 'none';
            }
        });

        calculateButton.addEventListener('click', () => {
            try {
                const dimension = dimensionSelect.value;
                const op = operationSelect.value;
                let v1, v2;
                const isTwoVectorOp = ['add', 'subtract', 'dot', 'cross', 'angle'].includes(op);

                if (dimension === 'rn') {
                    v1 = document.getElementById('vector1-rn').value.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
                    if (isTwoVectorOp) {
                        v2 = document.getElementById('vector2-rn').value.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
                    }
                } else {
                    v1 = getComponentVector('v1', dimension);
                    if (isTwoVectorOp) {
                        v2 = getComponentVector('v2', dimension);
                    }
                }

                if (v1.some(isNaN) || (isTwoVectorOp && v2 && v2.some(isNaN))) {
                    throw new Error('Asegúrate de que los vectores contengan solo números.');
                }
                if (v1.length === 0) {
                     throw new Error('El vector 1 no puede estar vacío.');
                }

                let result;
                switch (op) {
                    case 'add':
                    case 'subtract':
                    case 'dot':
                        if (!v2 || v1.length !== v2.length) throw new Error('Los vectores deben tener la misma dimensión.');
                        if (op === 'add') result = v1.map((val, i) => val + v2[i]);
                        if (op === 'subtract') result = v1.map((val, i) => val - v2[i]);
                        if (op === 'dot') result = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
                        break;
                    case 'cross':
                        if (!v2 || v1.length !== 3 || v2.length !== 3) throw new Error('El producto vectorial solo está definido para R3.');
                        result = [ v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], v1[0]*v2[1] - v1[1]*v2[0] ];
                        break;
                    case 'angle':
                        if (!v2 || v1.length !== v2.length) throw new Error('Los vectores deben tener la misma dimensión.');
                        const dotProduct = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
                        const mag1 = Math.sqrt(v1.reduce((acc, val) => acc + val*val, 0));
                        const mag2 = Math.sqrt(v2.reduce((acc, val) => acc + val*val, 0));
                        if (mag1 === 0 || mag2 === 0) throw new Error('No se puede calcular el ángulo con un vector cero.');
                        const cosTheta = dotProduct / (mag1 * mag2);
                        result = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI); // en grados
                        break;
                    case 'scalarMultiply':
                        const scalar = parseFloat(document.getElementById('scalar-input').value);
                        if(isNaN(scalar)) throw new Error('Por favor, ingrese un escalar válido.');
                        result = v1.map(val => val * scalar);
                        break;
                    case 'unit':
                        const magSquared = v1.reduce((acc, val) => acc + val*val, 0);
                        const mag = Math.sqrt(magSquared);
                        if (mag === 0) throw new Error('No se puede calcular el vector unitario de un vector cero.');
                        result = v1.map(val => val / mag);
                        result.symbolic = { components: v1, magSquared: magSquared };
                        break;
                }

                displayResult(result);

            } catch (e) {
                resultOutput.textContent = e.message;
            }
        });

        function getComponentVector(idPrefix, dimension) {
            const x = parseFloat(document.getElementById(`${idPrefix}x`).value);
            const y = parseFloat(document.getElementById(`${idPrefix}y`).value);
            if (dimension === 'r2') {
                if (isNaN(x) || isNaN(y)) throw new Error('Componentes X e Y no pueden estar vacías.');
                return [x, y];
            }
            const z = parseFloat(document.getElementById(`${idPrefix}z`).value);
            if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error('Componentes X, Y y Z no pueden estar vacías.');
            return [x, y, z];
        }

        function clearInputs() {
            document.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => input.value = '');
        }

        dimensionSelect.dispatchEvent(new Event('change'));
        operationSelect.dispatchEvent(new Event('change'));
    }

    function initMatrixCalculator() {
        const createMatricesBtn = document.getElementById('create-matrices-btn');
        const messageArea = document.getElementById('message-area');
        const resultDisplay = document.getElementById('result-display');
        const backButton = document.getElementById('back-button');

        backButton.addEventListener('click', () => {
            calculatorContainer.style.display = 'none';
            selectionScreen.style.display = 'flex';
        });

        const generateMatrixGrid = (rows, cols, containerId) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const table = document.createElement('table');
            for (let i = 0; i < rows; i++) {
                const tr = document.createElement('tr');
                for (let j = 0; j < cols; j++) {
                    const td = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.value = '0';
                    input.setAttribute('data-row', i);
                    input.setAttribute('data-col', j);
                    td.appendChild(input);
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            container.appendChild(table);
        };

        const createMatrices = () => {
            const rowsA = parseInt(document.getElementById('rowsA').value);
            const colsA = parseInt(document.getElementById('colsA').value);
            const rowsB = parseInt(document.getElementById('rowsB').value);
            const colsB = parseInt(document.getElementById('colsB').value);

            if (isNaN(rowsA) || isNaN(colsA) || isNaN(rowsB) || isNaN(colsB) || rowsA < 1 || colsA < 1 || rowsB < 1 || colsB < 1) {
                showMessage('Las dimensiones deben ser números positivos.', 'error');
                return;
            }

            generateMatrixGrid(rowsA, colsA, 'matrixA-container');
            generateMatrixGrid(rowsB, colsB, 'matrixB-container');
            showMessage('Matrices creadas. Ingresa los valores.', 'success');
            resultDisplay.innerHTML = '';
        };

        createMatricesBtn.addEventListener('click', createMatrices);

        const getMatrixValues = (containerId) => {
            const container = document.getElementById(containerId);
            const inputs = container.querySelectorAll('input');
            if (inputs.length === 0) return null;

            const rows = parseInt(inputs[inputs.length - 1].getAttribute('data-row')) + 1;
            const cols = parseInt(inputs[inputs.length - 1].getAttribute('data-col')) + 1;
            const matrix = [];

            for (let i = 0; i < rows; i++) {
                matrix.push([]);
                for (let j = 0; j < cols; j++) {
                    const input = container.querySelector(`input[data-row='${i}'][data-col='${j}']`);
                    const value = parseFloat(input.value);
                    if (isNaN(value)) {
                        showMessage(`Valor no numérico en la matriz en la fila ${i+1}, columna ${j+1}.`, 'error');
                        throw new Error('Invalid input');
                    }
                    matrix[i].push(value);
                }
            }
            return matrix;
        };

        const displayMatrix = (matrix) => {
            resultDisplay.innerHTML = '';
            const table = document.createElement('table');
            matrix.forEach(rowData => {
                const tr = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = Number(cellData.toFixed(4));
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            resultDisplay.appendChild(table);
        };
        
        const displayValue = (value) => {
            resultDisplay.innerHTML = `<strong>${Number(value.toFixed(4))}</strong>`;
        };

        const showMessage = (msg, type = 'info') => {
            messageArea.textContent = msg;
            messageArea.className = `message ${type}`;
        };

        const add = (a, b) => {
            if (a.length !== b.length || a[0].length !== b[0].length) {
                throw new Error('Las matrices deben tener las mismas dimensiones para la suma.');
            }
            return a.map((row, i) => row.map((val, j) => val + b[i][j]));
        };

        const subtract = (a, b) => {
            if (a.length !== b.length || a[0].length !== b[0].length) {
                throw new Error('Las matrices deben tener las mismas dimensiones para la resta.');
            }
            return a.map((row, i) => row.map((val, j) => val - b[i][j]));
        };

        const multiply = (a, b) => {
            if (a[0].length !== b.length) {
                throw new Error('El número de columnas de A debe ser igual al número de filas de B para la multiplicación.');
            }
            const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < b[0].length; j++) {
                    for (let k = 0; k < a[0].length; k++) {
                        result[i][j] += a[i][k] * b[k][j];
                    }
                }
            }
            return result;
        };

        const transpose = (matrix) => {
            const rows = matrix.length;
            const cols = matrix[0].length;
            const result = Array(cols).fill(0).map(() => Array(rows).fill(0));
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    result[j][i] = matrix[i][j];
                }
            }
            return result;
        };

        const determinant = (matrix) => {
            if (matrix.length !== matrix[0].length) {
                throw new Error('La matriz debe ser cuadrada para calcular el determinante.');
            }
            const n = matrix.length;
            if (n === 1) return matrix[0][0];
            if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

            let det = 0;
            for (let j = 0; j < n; j++) {
                det += matrix[0][j] * cofactor(matrix, 0, j);
            }
            return det;
        };
        
        const cofactor = (matrix, row, col) => {
            return Math.pow(-1, row + col) * determinant(minor(matrix, row, col));
        };

        const minor = (matrix, row, col) => {
            return matrix.filter((_, r) => r !== row).map(r => r.filter((_, c) => c !== col));
        };

        const matrixOfCofactors = (matrix) => {
            if (matrix.length !== matrix[0].length) {
                throw new Error('La matriz debe ser cuadrada para calcular la matriz de cofactores.');
            }
            const n = matrix.length;
            const cofactorMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    cofactorMatrix[i][j] = cofactor(matrix, i, j);
                }
            }
            return cofactorMatrix;
        };

        const inverse = (matrix) => {
            const det = determinant(matrix); 
            if (det === 0) {
                throw new Error('La matriz es singular (determinante es 0) y no tiene inversa.');
            }
            const cofactorMatrix = matrixOfCofactors(matrix);
            const adjugateMatrix = transpose(cofactorMatrix);
            
            return adjugateMatrix.map(row => row.map(val => val / det));
        };

        document.querySelector('.operations').addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            const operation = e.target.dataset.op;
            if (!operation) return;

            try {
                const matrixA = getMatrixValues('matrixA-container');
                const matrixB = getMatrixValues('matrixB-container');
                let result;

                switch (operation) {
                    case 'add':
                        if (!matrixA || !matrixB) throw new Error('Ambas matrices son necesarias.');
                        result = add(matrixA, matrixB);
                        displayMatrix(result);
                        break;
                    case 'subtract':
                        if (!matrixA || !matrixB) throw new Error('Ambas matrices son necesarias.');
                        result = subtract(matrixA, matrixB);
                        displayMatrix(result);
                        break;
                    case 'multiply':
                        if (!matrixA || !matrixB) throw new Error('Ambas matrices son necesarias.');
                        result = multiply(matrixA, matrixB);
                        displayMatrix(result);
                        break;
                    case 'transposeA':
                        if (!matrixA) throw new Error('La Matriz A es necesaria.');
                        result = transpose(matrixA);
                        displayMatrix(result);
                        break;
                    case 'determinantA':
                        if (!matrixA) throw new Error('La Matriz A es necesaria.');
                        result = determinant(matrixA);
                        displayValue(result);
                        break;
                    case 'cofactorsA':
                        if (!matrixA) throw new Error('La Matriz A es necesaria.');
                        result = matrixOfCofactors(matrixA);
                        displayMatrix(result);
                        break;
                    case 'inverseA':
                        if (!matrixA) throw new Error('La Matriz A es necesaria.');
                        result = inverse(matrixA);
                        displayMatrix(result);
                        break;
                    case 'transposeB':
                        if (!matrixB) throw new Error('La Matriz B es necesaria.');
                        result = transpose(matrixB);
                        displayMatrix(result);
                        break;
                    case 'determinantB':
                        if (!matrixB) throw new Error('La Matriz B es necesaria.');
                        result = determinant(matrixB);
                        displayValue(result);
                        break;
                    case 'cofactorsB':
                        if (!matrixB) throw new Error('La Matriz B es necesaria.');
                        result = matrixOfCofactors(matrixB);
                        displayMatrix(result);
                        break;
                    case 'inverseB':
                        if (!matrixB) throw new Error('La Matriz B es necesaria.');
                        result = inverse(matrixB);
                        displayMatrix(result);
                        break;
                }
                showMessage('Operación realizada con éxito.', 'success');
            } catch (error) {
                showMessage(error.message, 'error');
                resultDisplay.innerHTML = '';
            }
        });

        createMatrices();
    }
});
