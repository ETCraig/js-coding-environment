import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const onClick = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor intitalValue="" onChange={(value) => setInput(value)} />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;