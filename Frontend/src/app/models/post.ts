import { Comment } from "./comment";

export class Post {
  private id: number;

  constructor(
    private title: string,
    private description: string,
    private imgUrl: string,
    private creator: string,
    private created = new Date(),
    private comments = new Array<Comment>()
  ) {}

  static fromJSON(json: any): Post {
    const rec = new Post(
      json.title,
      json.description,
      json.imgUrl,
       json.creator,
      json.created,
      json.comments.map(Comment.fromJSON)
    );
    //kijken of alle data wordt meegegeven
    rec.id = json.id;
    return rec;
  }
  toJSON(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imgUrl: this.imgUrl,
      creator: this.creator,
      created: this.created,
      comments: this.comments.map(comm => comm.toJSON)
    };
  }

  get aId(): number {
    return this.id;
  }
  get aComments(): Array<Comment> {
    return this.comments;
  }

  get aCreator(): string{
    return this.creator;
  }
}
