import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  htmlCode: {
    type: String,
    default:
      '<h1>Hello, World!</h1>\n<p>This is a sample HTML code.</p>\n',
  },
  cssCode: {
    type: String,
    default: "body {\n    background-color: #f0f0f0;\n}\n",
  },
  jsCode: {
    type: String,
    default: 'console.log("Hello, World!");\n',
  },
});

export default mongoose.model("Project", projectSchema);
