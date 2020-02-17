class Visit {
    constructor(doctor, visitDate, name, purpose) {
        this.doctor = doctor;
        this.visitDate = visitDate;
        this.name = name;
        this.purpose = purpose;
    }

    showCard () {
        let registerNote = document.createElement('div');
        let registerNoteCloseButton = document.createElement('button');
        let titleContainer = document.createElement('div');
        let nameTitle = document.createElement('p');
        let doctorTitle = document.createElement('p');
        let showMoreButton = document.createElement('a');
        let hideInfoButton = document.createElement('a');

        registerNote.className = 'register-note';
        registerNoteCloseButton.className = 'close-button';
        titleContainer.className = 'title-container';
        nameTitle.className = 'name-title';
        doctorTitle.className = 'doctor-title';
        showMoreButton.className = 'show-more-button';

        registerNoteCloseButton.innerHTML = '<i class="fas fa-window-close close-icon"></i>';
        nameTitle.innerText = this.name;
        doctorTitle.innerText = this.doctor;
        showMoreButton.innerText = 'Show more';

        registerNote.appendChild(registerNoteCloseButton);
        titleContainer.appendChild(nameTitle);
        titleContainer.appendChild(doctorTitle);
        registerNote.appendChild(titleContainer);
        registerNote.appendChild(showMoreButton);
        registerDesk.appendChild(registerNote);

        checkDeskItems();

        registerNoteCloseButton.addEventListener('click', function (event) {
            let foundIndex = findCardIndex(event);
            dataArray.splice(foundIndex, 1);

            registerDesk.removeChild(registerNote);
            checkDeskItems();

            localStorage.setItem("registerData", JSON.stringify(dataArray));
        });

        showMoreButton.addEventListener('click',  () => {
            let fields;

            switch (this.doctor) {
                case 'Cardiologist':
                    fields = Cardiologist.FIELDS;
                    break;
                case 'Dentist':
                    fields = Dentist.FIELDS;
                    break;
                case 'Therapist':
                    fields = Therapist.FIELDS;
                    break;
            }

            fields.forEach(value => {
                    let newElement = document.createElement('p');
                    newElement.className = 'extra-info-text';
                    newElement.innerHTML = `${value.caption}: ${this[value.name]}`;

                    registerNote.insertBefore(newElement, showMoreButton);
            });

            showMoreButton.style.display = 'none';

            hideInfoButton.className = 'hide-info-button';
            hideInfoButton.innerText = 'Hide Information';

            registerNote.appendChild(hideInfoButton);

            hideInfoButton.addEventListener('click', function () {
                let extraInfo = registerNote.querySelectorAll('.extra-info-text');
                extraInfo.forEach(function (element) {
                    element.remove()
                });

                hideInfoButton.remove();
                showMoreButton.style.display = 'block';
            })
        });

        /*-------------------------------------DRAG'n'DROP-------------------------------------*/

        let shiftX = 0;
        let shiftY = 0;
        let currentCursorPositionX;
        let currentCursorPositionY;
        let elementPositionX = registerNote.offsetLeft;
        let elementPositionY = registerNote.offsetTop;

        registerNote.addEventListener('mousedown', function (e) {
            let target = e.target;

            if (target.classList.contains('close-button')  ||
                target.classList.contains('close-icon') ||
                target.classList.contains('show-more-button') ||
                target.classList.contains('hide-info-button')) {

                return false;
            }

                let coordinateX = e.pageX;
                let coordinateY = e.pageY;

                registerNote.style.zIndex = '2';

                document.onmousemove = function (e) {
                    currentCursorPositionX = e.pageX - coordinateX + shiftX;
                    currentCursorPositionY = e.pageY - coordinateY + shiftY;

                    let elementOffsetPositionX = currentCursorPositionX + elementPositionX;
                    let elementOffsetPositionY = currentCursorPositionY + elementPositionY;

                    if (elementOffsetPositionX > 0 && elementOffsetPositionX < 900 && elementOffsetPositionY > 0 && elementOffsetPositionY < 610) {
                        registerNote.style.left = px(currentCursorPositionX);
                        registerNote.style.top = px(currentCursorPositionY);
                    }
                };

                document.onmouseup = function () {
                    let allNotes = document.querySelectorAll('.register-note');

                    shiftX = parseInt(registerNote.style.left);
                    shiftY = parseInt(registerNote.style.top);

                    document.onmousemove = null;

                    allNotes.forEach(item => item.style.zIndex = '0');
                    registerNote.style.zIndex = 'iMac1.jpg';
                }
        });
        function px(c) {
            return c + 'px'
        }
    };
}

class Cardiologist extends Visit {
    constructor(doctor, visitDate, name, purpose, age, pressure, massIndex, heartIssues) {
        super(doctor, visitDate, name, purpose);
        this.age = age;
        this.pressure = pressure;
        this.massIndex = massIndex;
        this.heartIssues = heartIssues;
    }

    static FIELDS = [
        {name: 'visitDate', caption: 'Date of visit'},
        {name: 'purpose', caption: 'Purpose of visit'},
        {name: 'age', caption: 'Age'},
        {name: 'pressure', caption: 'Pressure'},
        {name: 'massIndex', caption: 'Mass index'},
        {name: 'heartIssues', caption: 'Heart issues'}
    ]
}

class Dentist extends Visit {
    constructor(doctor, visitDate, name, purpose, lastVisitDate) {
        super(doctor, visitDate, name, purpose);
        this.lastVisitDate = lastVisitDate;
    }

    static FIELDS = [
        {name: 'visitDate', caption: 'Date of visit'},
        {name: 'purpose', caption: 'Purpose of visit'},
        {name: 'lastVisitDate', caption: 'Date of last visit'}
    ]
}

class Therapist extends Visit {
    constructor(doctor, visitDate, name, purpose, age) {
        super(doctor, visitDate, name, purpose);
        this.age = age;
    }

    static FIELDS = [
        {name: 'visitDate', caption: 'Date of visit'},
        {name: 'purpose', caption: 'Purpose of visit'},
        {name: 'age', caption: 'Age'}
    ]
}

let createButton = document.querySelector('.create-button');
let bodyWrapper = document.querySelector('.wrapper');
let registerDesk = document.querySelector('.register-desk');

let dataArray = [];
let selectedDoctor;

/*-----------------------------LOCAL STORAGE--------------------------------------------*/
if (localStorage.getItem('registerData')) {
    dataArray = JSON.parse(localStorage.getItem("registerData"));
    dataArray.forEach(function (item) {
    let newVisit;
        switch (item.doctor) {
            case 'Cardiologist':
                newVisit = new Cardiologist(item.doctor, item.visitDate, item.name, item.purpose, item.age, item.pressure, item.massIndex, item.heartIssues);
                break;
            case 'Dentist':
                newVisit = new Dentist(item.doctor, item.visitDate, item.name, item.purpose, item.lastVisitDate);
                break;
            case 'Therapist':
                newVisit = new Therapist(item.doctor, item.visitDate, item.name, item.purpose, item.age);
                break;
        }
        newVisit.showCard();
    })
}
/*-----------------------------CREATE MODAL WINDOW--------------------------------------------*/

createButton.addEventListener('click', function () {
    createModalWindow();

});

/*-----------------------------SUPPLEMENT FUNCTIONS--------------------------------------------*/

function chooseCardiologist() {
    let cardiologistForm = document.querySelector('.user-form');

    cardiologistForm.innerHTML = `
            <input id = "visitDate" type="date" data-date-format="DD-MM-YYYY" required placeholder="Visit date">
            <input id = "purpose" type="text" required placeholder="Visit purpose">
            <input id = "name" type="text" required placeholder="Name">
            <input id = "age" type="number" required placeholder="Age">
            <input id = "pressure" type="number" required placeholder="Usual pressure">
            <input id = "massIndex" type="number" required placeholder="Mass index">
            <input id = "heartIssues" type="text" required placeholder="Heart issues">`;
}

function chooseDentist() {
    let dentistForm = document.querySelector('.user-form');

    dentistForm.innerHTML = `
            <input id = "visitDate" type="date" data-date-format="DD-MM-YYYY" required placeholder="Visit date">
            <input id = "purpose" type="text" required placeholder="Visit purpose">
            <input id = "name" type="text" required placeholder="Name">
            <input id = "lastVisitDate" type="date" data-date-format="DD-MM-YYYY" required placeholder="Date of last visit">`;
}

function chooseTherapist() {
    let therapistForm = document.querySelector('.user-form');

    therapistForm.innerHTML = `
            <input id = "visitDate" type="date" data-date-format="DD-MM-YYYY" required placeholder="Visit date">
            <input id = "purpose" type="text" required placeholder="Visit purpose">
            <input id = "name" type="text" required placeholder="Name">
            <input id = "age" type="number" required placeholder="Age">`;
}

function createModalWindow() {
    let modalWindow = document.createElement('div');
    let modalBackground = document.createElement('div');
    let registerForm = document.createElement('form');
    let modalWindowCloseButton = document.createElement('button');
    let registerButton = document.createElement('input');

    registerButton.setAttribute("type", "submit");
    registerButton.setAttribute("value", "Submit");

    modalWindow.className = 'modal-window';
    modalBackground.className = 'modal-background';
    modalWindowCloseButton.className = 'close-button';
    registerForm.className = 'register-form';
    registerButton.className = 'register-button';

    modalWindowCloseButton.innerHTML = '<i class="fas fa-window-close close-icon"></i>';
    registerForm.innerHTML = `
            <select class="doctor-options">
                <option value="choose a doctor">Choose a doctor</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dentist">Dentist</option>
                <option value="therapist">Therapist</option>
            </select>
            <div class="user-form"></div>
            <textarea maxlength="400" placeholder = "Comments" class="comments-input"></textarea>`;

    modalWindow.appendChild(modalWindowCloseButton);
    modalWindow.appendChild(registerForm);
    registerForm.appendChild(registerButton);
    modalBackground.appendChild(modalWindow);
    bodyWrapper.appendChild(modalBackground);

    modalBackground.addEventListener('click', function (e) {
        if (e.target === modalBackground) modalBackground.remove()
    });

    let doctorOptions = document.querySelector('.doctor-options');

    doctorOptions.addEventListener('change', selectDoctor);

    modalWindowCloseButton.addEventListener('click', function () {
        bodyWrapper.removeChild(modalBackground)
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let newCard;

        let visitDate = document.getElementById('visitDate').value;
        let name = document.getElementById('name').value;
        let purpose = document.getElementById('purpose').value;
        let age = document.getElementById('age');

        if (age !== null) {
            age = age.value;
        }

        switch(selectedDoctor) {
            case 'Cardiologist':
                let pressure = document.getElementById('pressure').value;
                let massIndex = document.getElementById('massIndex').value;
                let heartIssues = document.getElementById('heartIssues').value;

                newCard = new Cardiologist(selectedDoctor, visitDate, name, purpose, age, pressure, massIndex, heartIssues);
                break;

            case 'Dentist':
                let lastVisitDate = document.getElementById('lastVisitDate').value;
                newCard = new Dentist (selectedDoctor, visitDate, name, purpose, lastVisitDate);
                break;

            case 'Therapist':
                newCard = new Therapist (selectedDoctor, visitDate, name, purpose, age);
                break;

            default:
                return console.log('please choose a doctor')
        }

        newCard.showCard();
        dataArray.push(newCard);
        bodyWrapper.removeChild(modalBackground);

        localStorage.setItem("registerData", JSON.stringify(dataArray));
    });
}

function selectDoctor() {
    let userForm = document.querySelector('.user-form');
    let doctorOptions = document.querySelector('.doctor-options');
    selectedDoctor = doctorOptions[doctorOptions.selectedIndex].text;

    switch(selectedDoctor) {
        case 'Cardiologist':
            chooseCardiologist();
            break;
        case 'Dentist':
            chooseDentist();
            break;
        case 'Therapist':
            chooseTherapist();
            break;
        default:
            userForm.innerHTML = '';
    }
};

function checkDeskItems() {
    let noItemsMessage = document.querySelector('.register-text');

    if (registerDesk.childElementCount !== 0) {
        noItemsMessage.hidden = true;
    } else {
        noItemsMessage.hidden = false;
    }
}

function findCardIndex(event) {
    let cardsArray = Array.from(registerDesk.children);

    let foundCardItem = cardsArray.find(function(item){
        return item === event.target.parentNode
    });

    return cardsArray.indexOf(foundCardItem);
};






