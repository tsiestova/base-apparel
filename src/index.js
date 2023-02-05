import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.userInput = document.querySelector("#user-input");
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.userInput.addEventListener("focus", (e) => this.handleFocus(e));
    this.userInput.addEventListener("input", (e) => this.handleInput(e));
    this.userInput.addEventListener("blur", (e) => this.handleBlur(e));
  }

  isEmailValid(value) {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    return value.length && value.match(pattern);
  }

  handleBlur(e) {
    console.log("blur");
    const inputValue = e.target.value;

    if (!this.isEmailValid(inputValue)) {
      this.errorAtrVisible(true);
    }
  }

  handleFocus() {
    this.errorAtrVisible(false);
  }

  handleInput() {
    this.errorAtrVisible(false);
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputValue = form["user-email"].value;

    if (!this.isEmailValid(inputValue)) {
      this.errorAtrVisible(true);
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
