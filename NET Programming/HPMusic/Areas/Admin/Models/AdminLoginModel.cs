using System.ComponentModel.DataAnnotations;

#nullable disable
namespace HPMusic.Areas.Admin.Models;

public class AdminLoginModel
{
  [Required]
  public string Username { get; set; }

  [Required]
  public string Password { get; set; }
}
