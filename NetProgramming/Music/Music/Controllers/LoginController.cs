using HPMusic.Code;
using HPMusic.Models;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class LoginController : Controller
{
  [HttpGet]
  public ActionResult Login() => (ActionResult) this.View();

  [HttpPost]
  public JsonResult Login(string username, string pass)
  {
    string md5 = pass.ToMD5();
    if (!UserDAO.checkLogin(username, md5))
      return this.Json((object) "Err", JsonRequestBehavior.AllowGet);
    this.Session["UserLogin"] = (object) UserDAO.UserFromUsername(username);
    return this.Json((object) "OK", JsonRequestBehavior.AllowGet);
  }

  public ActionResult Logout()
  {
    this.Session["UserLogin"] = (object) null;
    return (ActionResult) this.RedirectToAction("Index", "Home");
  }

  [HttpGet]
  public ActionResult ForgotPass() => (ActionResult) this.View();
}
