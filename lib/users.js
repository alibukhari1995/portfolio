import bcrypt from 'bcryptjs';


const users = [];


export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}


export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}


export function findUserByEmail(email) {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}


export function findUserById(id) {
  return users.find(user => user.id === id);
}


export async function createUser(email, password, name) {
  const passwordHash = await hashPassword(password);
  const newUser = {
    id: String(users.length + 1),
    email,
    passwordHash,
    name,
    role: 'admin',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}


async function initDefaultUser() {
  if (users.length === 0) {
    const passwordHash = await hashPassword('Pakistan@666');
    users.push({
      id: '1',
      email: 'portfolioadmin@gmail.com',
      passwordHash,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    console.log('Default admin user created');
  }
}


await initDefaultUser();