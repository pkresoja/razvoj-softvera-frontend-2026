import Swal from "sweetalert2";

export const bootstrapClasses = {
    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'
}

export class Alerts {
    static showError(message: string) {
        Swal.fire({
            title: "Došlo je do greške :(",
            confirmButtonText: 'Uredu',
            text: message,
            icon: "error",
            customClass: bootstrapClasses
        })
    }

    static showConfirm(message: string, callback: Function) {
        Swal.fire({
            title: message,
            showCancelButton: true,
            confirmButtonText: 'Da, želim',
            cancelButtonText: 'Ne, odustani',
            icon: "question",
            customClass: bootstrapClasses
        }).then(result => {
            if (result.isConfirmed) {
                callback()
                Swal.fire({
                    title: "Uspešno izvršeno",
                    confirmButtonText: 'Uredu',
                    icon: "success",
                    customClass: bootstrapClasses
                })
            }
        })
    }
}