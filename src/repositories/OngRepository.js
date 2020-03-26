import mongoose from "mongoose";

const OngSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "ong-repository-error-enter-name"],
        },
        email: {
            type: String,
            required: [true, "ong-repository-error-enter-email"],
            index: true,
        },
        whatsapp: {
            type: String,
            required: [true, "ong-repository-error-enter-whatsapp"],
        },
        city: {
            type: String,
            required: [true, "ong-repository-error-enter-city"],
        },
        estate: {
            type: String,
            required: [true, "ong-repository-error-enter-estate"],
            maxlength: 2,
        },
    },
    { versionKey: false }
);

export default mongoose.model("Ong", OngSchema);
