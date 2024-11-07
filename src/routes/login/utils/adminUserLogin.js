import { AdminUser } from "../../../models/index.js";

async function adminUserLogin({ account, password }) {
  const adminUser = await AdminUser.findOne({
    where: {
      account,
    },
  });
  if (!adminUser || adminUser.dataValues.password !== password) {
    return false;
  }
  return adminUser;
}

export default adminUserLogin;
