import { Controller } from "@hotwired/stimulus"
import interact from 'interactjs'

export default class extends Controller {

  static targets = ["sidebar", "text", "photo", "canvas", "uploadedText", "textInput", "photoInput", "uploadedPhoto", "textContainer", "icon", "page", "text", "saveButton"]
  history = [];

  connect() {
    this.setCanvasBackgroundColor()
    this.userText = ""
  }

  undoLastAction() {
    if (this.history.length > 0) {
      const lastAction = this.history.pop();
      lastAction.undo();
    }
  }

  toggleSideBar() {
    this.sidebarTarget.classList.toggle('d-none');
  }

  onChangeColor(event) {
    const color = event.target.value;
    this.canvasTarget.style.backgroundColor = color;
  }
  setCanvasBackgroundColor() {
    const color = this.colorPickerTarget.value;
    this.canvasTarget.style.backgroundColor = color;
  }

  addTextInput() {
    const textInput = document.createElement("input")
    textInput.setAttribute("data-blank-target", "textInput");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Enter text here");
    textInput.setAttribute("data-action", "blur->blank#handleTextChange");

    const textContainer = document.createElement("div");
    textContainer.setAttribute("data-blank-target", "textContainer");
    textContainer.classList.add("draggable");
    textContainer.classList.add("resizable");
    textContainer.classList.add("textContainer");
    textContainer.appendChild(textInput);

    this.canvasTarget.appendChild(textContainer);

    this.addToHistory({
      undo: () => {
        textInput.remove();
        textContainer.remove();
      }
    });

    this.initializeInteract(textContainer);
  }

  addPhotoInput() {
    const photoInput = document.createElement("input");
    photoInput.setAttribute("type", "file");
    photoInput.setAttribute("accept", "image/*");
    photoInput.setAttribute("data-action", "change->blank#handlePhotoChange");
    photoInput.setAttribute("data-blank-target", "photoInput");
    photoInput.setAttribute("style", "opacity: 0");
    photoInput.setAttribute("name", "photo-input");
    photoInput.classList.add("photo-button")

    const photoLabel = document.createElement("label")
    photoLabel.setAttribute("for", "photo-input")
    photoLabel.setAttribute("data-blank-target", "icon")
    // photoLabel.setAttribute("data-action", "change->blank#handlePhotoChange");
    photoLabel.innerHTML = '<i class="fa-solid fa-camera"></i>'

    const uploadedPhoto = document.createElement("img");
    uploadedPhoto.setAttribute("id", "uploaded-photo");
    uploadedPhoto.setAttribute("src", "#");
    uploadedPhoto.setAttribute("alt", "Uploaded Photo");
    uploadedPhoto.classList.add("draggable");
    uploadedPhoto.classList.add("resizable");
    uploadedPhoto.style.display = "none";
    uploadedPhoto.dataset.blankTarget = "uploadedPhoto";

    this.canvasTarget.appendChild(photoInput);
    this.canvasTarget.appendChild(uploadedPhoto);
    this.canvasTarget.appendChild(photoLabel)


    this.addToHistory({
      undo: () => {
        photoInput.remove();
        uploadedPhoto.remove();
        photoLabel.remove();
      }
    });

    this.initializeInteract(uploadedPhoto);
  }

  addToHistory(action) {
    this.history.push(action);
  }

  initializeInteract(element) {
    let position = { x: 0, y: 0 }
    const controller = this;
    interact(element)
      .draggable({
        listeners: {
          start (event) {
          },
          move (event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
              `translate(${position.x}px, ${position.y}px)`
          },
        }
      })
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            })
            Object.assign(event.target.dataset, { x, y })

            const initialWidth = event.deltaRect.right - event.deltaRect.left
            const adjWidth = event.rect.width
            const widthDifference = (adjWidth - 100)
            const fontSize = parseInt(getComputedStyle(element.querySelector("p")).getPropertyValue('font-size'), 10) + widthDifference;
            element.querySelector("p").style.fontSize = fontSize + 'px';
          },

        }
      })
  }

  handlePhotoChange(event) {
    const file = event.target.files[0]
    const uploadedPhoto = event.target.nextElementSibling
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedPhoto.src = event.target.result;
      uploadedPhoto.style.display = "inline";
    };
    reader.readAsDataURL(file);
    this.photoInputTarget.classList.add("d-none")
  }

  handleTextChange() {
    this.userText = this.textInputTarget.value;
    const textContainer = this.textInputTarget.parentNode
    this.textInputTarget.remove()
    textContainer.insertAdjacentHTML("beforeend", "<p data-action='click->blank#changeText' data-blank-target='uploadedText'>" + this.userText + "</p>")
  }

  // changeText(event) {
  //   this.textInputTarget.classList.remove("d-none")
  //   this.textInputTarget.value = event.currentTarget.innerText
  //   event.currentTarget.remove()
  // }

  savePin() {
    if (this.iconTarget.present) {
      this.iconTarget.classList.add('d-none')
    }
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
