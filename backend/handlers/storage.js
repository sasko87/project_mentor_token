const fs = require("fs");
const makeId = require("../pkg/strings");
const path = require("path");

const MAX_FILESIZE = 1048576; // 1024 * 1024 = 1 MB
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/pjpeg",
  "image/gif",
];

const upload = async (req, res) => {
  const { email } = req.body;
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send({ error: "File exceeds max file size!" });
  }

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send({ error: "File type not allowed" });
  }

  let userDir = `user_${email}`;
  let userDirPath = path.join(__dirname, "..", "uploads", userDir);

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath, { recursive: true });
  }

  let fileName = `${makeId(6)}_${req.files.document.name}`;
  let filePath = path.join(userDirPath, fileName);
  let localhost = `http://localhost:10000/uploads/${userDir}/${fileName}`;
  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal server error!");
    }
    return res.status(201).send({ localhost });
  });
};

module.exports = {
  upload,
};
