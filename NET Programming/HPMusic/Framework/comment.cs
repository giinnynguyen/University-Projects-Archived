using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("comment")]
public class comment
{
  public comment() => this.likes = (ICollection<like>) new HashSet<like>();

  [Key]
  public int comment_id { get; set; }

  public int? user_id { get; set; }

  [Column("comment", TypeName = "text")]
  public string comment1 { get; set; }

  public DateTime? date { get; set; }

  [StringLength(50)]
  public string song_id { get; set; }

  public virtual song song { get; set; }

  public virtual user user { get; set; }

  public virtual ICollection<like> likes { get; set; }
}
