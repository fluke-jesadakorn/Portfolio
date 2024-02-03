"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import { Button, Form, Input } from "antd";
import { saveBlog } from "./CreatePageAction";

const CreatePage = () => {
  const editor = useEditor({
    extensions: [StarterKit, Code],
    content: "",
  });

  return (
    <div style={{ position: "relative", zIndex: 20 }}>
      <Form
        onFinish={(val) => saveBlog({ ...val, content: editor?.getText() })}
      >
        <Form.Item name="title">
          <Input />
        </Form.Item>
        <EditorContent editor={editor} />
        <Button htmlType="submit">Save</Button>
      </Form>
    </div>
  );
};

export default CreatePage;
