import toast from "react-hot-toast";

export const success = (message: string) => {
    toast.success(message, {
        style: {
            background: "#2D2D2F",
            color: "#fff",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "12px",
        },
    });
};

export const error = (message: string) => {
    toast.error(message, {
        style: {
            background: "#2D2D2F",
            color: "#fff",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "12px",
        },
    });
};

export const message = (message: string) => {
    toast(message, {
        style: {
            background: "#2D2D2F",
            color: "#fff",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "12px",
        },
    });
};
