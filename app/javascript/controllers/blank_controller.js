import { Controller } from "@hotwired/stimulus"
import interact from 'interactjs'

export default class extends Controller {

  static targets = ["sidebar", "text", "photo", "canvas", "uploadedText", "richTextEditor"]
  history = [];

  connect() {
    this.setCanvasBackgroundColor();
    this.initializeGesturable();
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
    textInput.setAttribute("data-templates-target", "textInput");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Enter text here");
    textInput.classList.add("resizable-text");

    const textContainer = document.createElement("div");
    textContainer.setAttribute("data-templates-target", "textContainer");
    textContainer.classList.add("draggable");
    textContainer.classList.add("resizable");
    textContainer.classList.add("scale-element");
    textContainer.classList.add("textContainer");
    textContainer.appendChild(textInput);
    const scaleElement = textContainer

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.setAttribute("data-templates-target", "button");
    addButton.setAttribute("data-action", "click->templates#handleTextChange");

    this.canvasTarget.appendChild(textContainer);
    textContainer.appendChild(addButton);

    this.addToHistory({
      undo: () => {
        textInput.remove();
        textContainer.remove();
        addButton.remove();
      }
    });

    this.initializeInteract(textContainer);
    this.initializeGesturable();

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

    this.addToHistory({
      undo: () => {
        photoInput.remove();
      }
    });

    this.initializeInteract(uploadedPhoto);
    this.initializeGesturable();
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
            console.log(widthDifference)
            const fontSize = parseInt(getComputedStyle(element.querySelector("p")).getPropertyValue('font-size'), 10) + widthDifference;
            element.querySelector("p").style.fontSize = fontSize + 'px';
          },

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
          end (event) {
            angleScale.angle = angleScale.angle + event.angle
            angleScale.scale = angleScale.scale * event.scale
          },
        }
      });
  }
}
