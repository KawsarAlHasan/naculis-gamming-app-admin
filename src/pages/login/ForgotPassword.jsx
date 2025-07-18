import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { API } from "../../api/api";

const ForgotPassword = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for login button

  const onFinish = async (values) => {
    setLoading(true); // Start loading when submitting form
    try {
      // const response = await API.post("/admin/login", {
      //   email: values.email,
      // });

      // // If successful, save the token in localStorage
      // localStorage.setItem("token", response.data.data.token);

      // Show success message
      message.success("Send code on your email successful!");

      navigate("/check-code");
    } catch (error) {
      // Show error message
      message.error(
        "Send code on your email failed. Please try again." // error.response?.data?.message
      );
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please input valid email.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 py-28 shadow-lg rounded-lg w-[530px] h-[535px]">
        <div>
          <h2 className="text-[30px] text-[#222222] font-bold text-center mb-6">
            Forget Password?
          </h2>
          <h6 className=" lg:mx-14 text-center text-[#4E4E4E] mb-6 text-[18px]">
            Please enter your email to continue
          </h6>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Email Field */}
            <div className="mb-4">
              <label className="text-[18px] text-[#222222] block mb-1">
                Email address:
              </label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  type="email"
                  className="p-3"
                  placeholder="Enter your email..."
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-6 text-[18px] font-semibold my-main-button"
                  loading={loading}
                >
                  {loading ? "Sending..." : "Send a Code"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
