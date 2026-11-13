using Google.Apis.Drive.v2;
using System;

#nullable disable
namespace HPMusic.Models;

public class ServiceApi
{
  private static ServiceApi instance;

  private ServiceApi()
  {
  }

  public static ServiceApi Instance
  {
    get
    {
      if (ServiceApi.instance == null)
        ServiceApi.instance = new ServiceApi();
      return ServiceApi.instance;
    }
  }

  public static DriveService GetService()
  {
    return Oauth.AuthenticateServiceAccount("music-707@music-170005.iam.gserviceaccount.com", AppDomain.CurrentDomain.BaseDirectory + "Assets\\data\\Music-2c79fe2c2d25.p12");
  }
}
