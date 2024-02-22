"use client";
import Image from "next/image";

export default function Home() {

const sendEmail = async () => {
  const rest = await fetch("/api/send", {
    method: "POST",
  })
  const data = await rest.json()
  console.log(data);
}


  return (
    <>
    <h1>
      Hola
    </h1>

    <button onClick={sendEmail}>
      Send Email
    </button>
    </>
  );
}