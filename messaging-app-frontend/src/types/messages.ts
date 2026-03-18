interface MessageInterface {
  createdAt: Date;
  id: number;
  message: string;
  roomId: number;
  senderId: number;
}

export type { MessageInterface };
