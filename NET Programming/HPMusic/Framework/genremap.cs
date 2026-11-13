using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("genremap")]
public class genremap
{
  public genremap() => this.genres = (ICollection<genre>) new HashSet<genre>();

  [Key]
  [StringLength(10)]
  public string genremap_id { get; set; }

  [Required]
  [StringLength(50)]
  public string genreName { get; set; }

  public virtual ICollection<genre> genres { get; set; }
}
