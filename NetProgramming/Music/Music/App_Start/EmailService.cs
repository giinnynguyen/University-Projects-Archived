using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

#nullable disable
namespace HPMusic.App_Start
{
  public class EmailService : IIdentityMessageService
  {
    public Task SendAsync(IdentityMessage message)
    {
      string appSetting1 = ConfigurationManager.AppSettings["mailAccount"];
      string appSetting2 = ConfigurationManager.AppSettings["mailAccount"];
      string appSetting3 = ConfigurationManager.AppSettings["mailPass"];
      SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
      smtpClient.Port = 587;
      smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
      NetworkCredential networkCredential = new NetworkCredential(appSetting1, appSetting3);
      smtpClient.EnableSsl = true;
      smtpClient.Credentials = (ICredentialsByHost) networkCredential;
      return smtpClient.SendMailAsync(new MailMessage(appSetting2, message.Destination)
      {
        Subject = message.Subject,
        Body = message.Body
      });
    }
  }
}
