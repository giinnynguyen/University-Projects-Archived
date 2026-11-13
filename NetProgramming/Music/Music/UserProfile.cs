using System.ComponentModel.DataAnnotations;

#nullable disable
public class UserProfile
{
  [Key]
  public string UserName { get; set; }

  public string Displayname { get; set; }

  public string Job { get; set; }

  public short Age { get; set; }

  public bool Sex { get; set; }

  [StringLength(15)]
  public string Place { get; set; }

  [StringLength(20)]
  public string Title { get; set; }
}
