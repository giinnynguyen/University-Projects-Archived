using HPMusic.Framework;
using System.ComponentModel.DataAnnotations;

#nullable disable
namespace HPMusic.Models;

public class LoginModel
{
  [Required]
  public user User { get; set; }

  public string Remember { get; set; }
}
