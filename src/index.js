import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.userInput = document.querySelector("#user-input");
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.userInput.addEventListener("blur", (e) => this.handleBlur(e));
    this.userInput.addEventListener("focus", (e) => this.handleFocus(e));
    this.userInput.addEventListener("keydown", (e) => this.handleKeypress(e));
  }

  isEmailValid(value) {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    return value.length && value.match(pattern);
  }

  handleBlur(e) {
    const inputValue = e.target.value;
    if (inputValue.length) {
      this.errorAtrVisible(true);
    }
  }

  handleFocus() {
    this.errorAtrVisible(false);
  }

  handleKeypress(e) {
    const inputValue = e.target.value;

    e.key === "Enter" && !this.isEmailValid(inputValue)
      ? this.errorAtrVisible(true)
      : this.errorAtrVisible(false);
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputValue = form["user-email"].value;

    if (!this.isEmailValid(inputValue)) {
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify({
        email: inputValue,
      }),
    })
      .then((data) => {
        console.log(data);
        this.form.reset();
      })
      .catch((e) => console.log(e));
  }

  errorAtrVisible(value) {
    if (value) {
      this.form.className += " error";
    } else {
      this.form.classList.remove("error");
    }
  }

  init() {
    this.addEventListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
