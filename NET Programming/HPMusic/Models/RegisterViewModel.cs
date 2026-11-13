using System.ComponentModel.DataAnnotations;

#nullable disable
namespace HPMusic.Models;

public class RegisterViewModel
{
  [Required]
  [EmailAddress]
  [Display(Name = "Email")]
  public string Email { get; set; }

  [Required]
  [Display(Name = "UserName")]
  public string UserName { get; set; }

  [Required]
  [StringLength(100, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự.", MinimumLength = 6)]
  [DataType(DataType.Password)]
  [Display(Name = "Password")]
  public string Password { get; set; }

  [DataType(DataType.Password)]
  [Display(Name = "Confirm password")]
  [Compare("Password", ErrorMessage = "Mật khẩu không khớp")]
  public string ConfirmPassword { get; set; }
}
