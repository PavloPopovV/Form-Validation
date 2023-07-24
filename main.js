const signupForm = document.forms.signupForm;
const wrapper = document.querySelector(".wrapper");
const userProfileData = {};

const patterns = {
  namePattern: /^[а-яА-ЯҐґЄєІіЇї'-]{2,}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phonePattern: /^0\d{9}$/,
  passwordPattern: /^(?!.*\s).{8,}$/,
};

const messages = {
  errorRequired: "Це поле обов'язкове. Не може бути порожнім",
  errorText: "Від двох символів, лише кирилиця, без пробілів",
  errorPhone: "Починайте з нуля, введіть 10 символів",
  errorEmail: "Не менше 6 символів, знак @ та домен пошти",
  errorPassword: "Не менше 8 символів, без пробілів",

  authErrorEmail: "Таеого email не існує",
  authErrorPassword: "Пароль не збігається з цим email",
  conflictPassword: "Цей пароль збігається з попереднім",
  correct: "Все правильно, заповнюйте далі!",

  msgSignUp: "Ви успішно зареєструвалися!",
  msgLogin: "Вхід здійснено!",
  msgSave: "Дані успішно збережено. Треба здійснити повторний вхід!",

  titleSignUp: "Успішна реєстрація",
  titleLogin: "Форма входу",
  titleLoginSuccess: "Успішний вхід",
  titleProfile: "Профіль користувача",
  titleSaveProfile: "Дані оновлено",
};

function addFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    switch (target.type) {
      case "text":
        checkFieldOnInput(target, patterns.namePattern, messages.errorText);
        break;

      case "tel":
        checkFieldOnInput(target, patterns.phonePattern, messages.errorPhone);
        break;

      case "email":
        checkFieldOnInput(target, patterns.emailPattern, messages.errorEmail);
        break;

      case "password":
        if (target.form.name === "profileForm") {
          checkFieldOnInput(target,patterns.passwordPattern,messages.errorPassword);
          checkNewPassword(target, messages.conflictPassword);
        } else {
          checkFieldOnInput(
            target,
            patterns.passwordPattern,
            messages.errorPassword
          );
        }

        break;

      default:
        break;
    }
  });

  for (const input of formName.elements) {
    if (input.type !== "submit" && input.type !== "checkbox") {
      input.addEventListener("focus", (e) => {
        checkFieldOnFocus(e.target);
      });
      input.addEventListener("blur", (e) => {
        checkFieldOnBlur(e.target);
      });
    }
  }
}

function checkFieldOnInput(input, pattern, message) {
  if (!input.value.match(pattern)) {
    input.closest(".form-group").classList.remove("success");
    input.closest(".form-group").classList.add("error");
    input.closest(".form-group").querySelector(".form-msg").textContent =
      message;
  } else {
    input.closest(".form-group").classList.remove("error");
    input.closest(".form-group").classList.add("success");
    input.closest(".form-group").querySelector(".form-msg").textContent =
      messages.correct;
  }
}

function checkNewPassword(input, message) {
  if (input.value === userProfileData.password) {
    input.closest(".form-group").classList.remove("success");
    input.closest(".form-group").classList.add("error");
    input.closest(".form-group").querySelector(".form-msg").textContent =
      message;
  } 
}

function checkFieldOnFocus(input) {
  if (input.value.length < 1) {
    input.closest(".form-group").classList.add("error");
    input.closest(".form-group").querySelector(".form-msg").textContent =
      messages.errorRequired;
  }
}

function checkFieldOnBlur(input) {
  if (input.closest(".form-group").classList.contains("success")) {
    input.closest(".form-group").querySelector(".form-msg").textContent = "";
  }
}

function validateOnCheck(target) {
  target.closest(".form-group").classList.toggle("success");
}

function checkFormSuccess(targetForm, groupClassName) {
  const allGroups = targetForm.querySelectorAll(groupClassName);
  for (const group of allGroups) {
    if (!group.classList.contains("success")) {
      return false;
    }
  }
  return true;
}

function checkButtonDisabled(btnName) {
  btnName.form.addEventListener("input", () => {
    if (checkFormSuccess(btnName.form, ".form-group")) {
      btnName.removeAttribute("disabled");
    } else {
      btnName.setAttribute("disabled", "disabled");
    }
  });
}

function changePageTitle(text) {
  document.querySelector("title").textContent = text;
}

function addMessageOnPage(text, btnClass, btnName) {
  wrapper.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="msg">
    <div class="msg-text">${text}</div>
    <button class="btn ${btnClass}" type="button">${btnName}</button>
  </div>
  `
  );
}

function addUserData(formName) {
  for (const input of formName.elements) {
    if (input.type !== "checkbox" && input.tagName !== "button") {
      userProfileData[input.name] = input.value;
    }
  }
  console.log(userProfileData);
}

function addLoginForm() {
  wrapper.insertAdjacentHTML(
    "afterbegin",
    `
  <form action="" class="form" name="loginForm">
  <div class="form-group">
    <label class="form-label" for="email">Електронна пошта *</label>
    <input class="form-input" type="email" id="email" name="email" placeholder="Введіть ваш email">
    <div class="form-msg"></div>
  </div>
  <div class="form-group">
    <label class="form-label" for="password">Пароль *</label>
    <div class="input-set input-set-password">
      <input type="password" id="password" name="password" placeholder="Введіть пароль"><button class="show-password" type="button"></button>
    </div>
    <div class="form-msg"></div>
  </div>
  <button class="form-btn js_login-btn" type="submit" name="loginBtn" >Увійти</button>

</form>
  `
  );
}

function checkLoginData(input, textMsg) {
  if (!(input.value === userProfileData[input.name])) {
    input.closest(".form-group").classList.add("error");
    input.closest(".form-group").querySelector(".form-msg").textContent =
      textMsg;
  } else {
    input.closest(".form-group").classList.remove("error");
    input.closest(".form-group").querySelector(".form-msg").textContent = "";
    return true;
  }
}

function addProfileForm(data) {
  wrapper.insertAdjacentHTML(
    "afterbegin",
    `
  <form action="" class="form" name="profileForm">
  <div class="form-group success">
    <label class="form-label" for="firstName">Ваше ім'я *</label>
    <input class="form-input" type="text" id="firstName" name="firstName" placeholder="Введіть ваше ім'я" value = ${data.firstName} required>
    <div class="form-msg"></div>
  </div>
  <div class="form-group success">
    <label class="form-label" for="lastName">Ваше прізвище *</label>
    <input class="form-input" type="text" id="lastName" name="lastName" placeholder="Введіть ваше прізвище" value = ${data.lastName} >
    <div class="form-msg"></div>
  </div>
  <div class="form-group success">
    <label class="form-label phone-label" for="phoneNumber">Номер телефону *</label>
    <div class="input-set input-set-phone">
      <div class="phone-item">+38</div><input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Введіть ваш номер" value = ${data.phoneNumber} >
    </div>
    <div class="form-msg"></div>
  </div>
  <div class="form-group success">
    <label class="form-label" for="email">Електронна пошта *</label>
    <input class="form-input" type="email" id="email" name="email" placeholder="Введіть ваш email" value = ${data.email} readonly>
    <div class="form-msg"></div>
  </div>
  <div class="form-group">
    <label class="form-label" for="password">Новий пароль *</label>
    <div class="input-set input-set-password">
      <input type="password" id="password" name="password" placeholder="Введіть новий пароль"><button class="show-password" type="button"></button>
    </div>
    <div class="form-msg"></div>
  </div>
  <button class="form-btn js_save-btn" type="submit" name="saveBtn">Зберегти зміни</button>
</form>
  `
  );
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("form-checkbox")) {
    validateOnCheck(target);
  }
  if (target.classList.contains("js_signup")) {
    e.preventDefault();
    addUserData(signupForm);
    signupForm.remove();
    changePageTitle(messages.titleSignUp);
    addMessageOnPage(messages.msgSignUp, "js_getLoginForm", "Увійти");
  }
  if (target.classList.contains("js_getLoginForm")) {
    addLoginForm();
    document.querySelector(".msg").remove();
    addFocusAndBlurEvents(document.forms.loginForm);
    changePageTitle(messages.titleLogin);
  }
  if (target.classList.contains("js_login-btn")) {
    e.preventDefault();
    const loginForm = document.forms.loginForm;
    checkLoginData(loginForm.email, messages.authErrorEmail);
    checkLoginData(loginForm.password, messages.authErrorPassword);
    if (
      checkLoginData(loginForm.email, messages.authErrorEmail) &&
      checkLoginData(loginForm.password, messages.authErrorPassword)
    ) {
      addMessageOnPage(
        messages.msgLogin,
        "js_getProfileForm",
        "Показати профіль"
      );
      changePageTitle(messages.titleLoginSuccess);
      loginForm.remove();
    }
  }
  if (target.classList.contains("js_getProfileForm")) {
    addProfileForm(userProfileData);
    document.querySelector(".msg").remove();
    addFocusAndBlurEvents(document.forms.profileForm);
    changePageTitle(messages.titleProfile);
    addFormValidation(document.forms.profileForm);
  }
  if (target.classList.contains("js_save-btn")) {
    e.preventDefault();
    if (checkFormSuccess(document.forms.profileForm, ".form-group")) {
      addUserData(document.forms.profileForm)
      addMessageOnPage(messages.msgSave, "js_getLoginForm", "Увійти");
      document.forms.profileForm.remove();
      changePageTitle(messages.titleSaveProfile);
    }
  }
});

addFormValidation(signupForm);

checkButtonDisabled(signupForm.signupBtn);