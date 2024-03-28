const form = document.getElementById('contact-form');
const Contactname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
let formContent={
    contactName:Contactname.value,
    email:email.value,
    subject:subject.value,
    message:message.value,
}


const setError = (element, errormessage) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = errormessage;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.addEventListener('submit', e => {
    e.preventDefault();
   const response= validateInputs();
    if (response===false){
       return
    }else{
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbylBGGnyc970melE9nAY-g0OPvjCqcMW7D2prpxeu3Xx5kEapvthKQYGGfRIF2rinrdcw/exec",
        data: formContent,
        method: "post",
        success: function (response) {
        //   console.log(response);
          console.log(formContent);
          alert("Form submitted successfully");
        //   window.location.reload();
        },
        error: function (err) {
          alert("Something went wrong");
        },
      });
    }
});

const validateInputs = () => {
    const nameValue = Contactname.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();
  formContent={
    name:nameValue,
    email:emailValue,
    subject:subjectValue,
    message:messageValue,
};
let isValid=true;

    if(nameValue === '') {
        setError(Contactname, 'Username is required');
        isValid= false;
    } 

    if(emailValue === '') {
        setError(email, 'Email is required');
        isValid= false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid= false;
    } 

    if(subjectValue === '') {
        setError(subject, 'Subject is required');
        isValid= false;
    }

    if(messageValue===""){
        setError(message,"Message is required!!")
        isValid= false;
    }else if(messageValue.length > 150){
        setError(message,"Message should be less than 150 words")
        isValid= false;
    }
if(isValid){
    setSuccess(Contactname);
    setSuccess(email);
    setSuccess(subject);
    setSuccess(message);
    return formContent;
}
else{
    return isValid=false;
}


};
