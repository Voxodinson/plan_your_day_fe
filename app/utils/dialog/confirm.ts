import Swal, { type SweetAlertResult } from "sweetalert2";

const Confirm = (title: string, callback: () => void): void => {
    Swal.fire({
        icon: 'question',
        iconColor: '#f4d03f',
        title: title,
        showCancelButton: true,
        reverseButtons: true,
        width: 'fit-content',
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-cancel-btn',
        }
    })
    .then((result: SweetAlertResult): void => {
        if (result.isConfirmed) {
            callback && callback();
        }
    });
}

export default Confirm;
