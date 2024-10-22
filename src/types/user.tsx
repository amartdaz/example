export default interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  lastLogin: Date;
}

export const initialUser: User = {
  id: -1,
  username: "",
  password: "",
  name: "",
  surname: "",
  lastLogin: new Date(),
};
