document.addEventListener('DOMContentLoaded', () => {

    const signInFormInput = document.querySelectorAll('.form-input'),
        signInForm = document.querySelector('.signin-form'),
        passwordInput = document.getElementById('password');

    //validation by input types
    const emailValidation = email => {
        const re =  /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
        return re.test(email);
    };

    const passwordValidation = password => {
        let inputValue = passwordInput.value;
        if (inputValue === '' || inputValue.length < 8) {
            passwordInput.classList.add('error');
            return false
        }
        return password;
    };

    //general validation function
    const validation = event => {
        const target = event.target;
        let formInputWrap = target.parentNode;

        if (target.classList.contains('email-input')) {
            if(emailValidation(target.value)) {
                target.classList.remove('error');
                removeMessage(formInputWrap);
                return true;
            } else {
                target.classList.add('error');
                message(formInputWrap, 'email');
                return false
            }
        }

        if (target.classList.contains('password-input')) {
            if (passwordValidation(target.value)) {
                removeMessage(formInputWrap);
                return true;
            } else {
                message(formInputWrap, 'password');
                return false;
            }
        }
    };

    const isBluredInput = event => {
         const target = event.target;

        validation(event)
            ? target.classList.add('active')
            : target.classList.remove('active');
 };

    //remove error if input is focused
    const isFocusedInput = event => {
        const target = event.target;
        target.classList.remove('error');
    };

    //create error message
    const message = (inputItem, message) => {
        if (!inputItem.querySelector('.tiptool')){
            const tiptool = document.createElement('div');
            tiptool.className = 'tiptool';
            tiptool.innerHTML = `
                <p>Oop! You entered an invalid ${message}</p>
                <i></i>`;

            inputItem.append(tiptool)
        }
    };

    // remove message if input validation true
    const removeMessage = inputItem => {
        inputItem.querySelector('.tiptool')
            ? inputItem.removeChild(inputItem.lastChild)
            : null
    };


    signInFormInput.forEach(element => {
        element.addEventListener('focus', isFocusedInput);
        element.addEventListener('blur', isBluredInput)
    });

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validation(e);
    });
});