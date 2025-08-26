import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { API } from "../api/api";

function EditProfile({ adminData, refetch }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        first_name: adminData.first_name || "",
        last_name: adminData.last_name || "",
        role: adminData.role || "",
      });
    }
  }, [adminData, form]);

  const onFinish = async (values) => {
    setLoading(true); // Start loading when submitting form
    try {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        // profile_picture: adminData.profile_picture,
      };

      const response = await API.put(
        "/api/admin_dashboard/admin-profile/",
        payload
      );

      // Show success message
      message.success("Admin Profile updated successfully!");

      console.log(response, "response");
      refetch();
    } catch (error) {
      // Show error message
      message.error("Admin Profile update failed. Please try again.");

      console.log(error, "error");
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please input valid information.");
  };

  return (
    <div className="text-white text-left mt-4 mx-[-70px] ">
      {/* <h2 className="text-[24px] text-center">Edit Your Profile</h2> */}

      <Form
        form={form}
        name="basic"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* First name Field */}
        <div className="mb-4">
          <label className="text-[18px] text-white block mb-1">
            First Name:
          </label>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input
              className="p-3 text-[16px]"
              placeholder="Enter your First Name..."
            />
          </Form.Item>
        </div>

        {/* Last Name Field */}
        <div className="mb-4">
          <label className="text-[18px] text-white block mb-1">
            Last Name:
          </label>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input
              className="p-3 text-[16px]"
              placeholder="Enter your Last Name..."
            />
          </Form.Item>
        </div>

        {/* Your Role Field */}
        <div className="mb-4">
          <label className="text-[18px] text-white block mb-1">
            Your Role:
          </label>
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your Your Role!",
              },
            ]}
          >
            <Input
              disabled
              className="p-3 text-[16px] !text-white"
              placeholder="Enter your Your Role..."
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
              {loading ? "Saving..." : "Save Change"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
