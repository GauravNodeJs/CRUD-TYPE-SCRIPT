import orgnaization from "../models/organization";
import Helper from "../helpers/index";
import MESSAGES from "../helpers/messages";
import user from "../models/user";
import Iuser from "src/interfaces/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IaddUser from "src/interfaces/user-request/add-user";
import IaddOrg from "src/interfaces/orgnaization";
import Ilogin from "src/interfaces/user-request/login";
import IupdateUser from "src/interfaces/user-request/update-user";
import nodemailer from "nodemailer";
import Irequest from "src/interfaces/user-request/request";
import {INodemailer} from '../interfaces/nodemailer/nodemailer'

class UserService {
  async addUser(req: IaddUser, res: any) {
    try {
      console.log("hello")
      const extUser = await user.findOne({ userName: req.body.userName });
      if (extUser) {
        let resPayload = {
          message: MESSAGES.USER_EXIST,
        };
        return Helper.error(res, resPayload, 404);
      }

      const userDetail: Iuser =  new user(req.body);
      console.log(req.body);
      if (req.body.orgnaization) {
        const addOrg = {
          userId: userDetail._id,
          orgName: req.body.orgnaization.orgName,
          address: req.body.orgnaization.address,
        };
        const org: IaddOrg = new orgnaization(addOrg);
        org.save();
      }
      console.log("woking");
     await userDetail.save().then(async (_value) => {
        const extUser = await user.findOne({ userName: req.body.userName });
        const token = jwt.sign({ _id: extUser._id }, process.env.SECRET_KEY);
        let resPayload = {
          message: MESSAGES.REGISTER_SUCCESS,
          payload: token,
        };
        return Helper.success(res, resPayload);
      });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return Helper.error(res, resPayload, 500);
    }
  }
  async loginUser(req: Ilogin, res: any) {
    try {
      const extUser = await user.findOne({ userName: req.body.userName });

      if (!extUser) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return Helper.error(res, resPayload, 401);
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        extUser.password
      );
      if (!validPassword) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return Helper.error(res, resPayload, 401);
      }

      const token = jwt.sign({ _id: extUser._id }, process.env.SECRET_KEY);
      console.log(token);
      const resPayload = {
        message: MESSAGES.LOGIN_SUCCESS,
        payload: { token: token },
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return Helper.error(res, resPayload, 500);
    }
  }

  async updateUser(req: IupdateUser, res: any) {
    try {
      const extUser: Iuser = await user.findOne({ _id: req.user._id });
      if (!req.body) {
        res.send("cannot update empty field");
      }
      if (!extUser.changePassword) {
        delete req.body.password;
      }
      const updatedUser = await user
        .findOneAndUpdate({ _id: req.user._id }, req.body, { new: true })
        .then((_item) => {
          let resPayload = {
            message: MESSAGES.UPDATED_SUCCESS,
          };
          return Helper.success(res, resPayload);
        })
        .catch((_err) => {
          let resPayload = {
            message: MESSAGES.USER_EXIST,
          };
          return Helper.error(res, resPayload, 500);
        });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return Helper.error(res, resPayload, 500);
    }
  }
  async sendMail(req:INodemailer, res:any) {
    try{
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gauravrainawins@gmail.com",
          pass: "xrohrjhgoszifvaa",
        },
      });
      const mailOption = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
      };
      await transporter.sendMail(mailOption, function (error, info) {
        if (error) {
          let resPayload = {
            message: MESSAGES.NOT_SENT,
            payload:{error}
          };
          return Helper.error(res, resPayload, 424);
        } else {
          let resPayload = {
            message: MESSAGES.SENT_SUCCESSFULLY,
            payload:info.response
          };
          return Helper.success(res, resPayload);
        }
      });
    }
    catch(error){
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload:error
      };
      return Helper.success(res, resPayload,500);
    }

  }
}
export default new UserService();
