using HPMusic.Framework;
using System.Collections.Generic;

#nullable disable
namespace HPMusic.Models;

public class UploadModel
{
  public song Song { get; set; }

  public IEnumerable<language> Language { get; set; }

  public List<CheckBoxModel> Checkbox { get; set; }
}
