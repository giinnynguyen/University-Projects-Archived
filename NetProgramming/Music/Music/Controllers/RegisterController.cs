using HPMusic.Code;
using HPMusic.Models;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class RegisterController : Controller
{
  [HttpGet]
  public ActionResult Register() => (ActionResult) this.View();

  [HttpPost]
  public JsonResult Register(string email, string username, string pass)
  {
    string md5 = pass.ToMD5();
    UserDAO.Register(email, username, md5);
    return this.Json((object) "OK", JsonRequestBehavior.AllowGet);
  }

  [HttpGet]
  public JsonResult CheckEmailExist(string email)
  {
    return !UserDAO.checkEmailExist(email) ? this.Json((object) "NotExist", JsonRequestBehavior.AllowGet) : this.Json((object) "Exist", JsonRequestBehavior.AllowGet);
  }

  [HttpGet]
  public JsonResult CheckUserExist(string username)
  {
    return !UserDAO.checkUsernameExist(username) ? this.Json((object) "NotExist", JsonRequestBehavior.AllowGet) : this.Json((object) "Exist", JsonRequestBehavior.AllowGet);
  }

  [HttpGet]
  public ActionResult NotifyRegister() => (ActionResult) this.View();
}
