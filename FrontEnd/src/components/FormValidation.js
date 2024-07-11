import React, { useState } from "react";
import "../index.css";
import axios from "axios";

function FormValidation() {
  const [clickedItems, setClickedItems] = useState([]);
  const items = ["Studio", "Compliance", "Risk", "ESG", "Certa AI"];
  const handleClick = (item) => {
    setClickedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });

    setFormData((prev) => ({
      ...prev,
      interestProduct: clickedItems.includes(item)
        ? prev.interestProduct.filter((i) => i !== item)
        : [...prev.interestProduct, item],
    }));
  };

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    message: "",
    hear: "",
    interestProduct: [],
    newsProduct: false,
  });

const initialstate ={
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    message: "",
    hear: "",
    interestProduct: [],
    newsProduct: false,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please complete this required field.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please complete this required field.";
    } 

     if (formData.phoneNumber &&!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "A valid phone number may only contain numbers, +()-. or x";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please complete this required field.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.hear) {
      newErrors.hear = "Select how you heard about us";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form data:", formData);
      try {
        const request = await axios.post("http://localhost:8000/api/storedata", formData)
        console.log("Response:", request.data);
        setFormData(initialstate);
      } catch (error) {
        if (error.response && error.response.status === 400) { setErrors(error.response.data.errors); }
      }
    } else {
      console.log(errors);
    }
  };

  return (
    <div className="bg-blue-100 w-full">
    <div className="bg-white mx-auto  rounded-3xl  max-w-7xl">
    <div className="container mx-auto bg-white max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div >
          <h2 className="leading-15" style={{fontFamily:"Kostic roc grotesk wide, sans-serif;", fontSize:"3.5rem",lineHeight: "3.75rem "}}>
            Ready to do good business?
          </h2>
          <div class="font-inter font-semibold text-xl leading-9">Let's meet!</div>
          {/* <h4 className="font-mono text-lg text-center mb-4"></h4> */}
          <div className="border-2 mt-4 rounded-2xl border-blue-900 p-4">
            <label className="block  text-blue-900 text-sm font-bold"> Full Name*</label>
             
              <input
                className={`mt-1 mb-3 bg-transparent text-blue-900 text-sm block w-full focus:outline-none  border-none `}
                type="text"
                name="fullName"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-blue-900 font-bold text-sm mt-1">{errors.fullName}</p>
              )}
            
          </div>
          <div className="border-2 mt-4 rounded-2xl border-blue-900 p-4">
            <label className="block text-blue-900 text-sm font-bold">
              Company*</label>
              <input
                className={`mt-1 mb-3 text-blue-900 text-sm  focus:outline-none  bg-transparent block w-full border-none`}
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && (
                <p className="text-blue-900 font-bold text-sm mt-1">{errors.company}</p>
              )}
            
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 mt-4 rounded-2xl border-blue-900 p-4">
              <label className="block text-blue-900 text-sm font-bold">
                Email</label>
                <input
                  className={`mt-1  mb-3 text-blue-900 text-sm  focus:outline-none  bg-transparent block w-full border-none`}
                  type="text"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-blue-900 font-bold text-sm mt-1">{errors.email}</p>
                )}
             
            </div>
            <div className="border-2 mt-4 rounded-2xl border-blue-900 p-4">
              <label className="block  text-blue-900 text-sm font-bold">
                Phone Number</label>
                <input
                  className={`mt-1 mb-3 text-blue-900 text-sm  focus:outline-none  bg-transparent block w-full border-none`}
                  type="text"
                  name="phoneNumber"
                  placeholder="Your Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="text-blue-900 font-bold text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
            
            </div>
          </div>
          <div className="border-2 mt-4 rounded-2xl border-blue-900 p-4">
            <label className="block text-blue-900 text-sm font-bold">
              Message</label>
              <textarea
                className="mt-1 mb-6 text-blue-900 text-sm bg-transparent block w-full border-none"
                name="message"
                placeholder="Hi, I'm interested in learning more about Certa's TPRM solution"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
          </div>
          <div className="mt-4">
            <label className="block text-blue-900 text-sm font-bold">
              How Did You Hear about us?</label>
              <select
                className={`mt-1 text-blue-900 text-sm bg-transparent block w-60 h-10 shadow-sm border-2 rounded-2xl border-blue-900`}
                name="hear"
                value={formData.hear}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="Social Media">Social Media</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Naukri">Naukri</option>
              </select>
          </div>
          <div className="mt-4">
            <label className="block text-blue-900 text-sm font-bold">
              Which Product are you interested in?
              <div className="flex flex-wrap gap-2 mt-2">
                {items.map((item) => (
                  <div
                    key={item}
                    className={`border-2 rounded-2xl p-2 ${clickedItems.includes(item)
                      ? "bg-blue-900 text-white hover:bg-blue-700"
                      : "hover:bg-blue-900 hover:text-white"
                      }`}
                    onClick={() => handleClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </label>
          </div>
          <div className="mt-4 mx-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newsProduct"
                className="form-checkbox"
                checked={formData.newsProduct}
                onChange={handleChange}
              />
              <span className="ml-2 block text-gray-700 text-sm font-bold">
                I want to receive occasional news and product announcements from
                Certa.
              </span>
            </label>
          </div>
          <div className="mt-4 mx-2 ">
            <input
              type="submit"
              name="submit"
              className="bg-blue-500 rounded-3xl h-16 w-80 text-center text-white font-bold py-2 px-4  "
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default FormValidation;
