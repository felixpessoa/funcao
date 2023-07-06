function calculateCoefficients() {
  const point1X = parseFloat(document.getElementById('point1-x').value);
  const point1Y = parseFloat(document.getElementById('point1-y').value);
  const point2X = parseFloat(document.getElementById('point2-x').value);
  const point2Y = parseFloat(document.getElementById('point2-y').value);
  const point3X = parseFloat(document.getElementById('point3-x').value);
  const point3Y = parseFloat(document.getElementById('point3-y').value);

  if (
    isNaN(point1X) || isNaN(point1Y) ||
    isNaN(point2X) || isNaN(point2Y) ||
    isNaN(point3X) || isNaN(point3Y)
  ) {
    document.getElementById('result').textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const matrixA = [
    [Math.pow(point1X, 2), point1X, 1],
    [Math.pow(point2X, 2), point2X, 1],
    [Math.pow(point3X, 2), point3X, 1]
  ];

  const matrixB = [
    [point1Y],
    [point2Y],
    [point3Y]
  ];

  const inverseMatrixA = math.inv(matrixA);
  const coefficients = math.multiply(inverseMatrixA, matrixB);

  const a = Math.round(coefficients[0][0]);
  const b = Math.round(coefficients[1][0]);
  const c = Math.round(coefficients[2][0]);

  const result = `Coeficientes: a = ${a}, b = ${b}, c = ${c}`;
  document.getElementById('result').textContent = result;

  // Calcular as raízes
  calculateRoots(a, b, c);
}

function calculateRoots(a, b, c) {
  var discriminant = b * b - 4 * a * c;
  var roots = [];

  if (discriminant > 0) {
    var root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    var root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    roots.push(root1, root2);
  } else if (discriminant === 0) {
    var root = -b / (2 * a);
    roots.push(root);
  }

  if (roots.length > 0) {
    document.getElementById("roots").innerHTML = "Raízes: " + roots.join(", ");
  } else {
    document.getElementById("roots").innerHTML = "Não há raízes reais";
  }
}

function clearFields() {
  document.getElementById('point1-x').value = '';
  document.getElementById('point1-y').value = '';
  document.getElementById('point2-x').value = '';
  document.getElementById('point2-y').value = '';
  document.getElementById('point3-x').value = '';
  document.getElementById('point3-y').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('roots').textContent = '';
}

function clearFields2() {
  document.getElementById("input-a").value = '';
  document.getElementById("input-b").value = '';
  document.getElementById("input-c").value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('roots').textContent= '';
}

const calculateButton = document.getElementById('calculate-btn');
calculateButton.addEventListener('click', calculateCoefficients);

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', clearFields);

const clearButton2 = document.getElementById('clear-btn2');
clearButton2.addEventListener('click', clearFields2);

document.getElementById("quadratic-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var a = parseFloat(document.getElementById("input-a").value);
  var b = parseFloat(document.getElementById("input-b").value);
  var c = parseFloat(document.getElementById("input-c").value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    document.getElementById("result").innerHTML = "Por favor, insira valores numéricos para os coeficientes.";
    return;
  }

  document.getElementById("result").innerHTML = "";

  // Calcular as raízes
  calculateRoots(a, b, c);
});
