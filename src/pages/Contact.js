import React, { useState } from "react";
import ContactPng from "../images/contact1.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://crud-mongodb-gzyk.onrender.com/email/email-marketing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Hãy kiểm tra email của bạn để vào nhóm chat nhé");
      // Optionally clear the form or show a success message
      setFormData({ email: "" });
    } catch (error) {
      alert("Lỗi: ", error);
      console.error("Error:", error);
      // Optionally show an error message
    }
  };

  return (
    <div className="w-4/5 mx-auto p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Liên hệ với chúng tôi</h2>
      <div className="w-full flex md:flex-row flex-col-reverse justify-between items-center">
        <form onSubmit={handleSubmit} className="md:w-1/2 w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Gửi
          </button>
        </form>
        <img alt="" className="md:w-5/12 w-full" src={ContactPng} />
      </div>
    </div>
  );
};

export default Contact;
