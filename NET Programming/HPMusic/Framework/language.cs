using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("language")]
public class language
{
  [Key]
  [StringLength(5)]
  public string language_id { get; set; }

  [StringLength(10)]
  public string language_name { get; set; }
}
