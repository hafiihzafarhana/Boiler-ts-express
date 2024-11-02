class Token {
  private readonly userId: string;
  private accToken: string;
  private refToken: string;

  constructor(userId: string, accToken: string, refToken: string) {
    this.userId = userId;
    this.accToken = accToken;
    this.refToken = refToken;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAccToken(): string {
    return this.accToken;
  }

  public getRefToken(): string {
    return this.refToken;
  }

  public changeRefToken(refToken: string): void {
    this.refToken = refToken;
  }

  public changePassword(accToken: string): void {
    this.accToken = accToken;
  }
}

export default Token;
