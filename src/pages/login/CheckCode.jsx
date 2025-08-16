import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";

const CheckCode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [form] = Form.useForm();

  const email = localStorage.getItem("email");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await API.post("/api/verify-otp/", {
        email: email,
        otp: values.otp,
      });

      if (response.status === 200) {
        message.success("OTP verified successfully!");
        localStorage.removeItem("email");
        navigate("/set-new-password");
      }
    } catch (error) {
      console.error(error, "error");
      message.error(
        error?.response?.data?.error || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const response = await API.post("/api/send-otp/", {
        email: email,
      });

      if (response.status === 200) {
        message.success("New OTP sent to your email!");
      }
    } catch (error) {
      message.error("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg   w-[530px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600">
            We sent a reset link to{" "}
            <span className="font-semibold">{email}</span>. Enter the 6-digit
            code from the email.
          </p>
        </div>

        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input the OTP!",
              },
              {
                pattern: /^[0-9]{6}$/,
                message: "Please enter a valid 5-digit code",
              },
            ]}
            className="mb-6 text-center"
          >
            <Input.OTP
              length={6}
              formatter={(str) => str.toUpperCase()}
              inputType="number"
              inputStyle={{
                width: 50,
                height: 50,
                fontSize: 18,
                margin: "0 4px",
                textAlign: "center",
              }}
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="h-12 font-semibold text-lg my-main-button"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Didn't receive the email?{" "}
              <Button
                type="link"
                loading={resendLoading}
                onClick={handleResend}
                className="p-0 font-medium"
              >
                Resend
              </Button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CheckCode;
