import {HelloService} from "../service/hello.service";

export class HelloController{
    static read = async (req, res, next) => {
        const result = await HelloService.read();
    try {
      return res.status(200).json({
        success: true,
        message: "Get Article success",
        result: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}