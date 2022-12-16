import user from "../models/user";
import orgnaization from "../models/organization";
import MESSAGES from "../helpers/messages";
import Helper from "../helpers/index";
import IaddOrg from "src/interfaces/org-request/add-org";
import Iorg from "src/interfaces/orgnaization";
import IupdateOrg from "src/interfaces/org-request/update-org";
class Orgnaization{
    async addOrgnaization(req:IaddOrg, res:any) {
        try {
          const idUser = req.user._id;
          let attribute = {
              userId: idUser,
              orgName: req.body.orgName,
              address:req.body.address,
              active:true
            
          };
          
          let org:Iorg = new orgnaization(attribute);
          org.save()
            .then(async (value) => {
              const activeFalse= await orgnaization.updateMany({userId:req.user._id,_id:{$ne: value._id}},{active:false})
              let resPayload = {
                message: MESSAGES.SUCCESSFULLY_ADDED_ORGANIZATION
              };
              return Helper.success(res, resPayload);
            })
            .catch((err) => {
              let resPayload = {
                message: err,
                payload: {},
              };
              return Helper.error(res, resPayload);
            });
        } catch (err) {
          let resPayload = {
            message: MESSAGES.SOMETHING_WENT_WRONG,
            payload: {},
          };
          return Helper.error(res, resPayload, 500);
        }
      }
      async orgList(req, res) {
        try {
          const extUser = req.user.userId;
          const userData = await user.aggregate([
            {
              $lookup: {
                from: "orgs",
                localField: "_id",
                foreignField: "userId",
                as: "userOrgs",
              },
            },
            {
              $match: {
                userName: "gaurav",
              },
            },
            {
              $project: {
                _id: 0,
                by: "$firstName",
                userOrgs: {
                  orgName: 1,
                  active:1
                },
              },
            },
          ]);
          let resPayload = {
            message: "your orgs",
            payload: userData,
          };
          return Helper.success(res, resPayload);
        } catch (err) {
          const resPayload = {
            message: MESSAGES.SOMETHING_WENT_WRONG,
            payload: {},
          };
          return Helper.error(res, resPayload);
        }
      }
      async updateOrg(req:IupdateOrg,res){
        try {
          const extUser=req.user._id
          
          const searchUser=await orgnaization.findById({_id:req.params.id})
          if(searchUser.userId != extUser){
            let resPayload = {
              message: MESSAGES.NOT_ALLOWED
            };
            return Helper.error(res, resPayload, 500);
          }
        
          const updatedOrg=await orgnaization.findByIdAndUpdate(req.params.id, {...req.body,active:true}, { new: true })
          .then(async (item) => {
            console.log(item)
            const activeFalse= await orgnaization.updateMany({userId:req.user._id,_id:{$ne:item._id}},{active:false})
            console.log("working")
            let resPayload = {
              message: MESSAGES.UPDATED_SUCCESS
            };
            return Helper.success(res, resPayload);
          })
          .catch((err) => {
            let resPayload = {
              message: MESSAGES.CANNOT_UPDATE,
            };
            return Helper.error(res, resPayload, 500);
          });
          
        }
         catch (err) {
          const resPayload = {
            message: MESSAGES.SOMETHING_WENT_WRONG,
            payload: {},
          };
          return Helper.error(res, resPayload,409);
        }
      }
}
export default new Orgnaization