const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      unique: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
