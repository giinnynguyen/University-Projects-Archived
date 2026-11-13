using System.Security.Cryptography;
using System.Text;

#nullable disable
namespace HPMusic.Code;

public static class CommonMethod
{
  public static string ToMD5(this string str)
  {
    byte[] hash = new MD5CryptoServiceProvider().ComputeHash(Encoding.UTF8.GetBytes(str));
    StringBuilder stringBuilder = new StringBuilder();
    foreach (byte num in hash)
      stringBuilder.Append($"{num:x2}");
    return stringBuilder.ToString();
  }
}
