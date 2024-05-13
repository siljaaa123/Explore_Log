import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["textInput", "photoInput", "uploadedPhoto", "frame", "textContainer", "button", "page"]

  connect() {
    console.log()
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
      console.log(data);
      //window.location.href = `/pins/${pinId}`;
    })
  
  }
}
