import mongoose, { Document, Schema } from "mongoose";
import shortid from "shortid";

export interface IUrl extends Document {
    url: string;
    shortUrl: string;
}

export const urlSchema = new Schema<IUrl>({
    url: {
        type: String,
        required: [true, "no link was provided"]
    },
    shortUrl: {
        type: String,
        unique: true,
        default: shortid.generate,
    }
});

// Verifica si el modelo ya ha sido definido
const Url = mongoose.models.Url || mongoose.model<IUrl>("Url", urlSchema);

export default Url;
