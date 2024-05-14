import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = ["textInput", "photoInput", "uploadedPhoto", "textContainer", "button", "page", "text", "saveButton"]

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
    this.textContainerTarget.insertAdjacentHTML("beforeend", "<p data-action='click->templates#changeText' data-blank-target='uploadedText'>" + text + "</p>")
    this.buttonTarget.classList.add("d-none")
    }

  changeText(event) {
    this.textInputTarget.classList.remove("d-none")
    this.textInputTarget.value = event.currentTarget.innerText
    event.currentTarget.remove()
    this.buttonTarget.classList.remove("d-none")
  }

  savePin() {
    this.saveButtonTarget.classList.add('d-none');
    const htmlContent = this.pageTarget.outerHTML;
    const pinId = this.element.dataset.pinId;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/save_template', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
      body: JSON.stringify({ pinId: pinId, htmlContent: htmlContent }),
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = `/pins/${pinId}`;
    })
  }

  handleChange() {
    this.saveButtonTarget.classList.remove('d-none');
  }
}
