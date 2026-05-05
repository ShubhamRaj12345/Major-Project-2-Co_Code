const express = require("express");
const { exec, spawn } = require("child_process"); 
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");

app.post("/run", (req, res) => {

    const { code, language, input } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code or language missing" });
    }

    let fileName, command;

    if (language === "javascript") {
        fileName = "temp.js";
        fs.writeFileSync(fileName, code);

        const run = spawn("node", [fileName]);

        let output = "";
        const safeInput = (input || "").trim() + "\n";

        run.stdin.write(safeInput);
        run.stdin.end();

        run.stdout.on("data", (data) => output += data.toString());
        run.stderr.on("data", (data) => output += data.toString());

        run.on("close", () => {
            return res.json({ success: true, output });
        });

        return;
    }

    else if (language === "python") {
        fileName = "temp.py";
        fs.writeFileSync(fileName, code);

        const run = spawn("python", [fileName]);

        let output = "";
        const safeInput = (input || "").trim() + "\n";

        run.stdin.write(safeInput);
        run.stdin.end();

        run.stdout.on("data", (data) => output += data.toString());
        run.stderr.on("data", (data) => output += data.toString());

        run.on("close", () => {
            return res.json({ success: true, output });
        });

        return;
    }

    else if (language === "cpp") {
        fileName = "temp.cpp";
        const outFile = "a.exe";
        fs.writeFileSync(fileName, code);

        exec(`g++ ${fileName} -o ${outFile}`, (err) => {
            if (err) {
                return res.json({ success: false, error: err.message });
            }

            const run = spawn(outFile);

            let output = "";
            const safeInput = (input || "").trim() + "\n";

            run.stdin.write(safeInput);
            run.stdin.end();

            run.stdout.on("data", (data) => output += data.toString());
            run.stderr.on("data", (data) => output += data.toString());

            run.on("close", () => {
                return res.json({ success: true, output });
            });
        });

        return;
    }


    else if (language === "java") {

        fileName = path.join(__dirname, "Main.java");
        fs.writeFileSync(fileName, code);

        exec(`javac "${fileName}"`, (err) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            const run = spawn("java", ["-cp", __dirname, "Main"]);

            let output = "";

            const safeInput = (input || "").trim() + "\n";
            run.stdin.write(safeInput);
            run.stdin.end();

            run.stdout.on("data", (data) => {
                output += data.toString();
            });

            run.stderr.on("data", (data) => {
                output += data.toString();
            });

            run.on("close", () => {
                return res.json({
                    success: true,
                    output
                });
            });
        });

        return;
    }

    else {
        return res.status(400).json({ error: "Language not supported" });
    }
});

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Executor running on ${PORT}`);
});