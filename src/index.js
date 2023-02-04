import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.userInput = document.querySelector("#user-input");
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.userInput.addEventListener("blur", (e) => this.handleInputChange(e));
    this.userInput.addEventListener("focus", (e) => this.handleInputChange(e));
    this.userInput.addEventListener("keypress", (e) =>
      this.handleInputChange(e)
    );
  }

  isEmailValid(value) {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    return value.length && value.match(pattern);
  }

  handleInputChange(e) {
    const inputValue = e.target.value;

    if (!this.isEmailValid(inputValue)) {
      if (e.type === "blur" && inputValue.length) {
        this.errorAtrVisible(true);
      }
      if (e.type === "focus") {
        this.errorAtrVisible(false);
      }
      if (e.type === "keypress" && e.key === "Enter") {
        this.errorAtrVisible(true);
      }

      if (e.type === "keypress" && e.key !== "Enter") {
        this.errorAtrVisible(false);
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputValue = form["user-email"].value;

    if (!this.isEmailValid(inputValue)) {
      return;
    }
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
