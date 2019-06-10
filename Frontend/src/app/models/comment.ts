export class Comment {
  constructor(private message: string) {}

  static fromJSON(json: any): Comment {
    const comm = new Comment(json.message);
    return comm;
  }

  toJSON(): any {
    return { message: this.message };
  }

  get aMessage(){
      return this.message;
  }
}
