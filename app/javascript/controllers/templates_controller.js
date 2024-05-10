import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["textInput", "photoInput", "uploadedPhoto", "frame", "textContainer", "button"]

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
    this.textContainerTarget.textContent = text;
    this.buttonTarget.classList.add("d-none")
  }

  savePin() {
    const htmlContent = document.documentElement.outerHTML
    fetch('/save_template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pinId: pinId,
        htmlContent: htmlContent,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
}
