import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "incident-repository-error-enter-title"],
        },
        description: {
            type: String,
            required: [true, "incident-repository-error-enter-description"],
        },
        value: {
            type: String,
            required: [true, "incident-repository-error-enter-value"],
        },
        ongEmail: {
            type: String,
            required: [true, "incident-repository-error-enter-ong-email"],
            index: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model("Incident", IncidentSchema);
