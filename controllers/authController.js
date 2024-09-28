import authService from "../services/authService.js";

class authController {
  static async register(req, res) {
    console.log(req.body);
    
    const { username, password } = req.body;
    try {
      await authService.register(username, password);
      console.log("register success");

      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      console.log("error at register");
      res.status(400).send("Can't register");
    }
  }
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const token = await authService.login(username, password);
      console.log("login success");

      res.status(200).send({ token });
    } catch (error) {
      console.log("error at login");

      res.status(400).send("Can't login");
    }
  }

  static async me(req, res) {
    res.status(200).send({ user: req.user });
  }
}

export default authController;
