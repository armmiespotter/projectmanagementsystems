const router = require("express").Router();
const db = require("../../../models")

// read
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.sectionid) {
            whereStr.push({
                Deadline_SectionID: req.query.sectionid
            })
        }
        if (req.query.formtypeid) {
            whereStr.push({
                Deadline_FormTypeID: req.query.formtypeid
            })
        }
        const data = await db.deadline.findAll({
            where: whereStr
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await db.deadline.findAll({
            where: [{
                Deadline_ID: req.params.id
            }]
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

// create
router.post("/", async (req, res) => {
    await db.deadline.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating!"
            });
        });
})

// update
router.put("/:id", async (req, res) => {
    await db.deadline.update(req.body, {
            where: {
                Deadline_ID: req.params.id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully!"
                });
            } else {
                res.send({
                    message: `Cann't update, Maybe not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating!"
            });
        });
})

// delete
router.delete("/:id", async (req, res) => {
    await db.deadline.destroy({
            where: [{
                Deadline_ID: req.params.id
            }]
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Can't delete, Maybe not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting!"
            });
        });

});
module.exports = router;