let dataList = loadDataFromLocalStorage();

let sortColumnFlag = '',
    sortDirectionFlag = false;

const  $addForm = document.getElementById('add-form'),
        $nameInput = document.getElementById('name-input'),
        $surNameInput = document.getElementById('surName-input'),
        $lastNameInput = document.getElementById('lastName-input'),
        $ageInput = document.getElementById('age-input'),
        $hobbyInput = document.getElementById('hobby-input');

const $sortFioBtn = document.getElementById('sortBtn-fio'),
      $sortAgeBtn = document.getElementById('sortBtn-age');

const $filterForm = document.getElementById('filter-form'),
      $filterFioInput = document.getElementById('filterFio-input'),
      $filterHobbyInput = document.getElementById('filterHobby-input');

const $app = document.getElementById('app'),
      $table = document.createElement('table'),
      $tableHead = document.createElement('thead'),
      $tableBody = document.createElement('tbody'),

      $tableHeadTr = document.createElement('tr'),
      $tableHeadThFIO = document.createElement('th'),
      $tableHeadThAge = document.createElement('th'),
      $tableHeadThBirthYear = document.createElement('th'),
      $tableHeadThHobby = document.createElement('th'),
      $tableHeadThAction = document.createElement('th');

$table.classList.add('table', 'table-dark', 'table-hover');

$tableHeadThFIO.textContent = 'ФИО';
$tableHeadThAge.textContent = 'Возраст';
$tableHeadThBirthYear.textContent = 'Год рождения';
$tableHeadThHobby.textContent = 'Хобби';
$tableHeadThAction.textContent = 'Действия';

$tableHeadTr.append($tableHeadThFIO);
$tableHeadTr.append($tableHeadThAge);
$tableHeadTr.append($tableHeadThBirthYear);
$tableHeadTr.append($tableHeadThHobby);
$tableHeadTr.append($tableHeadThAction);

$tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);
$app.append($table);

render(dataList);

$addForm.addEventListener('submit', e => {
    e.preventDefault();

    validationForm();

    if (document.querySelectorAll('span.error').length === 0) {
        dataList.push({
            name: $nameInput.value.trim(),
            surname: $surNameInput.value.trim(),
            lastName: $lastNameInput.value.trim(),
            age: +$ageInput.value.trim(),
            hobby: $hobbyInput.value.trim()
        });

        clearInputs();
        $nameInput.focus();
        render(dataList);
        updateDataAndLocalStorage(dataList);
    }
});

$sortFioBtn.addEventListener('click', () => {
    sortColumnFlag = 'fio';
    sortDirectionFlag = !sortDirectionFlag;
    render(dataList);
    updateDataAndLocalStorage(dataList);
});

$sortAgeBtn.addEventListener('click', () => {
    sortColumnFlag = 'age';
    sortDirectionFlag = !sortDirectionFlag;
    render(dataList);
});

$filterForm.addEventListener('submit', e => {
    e.preventDefault();
    updateDataAndLocalStorage(dataList);
});

$filterFioInput.addEventListener('input', () => {
    render(dataList);
});

$filterHobbyInput.addEventListener('input', () => {
    render(dataList);
});

function validationForm() {
    const errorMessage = document.querySelectorAll('span.error');
    errorMessage.forEach(error => error.remove());
    const invalidInput = document.querySelectorAll('input.form-control');
    invalidInput.forEach(error => error.classList.remove('is-invalid'));

    const inputRegex = /^[а-яА-Яa-zA-ZґҐєЄіІїЇ]+$/u;

    if ($nameInput.value.trim() === '') {
        addError($nameInput, 'Введите Имя', 'is-invalid');
        return;
    } else if ($nameInput.value.length > 20) {
        addError($nameInput, 'Имя не должно привышать 20 символов', 'is-invalid');
        return;
    } else if (!inputRegex.test($nameInput.value.trim())) {
        addError($nameInput, 'Имя не должно включать цифр и символов', 'is-invalid');
        return;
    }

    if ($surNameInput.value.trim() === '') {
        addError($surNameInput, 'Введите Отчество', 'is-invalid');
        return;
    } else if ($surNameInput.value.length > 20) {
        addError($surNameInput, 'Отчество не должно привышать 20 символов', 'is-invalid');
        return;
    } else if (!inputRegex.test($surNameInput.value.trim())) {
        addError($surNameInput, 'Отчество не должно включать цифр и символов', 'is-invalid');
        return;
    }

    if ($lastNameInput.value.trim() === '') {
        addError($lastNameInput, 'Введите Фамилию', 'is-invalid');
        return;
    } else if ($lastNameInput.value.length > 20) {
        addError($lastNameInput, 'Фамилия не должна привышать 20 символов', 'is-invalid');
        return;
    } else if (!inputRegex.test($lastNameInput.value.trim())) {
        addError($lastNameInput, 'Фамилия не должна включать цифр и символов', 'is-invalid');
        return;
    }

    if (+$ageInput.value.trim() === 0) {
        addError($ageInput, 'Введите возраст', 'is-invalid');
        return;
    } else if(+$ageInput.value.trim() > 100) {
        addError($ageInput, 'Врядли вам больше 100 😉', 'is-invalid');
        return;
    }
}

function addError(input, textError, valid) {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    input.classList.add(valid);
    errorSpan.textContent = textError;
    input.parentNode.appendChild(errorSpan);
}

function clearInputs() {
    $nameInput.value = '';
    $surNameInput.value = '';
    $lastNameInput.value = '';
    $ageInput.value = '';
    $hobbyInput.value = '';
}

function renderUserTr(user) {
    const $userTr = document.createElement('tr'),
    $userFIO = document.createElement('td'),
    $userAge = document.createElement('td'),
    $userBirthYear = document.createElement('td'),
    $userHobby = document.createElement('td'),
    $userAction = document.createElement('td'),
    $deleteButton = document.createElement('button');
    $deleteButton.classList.add('BtnColor');
    
    $userFIO.textContent = user.fio;
    $userAge.textContent = user.age;
    $userBirthYear.textContent = user.birthYear;
    $userHobby.textContent = user.hobby;
    $deleteButton.textContent = 'Удалить';
    $deleteButton.addEventListener('click', () => {
        deleteItem(user);
    });

    $userAction.append($deleteButton);

    $userTr.append($userFIO);
    $userTr.append($userAge);
    $userTr.append($userBirthYear);
    $userTr.append($userHobby);
    $userTr.append($userAction);

    return $userTr;
}

function render(userData) {
    $tableBody.innerHTML = '';
    
    let copyDataList = [...userData];

    for (const user of copyDataList) {
        user.fio = user.name + ' ' + user.surname + ' ' + user.lastName;
        user.birthYear = 2024 - user.age;
    }

    copyDataList = copyDataList.sort((a, b) => {
        let sort = a[sortColumnFlag] < b[sortColumnFlag];
        if (sortDirectionFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag];

        if (sort) return -1;
    });

    if ($filterFioInput.value.trim() !== '') {
        copyDataList = filter(copyDataList, 'fio', $filterFioInput.value);
    }

    if ($filterHobbyInput.value.trim() !== '') {
        copyDataList = filter(copyDataList, 'hobby', $filterHobbyInput.value);
    }

    for (const user of copyDataList) {
        const newTr = renderUserTr(user);

        $tableBody.append(newTr);
    }
}

function filter(arr, props, value) {
    return arr.filter(user => {
        if (user[props].includes(value.trim())) return true;
    });
}

function deleteItem(user) {
    const index = dataList.findIndex(item => item === user);

    if (index !== -1) {
        dataList.splice(index, 1);
        render(dataList);
        updateDataAndLocalStorage(dataList);
    }
}

function saveDataToLocalStorage(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
}

function updateDataAndLocalStorage(data) {
    dataList = data;
    saveDataToLocalStorage(data);
}