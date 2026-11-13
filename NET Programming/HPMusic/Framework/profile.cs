using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("profile")]
public class profile
{
  public profile() => this.users = (ICollection<user>) new HashSet<user>();

  [Key]
  public int profile_id { get; set; }

  [Required]
  [StringLength(50)]
  public string displayname { get; set; }

  [StringLength(50)]
  public string job { get; set; }

  public int age { get; set; }

  [StringLength(50)]
  public string avatar { get; set; }

  [StringLength(50)]
  public string title { get; set; }

  public bool sex { get; set; }

  [StringLength(50)]
  public string place { get; set; }

  public virtual ICollection<user> users { get; set; }
}
