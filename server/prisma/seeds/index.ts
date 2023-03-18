import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import yaml from "js-yaml";

const prisma = new PrismaClient();
const password = "pwd";
const saltRounds = 10;

const users: any = yaml.load(
  fs.readFileSync(path.join(__dirname, "data", "users.yml"), "utf8")
);

async function createUsers(users: any[]) {
  return users.map(async (user: any) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return await prisma.user.upsert({
      where: {
        name: user.name,
      },
      update: {},
      create: {
        ...user,
        password: hash,
      },
    });
  });
}

(async () => {
  try {
    const usersRecords = await createUsers(users);
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
})();
