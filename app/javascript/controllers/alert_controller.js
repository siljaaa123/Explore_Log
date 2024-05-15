import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"

// Connects to data-controller="alert"
export default class extends Controller {
  static values = {
  }

  initSweetalert(event) {
    event.preventDefault();

    Swal.fire({
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: `<i class="fa fa-thumbs-up"></i>`,
      confirmButtonColor: "#FFD952",
      showCancelButton: true,
      cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
    }).then((action) => {
      if (action.isConfirmed) {
        event.target[event.type]();
      }
    })
    .catch(event.preventDefault())
  }
}
