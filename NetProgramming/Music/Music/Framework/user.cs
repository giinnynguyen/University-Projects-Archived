using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("user")]
public class user
{
  public user()
  {
    this.albums = (ICollection<album>) new HashSet<album>();
    this.comments = (ICollection<comment>) new HashSet<comment>();
    this.relationships = (ICollection<relationship>) new HashSet<relationship>();
    this.relationships1 = (ICollection<relationship>) new HashSet<relationship>();
    this.songs = (ICollection<song>) new HashSet<song>();
  }

  [Key]
  public int user_id { get; set; }

  [Required]
  [StringLength(50)]
  public string username { get; set; }

  [StringLength(50)]
  public string email { get; set; }

  [Required]
  [StringLength(50)]
  public string pass { get; set; }

  public int profile_id { get; set; }

  public virtual ICollection<album> albums { get; set; }

  public virtual ICollection<comment> comments { get; set; }

  public virtual profile profile { get; set; }

  public virtual ICollection<relationship> relationships { get; set; }

  public virtual ICollection<relationship> relationships1 { get; set; }

  public virtual ICollection<song> songs { get; set; }
}
