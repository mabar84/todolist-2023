import React, { ChangeEvent, useState } from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import defaultAva from "./defaultAva.jpg";

export const InputTypeFile = () => {
  const [ava, setAva] = useState(defaultAva);
  const [isAvaBroken, setIsAvaBroken] = useState(false);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAva(reader.result as string);
      };
    }
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
    </div>
  );
};
