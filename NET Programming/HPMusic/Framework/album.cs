using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("album")]
public class album
{
  [Key]
  public int album_id { get; set; }

  public int? user_id { get; set; }

  [Required]
  [StringLength(50)]
  public string album_name { get; set; }

  [Column(TypeName = "text")]
  public string description { get; set; }

  public virtual user user { get; set; }
}
