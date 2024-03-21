import React, { ChangeEvent, useState } from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import defaultAva from "./defaultAva.jpg";
import axios from "axios";

export const InputTypeFile = () => {
  const [ava, setAva] = useState(defaultAva);
  const [isAvaBroken, setIsAvaBroken] = useState(false);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const formData = new FormData();
      formData.append("myFile", e.target.files[0]);

      axios.post("https://neko-back.herokuapp.com/file", formData).then((res) => {
        console.log("response: ", res.data);
      });

      // Code image-file to base64
      // const reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.onloadend = () => {
      //   setAva(reader.result as string);
      // };
    }
  };

  //get avatar from server
  // const getAvatar = () => {
  //   axios.get("https://neko-back.herokuapp.com/file", { responseType: "blob" }).then((res) => {
  //     const blob = new Blob([res.data], { type: "image/jpeg" });
  //     console.log(blob);
  //
  //     // создать ссылку на файл
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     setAva(downloadUrl);
  //   });
  // };

  // get avatar from server and save it on PC
  const getAvatar = () => {
    axios.get("https://neko-back.herokuapp.com/file", { responseType: "blob" }).then((res) => {
      const blob = new Blob([res.data], { type: "image/jpeg" });

      // создать ссылку на файл
      const downloadUrl = window.URL.createObjectURL(blob);

      // создать тег "ссылка" на наш файл
      const link = document.createElement("a");
      link.href = downloadUrl;

      // добавить атрибуты нашему тегу: загрузочный, имя файла
      link.setAttribute("download", "newFile.jpg");

      // добавить тег в документ
      document.body.appendChild(link);

      // нажать на ссылку
      link.click();

      // удалить тег из документа
      link.remove();
    });
  };

  const errorHandler = () => {
    setIsAvaBroken(true);
    alert("Broken image");
  };

  return (
    <div>
      <img src={isAvaBroken ? defaultAva : ava} style={{ width: "100px" }} alt="ava" onError={errorHandler} />
      <label>
        <input accept={"image/*"} multiple={true} type="file" onChange={uploadHandler} style={{ display: "none" }} />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
      <button onClick={getAvatar}>getAvatar</button>
    </div>
  );
};
