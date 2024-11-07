import { Student, Classes, Customer } from "../../../models/index.js";

async function studentUserLogin({
  templateId,
  customerId,
  gradeValue,
  classValue,
  account,
  password,
}) {
  const studentInfo = await Student.findOne({
    where: {
      account, // 指定 Student 的 account 条件
    },
    include: [
      {
        model: Classes,
        where: {
          grade: gradeValue, // 指定 Classes 的 grade 条件
          class: classValue, // 指定 Classes 的 class 条件
        },
        attributes: [],
        include: [
          {
            model: Customer,
            where: {
              id: customerId, // 指定 Customer 的 id 条件
            },
            attributes: [],
          },
        ],
      },
    ],
  });
  if (!studentInfo || studentInfo.dataValues.password !== password) {
    return false;
  }
  return studentInfo;
}

export default studentUserLogin;
