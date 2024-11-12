import {
  Student,
  Classes,
  Customer,
  Template,
  GroupOption,
  Question,
  QuestionOption,
} from "../../../models/index.js";

async function studentUserLogin({
  templateId,
  customerId,
  account,
  password,
}) {
  const studentInfo = await Student.findOne({
    where: {
      account,
      customerId,
    },
    attributes: {
      exclude: ["classId", "customerId", "password"]
    },
    include: [
      {
        model: Classes,
        as: 'classBelong'
      },
      {
        model: Customer,
        as: 'customerBelong'
      },
    ],
  });
  if (!studentInfo || studentInfo.dataValues.password !== password) {
    return false;
  }
  const template = await Template.findOne({
    where: { id: templateId },
    include: [
      {
        model: GroupOption,
        as: "groupOptions",
        include: [
          {
            model: Question,
            as: "questions",
            include: [
              {
                model: QuestionOption,
                as: "questionOptions",
              },
            ],
          },
        ],
      },
    ],
  });
  studentInfo.dataValues.template = template.dataValues;
  return studentInfo;
}

export default studentUserLogin;
