class FirebaseService {
  constructor() {
    let value = localStorage.getItem("USER") || null;
    if (value) {
      this.user = JSON.parse(value);
    } else {
      this.user = null;
    }
  }
  user: any;
  login = ({ email, password }): Promise<any> => {
    if (email && password) {
      this.user = { email };
      localStorage.setItem("USER", JSON.stringify(this.user));
      return Promise.resolve(this.user);
    } else {
      localStorage.removeItem("USER");
      return Promise.resolve({ error: "invalid user" });
    }
  };

  logout = () => {
    localStorage.removeItem("USER");
    return Promise.resolve({});
  };

  getUser = () => {
    return this.user;
  };
}

export const firebaseAPI = new FirebaseService();
