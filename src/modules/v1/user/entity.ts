class User {
  private readonly id: string;
  private email: string;
  private name: string;
  private password: string;
  private username: string;

  constructor(id: string, email: string, name: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.username = username;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUsername(): string {
    return this.username;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changePassword(password: string): void {
    this.password = password;
  }
}

export default User;
