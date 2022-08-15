function getInputData() {
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  return { weight, height };
}

function validateInputData(weight, height) {
  return !(weight <= 0 || height <= 0);
}

function calcBmi(weight, height) {
  const bmi = (weight / (height * height)) * 10000;
  return bmi.toFixed(2);
}

function bmiStatusClass(bmi) {
  if (bmi < 18.5) {
    return 'under';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'normal';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'over';
  } else if (bmi >= 30.0 && bmi <= 35.9) {
    return 'obese';
  } else {
    return 'extrem';
  }
}

function showResult(bmi, statusClass) {
  const bmiDiv = document.querySelector('.bmi');
  bmiDiv.insertAdjacentHTML(
    'beforeend',
    `
    <div class="overlay"></div>
    <div class="card overlay__window">
      <div class="overlay__window--top">
        <button class="overlay__window--btn">x</button>
      </div>
      <div class="overlay__window--body">Your BMI is <span class="${statusClass}">${bmi}</span></div>
    </div>
  `,
  );

  const overlayWindowBtn = document.querySelector('.overlay__window--btn');
  overlayWindowBtn.addEventListener('click', closeResult);
}

function closeError() {
  const bmiDiv = document.querySelector('.bmi');
  const errorDiv = document.querySelector('.error');

  if (errorDiv) {
    bmiDiv.removeChild(errorDiv);
  }
}

function showError() {
  const bmiDiv = document.querySelector('.bmi');

  closeError();

  bmiDiv.insertAdjacentHTML(
    'beforeend',
    `
      <div class="error">Enter numbers only</div>
    `,
  );
}

function closeResult() {
  const bmiDiv = document.querySelector('.bmi');
  const overlayDiv = document.querySelector('.overlay');
  const overlayWindowDiv = document.querySelector('.overlay__window');

  bmiDiv.removeChild(overlayDiv);
  bmiDiv.removeChild(overlayWindowDiv);
}

function handleSubmit(event) {
  event.preventDefault();

  const { weight, height } = getInputData();
  const bmi = calcBmi(weight, height);
  const statusClass = bmiStatusClass(bmi);
  const isInputDataValid = validateInputData(weight, height);

  if (isInputDataValid) {
    showResult(bmi, statusClass);
  } else {
    showError();
  }
}

const bmiForm = document.querySelector('.bmi__form');
bmiForm.addEventListener('submit', handleSubmit);

const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');

weightInput.addEventListener('change', closeError);
heightInput.addEventListener('change', closeError);
