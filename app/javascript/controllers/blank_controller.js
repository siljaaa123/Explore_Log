import { Controller } from "@hotwired/stimulus"
import interact from 'interactjs'

export default class extends Controller {

  static targets = ["sidebar", "text", "photo", "canvas", "uploadedText"]

  connect() {
    this.setCanvasBackgroundColor();
    this.initializeGesturable();
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
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Enter text here");
    textInput.setAttribute("data-templates-target", "textInput");
    textInput.classList.add("draggable");
    textInput.classList.add("resizable");
    textInput.classList.add("scale-element");
    const scaleElement = textInput

    const textContainer = document.createElement("div");
    textContainer.setAttribute("data-templates-target", "textContainer");
    textContainer.appendChild(textInput);

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.setAttribute("data-templates-target", "button");
    addButton.setAttribute("data-action", "click->templates#handleTextChange");

    this.canvasTarget.appendChild(textContainer);
    this.canvasTarget.appendChild(addButton);

    this.initializeInteract(textInput);
  }
  addPhotoInput() {
    const photoInput = document.createElement("input");
    photoInput.setAttribute("type", "file");
    photoInput.setAttribute("accept", "image/*");
    photoInput.setAttribute("data-action", "change->templates#handlePhotoChange");
    photoInput.setAttribute("data-templates-target", "photoInput");

    const uploadedPhoto = document.createElement("img");
    uploadedPhoto.setAttribute("id", "uploaded-photo");
    uploadedPhoto.setAttribute("src", "#");
    uploadedPhoto.setAttribute("alt", "Uploaded Photo");
    uploadedPhoto.classList.add("draggable");
    uploadedPhoto.classList.add("resizable");
    uploadedPhoto.classList.add("scale-element");
    uploadedPhoto.style.display = "none";
    uploadedPhoto.dataset.templatesTarget = "uploadedPhoto";
    const scaleElement = uploadedPhoto

    this.canvasTarget.appendChild(photoInput);
    this.canvasTarget.appendChild(uploadedPhoto);

    this.initializeInteract(uploadedPhoto);
  }
  initializeInteract(element) {
    let position = { x: 0, y: 0 }
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
          }
        }
      })
  }

  initializeGesturable() {
    let angleScale = { angle: 0, scale: 1 };
    interact('#gesture-area')
      .gesturable({
        listeners: {
          start (event) {
            angleScale.angle -= event.angle;
          },
          move (event) {
            let currentAngle = event.angle + angleScale.angle;
            let currentScale = event.scale * angleScale.scale;
            scaleElement.style.transform =
              'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')';
          },
        }
      });
  }
}
