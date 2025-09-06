import React, { useEffect, useState } from "react";
import { getHello, getHelloHealth } from "../services/api";

const HelloService = () => {
  const [msg, setMsg] = useState("");
  const [health, setHealth] = useState("");

  useEffect(() => {
    getHello().then(res => setMsg(res.data.msg));
    getHelloHealth().then(res => setHealth(res.data.status));
  }, []);

  return (
    <div>
      <h2>Hello Service</h2>
      <p>Message: {msg}</p>
      <p>Health: {health}</p>
    </div>
  );
};

export default HelloService;
