using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("like")]
public class like
{
  [Key]
  public int like_id { get; set; }

  public int? numlike { get; set; }

  [StringLength(50)]
  public string song_id { get; set; }

  public int? comment_id { get; set; }

  public virtual comment comment { get; set; }

  public virtual song song { get; set; }
}
