import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeID: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    maritalstatus: { type: String },
    designation: { type: String },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    salary: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Optional: Use pre-save hook to auto-update `updatedAt` timestamp
employeeSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
