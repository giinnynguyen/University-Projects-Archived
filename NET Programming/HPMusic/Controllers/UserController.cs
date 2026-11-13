using HPMusic.Framework;
using HPMusic.Models;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class UserController : Controller
{
  public ActionResult User(int id)
  {
    UserModel model = new UserModel();
    user user = UserDAO.UserFromID(id);
    model.User = user;
    model.Profile = UserDAO.UserProfile(user.profile_id);
    model.SongUser = SongDAO.SongOfUser(id);
    model.SongUserPopular = SongDAO.SongOfUserPopular(id);
    return (ActionResult) this.View((object) model);
  }

  [HttpGet]
  public JsonResult Follow(int userid)
  {
    if (this.Session["UserLogin"] == null)
      return this.Json((object) "nologin", JsonRequestBehavior.AllowGet);
    user user = this.Session["UserLogin"] as user;
    if (UserDAO.CheckFollow(userid, user.user_id))
    {
      UserDAO.unfollow(userid, user.user_id);
      return this.Json((object) "Following", JsonRequestBehavior.AllowGet);
    }
    UserDAO.follow(userid, user.user_id);
    return this.Json((object) nameof (Follow), JsonRequestBehavior.AllowGet);
  }

  [HttpGet]
  public JsonResult Profile(int idFriend)
  {
    if (this.Session["UserLogin"] == null)
      return this.Json((object) "NoLogin", JsonRequestBehavior.AllowGet);
    user user = this.Session["UserLogin"] as user;
    return UserDAO.CheckFriend(idFriend, user.user_id) ? this.Json((object) "Friend", JsonRequestBehavior.AllowGet) : this.Json((object) "NotFriend", JsonRequestBehavior.AllowGet);
  }

  public ActionResult GetProfileView(int idFriend)
  {
    return (ActionResult) this.PartialView((object) UserDAO.UserFromID(idFriend));
  }
}
