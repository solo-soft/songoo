import {toast} from "react-toastify";

export default function notification(id, render, type) {
    return toast.update(id,
        {
            render,
            type,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            isLoading: false
        });
}