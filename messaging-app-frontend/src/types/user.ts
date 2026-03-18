interface User {
  bio?: string;
  createdAt: Date;
  email: string;
  id: number;
  password: string;
  status?: string;
  updatedAt: Date;
  username: string;
  avatar: true;
}

type Props = {
  user: User;
};

export type { User, Props };
