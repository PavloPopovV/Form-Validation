const firstForm = document.forms.signupForm;
const $showBtn = document.querySelector(".show-password");

function addFocusAndBlurEvents(form) {
  form.password.addEventListener("focus", (e) => {
    e.target.closest(".input-set").classList.add("focused");
  });

  form.password.addEventListener("blur", (e) => {
    e.target.closest(".input-set").classList.remove("focused");
  });

  if (form.phoneNumber) {
    form.phoneNumber.addEventListener("focus", (e) => {
      e.target.closest(".input-set").classList.add("focused");
    });
    form.phoneNumber.addEventListener("blur", (e) => {
      e.target.closest(".input-set").classList.remove("focused");
    });
  }

  if (form.agree) {
    form.agree.addEventListener("focus", (e) => {
      e.target.closest(".checkbox-set").classList.add("focused");
    });

    form.agree.addEventListener("blur", (e) => {
      e.target.closest(".checkbox-set").classList.remove("focused");
    });
  }
}

addFocusAndBlurEvents(firstForm);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-password")) {
    if (!e.target.classList.contains("active")) {
      e.target.previousSibling.type = "text";
    } else {
      e.target.previousSibling.type = "password";
    }
    e.target.classList.toggle("active");
  }
});
