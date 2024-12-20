import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        empId: "",
        email: "",
        phone: "",
        department: "",
        dateOfJoining: "",
        role: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { firstName, lastName, empId, email, phone, department, dateOfJoining, role } = formData;
        const newErrors = {};

        if (!firstName) newErrors.firstName = "First name is required.";
        if (!lastName) newErrors.lastName = "Last name is required.";
        if (!empId || !/^[a-zA-Z0-9]{1,10}$/.test(empId)) newErrors.empId = "Employee ID must be alphanumeric and up to 10 characters.";
        if (!email) newErrors.email = "Email is required.";
        if (!phone || !/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits.";
        if (!department) newErrors.department = "Department is required.";
        if (!dateOfJoining) newErrors.dateOfJoining = "Date of joining is required.";
        if (!role) newErrors.role = "Role is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await fetch('http://172.16.5.200:8080/add-values', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const data = await res.json();
                alert(data.message); // Show success message
                setFormData({ // Reset fields
                    firstName: "",
                    lastName: "",
                    empId: "",
                    email: "",
                    phone: "",
                    department: "",
                    dateOfJoining: "",
                    role: "",
                });
            } else {
                const errorData = await res.json();
                alert(errorData.message); // Show error message
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("Failed to submit the form. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            empId: "",
            email: "",
            phone: "",
            department: "",
            dateOfJoining: "",
            role: "",
        });
        setErrors({});
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="w-50 p-5 m-3 rounded shadow-lg">
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="FirstName"
                            placeholder="Enter your first name"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-3">
                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="LastName"
                            placeholder="Enter your last name"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>

                    {/* Employee ID Field */}
                    <div className="mb-3">
                        <label htmlFor="empId" className="form-label">Employee ID</label>
                        <input
                            type="text"
                            id="empId"
                            name="empId"
                            placeholder="Enter Employee ID"
                            className="form-control"
                            pattern="[a-zA-Z0-9]{1,10}"
                            maxLength={10}
                            value={formData.empId}
                            onChange={handleChange}
                        />
                        {errors.empId && <div className="text-danger">{errors.empId}</div>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            pattern="[0-9]{10}"
                            placeholder="Enter Your Phone Number"
                            maxLength={10}
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>

                    {/* Department Dropdown */}
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select
                            id="department"
                            name="department"
                            className="form-select"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Department</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        {errors.department && <div className="text-danger">{errors.department}</div>}
                    </div>

                    {/* Date of Joining */}
                    <div className="mb-3">
                        <label htmlFor="dateOfJoining" className="form-label">Date Of Joining</label>
                        <input
                            type="date"
                            id="dateOfJoining"
                            max={new Date().toISOString().split('T')[0]}
                            placeholder="Enter your joining date"
                            name="dateOfJoining"
                            className="form-control"
                            value={formData.dateOfJoining}
                            onChange={handleChange}
                        />
                        {errors.dateOfJoining && <div className="text-danger">{errors.dateOfJoining}</div>}
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="Role" className="form-label">Role</label>
                        <input
                            type="text"
                            id="role"
                            placeholder="Enter your role"
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                        />
                        {errors.role && <div className="text-danger">{errors.role}</div>}
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
