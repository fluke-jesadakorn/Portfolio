"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Form, Input } from "antd";
import { saveBlog } from "./action";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
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

export default Tiptap;
