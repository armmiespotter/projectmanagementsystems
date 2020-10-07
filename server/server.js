const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 3000;
const GroupProject = require("./routes/GroupProject");
const Deadline = require("./routes/Deadline");
const Document = require("./routes/Document");
const Form = require("./routes/Form");
const FormComment = require("./routes/FormComment");
const FormStatus = require("./routes/FormStatus");
const FormType = require("./routes/FormType");
const GroupAdvisor = require("./routes/GroupAdvisor");
const GroupCommittee = require("./routes/GroupCommittee");
const GroupCommitteeRole = require("./routes/GroupCommitteeRole");
const GroupProgress = require("./routes/GroupProgress");
const GroupProjectStatus = require("./routes/GroupProjectStatus");
const GroupProjectType = require("./routes/GroupProjectType");
const Meeting = require("./routes/Meeting");
const MeetingNote = require("./routes/MeetingNote");
const MeetingType = require("./routes/MeetingType");
const NotificationStudent = require("./routes/NotificationStudent");
const NotificationTeacher = require("./routes/NotificationTeacher");
const RequestStatus = require("./routes/RequestStatus");
const Section = require("./routes/Section");
const UserAdmin = require("./routes/UserAdmin");
const UserStudent = require("./routes/UserStudent");
const UsetTeacher = require("./routes/UserTeacher");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/GroupProject/", GroupProject);
app.use("/Deadline/", Deadline);
app.use("/Document/", Document);
app.use("/Form/", Form);
app.use("/FormComment/", FormComment);
app.use("/FormStatus/", FormStatus);
app.use("/FormType/", FormType);
app.use("/GroupAdvisor/", GroupAdvisor);
app.use("/GroupCommittee/", GroupCommittee);
app.use("/GroupCommitteeRole/", GroupCommitteeRole);
app.use("/GroupProgress/", GroupProgress);
app.use("/GroupProjectStatus/", GroupProjectStatus);
app.use("/GroupProjectType/", GroupProjectType);
app.use("/Meeting/", Meeting);
app.use("/MeetingNote/", MeetingNote);
app.use("/MeetingType/", MeetingType);
app.use("/NotificationStudent/", NotificationStudent);
app.use("/NotificationTeacher/", NotificationTeacher);
app.use("/RequestStatus/", RequestStatus);
app.use("/Section/", Section);
app.use("/UserAdmin/", UserAdmin);
app.use("/UserStudent/", UserStudent);
app.use("/UserTeacher/", UsetTeacher);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} | http://localhost:${PORT}`);
});
