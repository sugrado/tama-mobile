export class GetWithOptionsByMessageResponse {
  id: number;
  content: string;
  options: MessageOption[] | null;
}

export class MessageOption {
  id: number;
  content: string;
}
