import { IUser } from "@interfaces/user.interface";

const previousIds: Set<number> = new Set();

export function getRandomUser(users: IUser[]): IUser | undefined {
  const ids = users.map(user => user.id);
  let currentId: number = -1;

  while (currentId === -1) {
    const random = Math.random();
    const randomIndex = Math.floor(random * ids.length);
    const randomId = ids[randomIndex];

    if (!randomId) {
      ids.push(...users.map(user => user.id));
      previousIds.clear();
    } else {
      if (previousIds.has(randomId)) ids.splice(randomIndex, 1);
      else {
        previousIds.add(randomId);
        currentId = randomId;
      }
    }
  }

  return users.find(user => user.id === currentId);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}