import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"

// Connects to data-controller="alert"
export default class extends Controller {
  static values = {
  }

  initSweetalert(event) {
    console.log("SweetAlert triggered");
    event.preventDefault();

    Swal.fire({
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: `<i class="fa fa-thumbs-up"></i>`,
      confirmButtonColor: "#FFD952",
      showCancelButton: true,
      cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
      customClass: {
        popup: 'custom-swal-popup',
        header: 'custom-swal-header',
        title: 'custom-swal-title',
        icon: 'custom-swal-icon',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button'
      }
    }).then((action) => {
      if (action.isConfirmed) {
        const link = event.target.closest('a');
        if (link) {
          window.location.href = link.href;
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
      event.preventDefault();
    })
  }
}
