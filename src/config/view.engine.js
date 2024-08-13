//config view engine
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express from "express";
//c1 
//config đưa tên file name đang đứng -> url
const __filename = fileURLToPath(import.meta.url)
console.log(__filename);
// get name_url chứa file đó
const __dirname = dirname(__filename);
console.log(__dirname);

const configViewEngine = (app) => {
    app.set("views", path.join("./src", "views"))
    app.set("view engine", "ejs");
    app.use(express.static(path.join("./src", "public")))
}

export default configViewEngine;