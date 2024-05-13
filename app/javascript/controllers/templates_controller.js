import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["textInput", "photoInput", "uploadedPhoto", "frame", "textContainer", "button", "text"]

  connect() {
  }

  handlePhotoChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.uploadedPhotoTarget.src = event.target.result;
      this.uploadedPhotoTarget.style.display = "inline";
    };
    reader.readAsDataURL(file);
    this.photoInputTarget.classList.add("d-none")
  }

  handleTextChange() {
    const text = this.textInputTarget.value;
    this.textInputTarget.classList.add("d-none")
    this.textContainerTarget.insertAdjacentHTML("beforeend", "<p data-action='click->templates#changeText'>" + text + "</p>")
    this.buttonTarget.classList.add("d-none")
  }

  changeText(event) {

    this.textInputTarget.classList.remove("d-none")
    this.textInputTarget.value = event.currentTarget.innerText
    event.currentTarget.remove()
    // save text value into a variable
    console.log(this.textContainerTarget.innerHTML)

    //const text = this.textContainerTarget.innerHTML;
    // clears textarea
   // this.textContainerTarget.innerHTML = '';
    // see added text value
    //this.textContainerTarget.insertAdjacentHTML("beforeend", `<textarea id="text-input" placeholder="Enter text here" data-templates-target="textInput">${text}</textarea>`)
    //this.textInputTarget.appendChild(text);

    this.buttonTarget.classList.remove("d-none")
  }
}
