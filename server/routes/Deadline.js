var router = require("express").Router();
var database = require("../database");
var { responseByStatus } = require("../utilities/functions");

// GET ALL
router.get("/", (req, res) => {
  database.query(
    "SELECT * FROM deadline AS D " +
      "LEFT JOIN section AS S ON D.Deadline_SectionID=S.Section_ID " +
      "LEFT JOIN form_type AS FT ON D.Deadline_FormTypeID=FT.FormType_ID ",
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else responseByStatus(res, err, 200, rows);
    }
  );
});

// GET BY CONDITION
router.post("/", (req, res) => {
  var reqBodyStr = req.body;
  var whereStr = "";
  Object.entries(reqBodyStr).forEach(([key, value], index) => {
    whereStr += `${key} = '${value}'`;
    if (Object.entries(reqBodyStr).length != index + 1) whereStr += ` AND `;
  });
  database.query(
    "SELECT * FROM deadline AS D " +
      "LEFT JOIN section AS S ON D.Deadline_SectionID=S.Section_ID " +
      "LEFT JOIN form_type AS FT ON D.Deadline_FormTypeID=FT.FormType_ID " +
      `WHERE ${whereStr}`,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else {
        if (rows.length == 0) responseByStatus(res, err, 404, rows);
        else responseByStatus(res, err, 200, rows);
      }
    }
  );
});

// GET BY ID
router.get("/:id", (req, res) => {
  var reqParamStr = req.params;
  database.query(
    "SELECT * FROM deadline AS D " +
      "LEFT JOIN section AS S ON D.Deadline_SectionID=S.Section_ID " +
      "LEFT JOIN form_type AS FT ON D.Deadline_FormTypeID=FT.FormType_ID " +
      "WHERE Deadline_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else {
        if (rows.length == 0) responseByStatus(res, err, 404, rows);
        else responseByStatus(res, err, 200, rows);
      }
    }
  );
});

// CREATE
router.post("/create", (req, res) => {
  var reqBodyStr = req.body;
  database.query("INSERT INTO deadline SET ?", reqBodyStr, (err, rows) => {
    if (err) responseByStatus(res, err, 400, rows);
    else responseByStatus(res, err, 200, rows);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  var reqParamStr = req.params;
  var reqBodyStr = req.body;
  database.query(
    "SELECT * FROM deadline WHERE Deadline_ID = ?",
    reqParamStr.id,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "UPDATE deadline SET ? WHERE Deadline_ID = ?",
          [reqBodyStr, reqParamStr.id],
          (err, rows) => {
            if (err) responseByStatus(res, err, 400, rows);
            else responseByStatus(res, err, 200, rows);
          }
        );
      }
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  var reqParamStr = req.params;
  database.query(
    "SELECT * FROM deadline WHERE Deadline_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "DELETE FROM deadline WHERE Deadline_ID = ?",
          reqParamStr.id,
          (err, rows) => {
            if (err) responseByStatus(res, err, 400, rows);
            else responseByStatus(res, err, 200, rows);
          }
        );
      }
    }
  );
});

module.exports = router;
