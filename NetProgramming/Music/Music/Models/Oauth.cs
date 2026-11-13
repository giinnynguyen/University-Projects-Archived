using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v2;
using Google.Apis.Http;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Threading;

#nullable disable
namespace HPMusic.Models;

public class Oauth
{
  public static DriveService AuthenticateServiceAccount(
    string serviceAccountEmail,
    string keyFilePath)
  {
    if (!File.Exists(keyFilePath))
      return (DriveService) null;
    string[] strArray = new string[7]
    {
      DriveService.Scope.Drive,
      DriveService.Scope.DriveAppdata,
      DriveService.Scope.DriveAppsReadonly,
      DriveService.Scope.DriveFile,
      DriveService.Scope.DriveMetadataReadonly,
      DriveService.Scope.DriveReadonly,
      DriveService.Scope.DriveScripts
    };
    X509Certificate2 certificate = new X509Certificate2(keyFilePath, "notasecret", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.Exportable);
    try
    {
      ServiceAccountCredential accountCredential = new ServiceAccountCredential(new ServiceAccountCredential.Initializer(serviceAccountEmail)
      {
        Scopes = ((IEnumerable<string>) strArray)
      }.FromCertificate(certificate));
      accountCredential.RequestAccessTokenAsync(CancellationToken.None);
      return new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = (IConfigurableHttpClientInitializer) accountCredential,
        ApplicationName = "Music"
      });
    }
    catch (Exception ex)
    {
      return (DriveService) null;
    }
  }

  public static DriveService AuthenticateOauth(
    string clientId,
    string clientSecret,
    string userName)
  {
    string[] scopes = new string[7]
    {
      DriveService.Scope.Drive,
      DriveService.Scope.DriveAppdata,
      DriveService.Scope.DriveAppsReadonly,
      DriveService.Scope.DriveFile,
      DriveService.Scope.DriveMetadataReadonly,
      DriveService.Scope.DriveReadonly,
      DriveService.Scope.DriveScripts
    };
    try
    {
      UserCredential result = GoogleWebAuthorizationBroker.AuthorizeAsync(new ClientSecrets()
      {
        ClientId = clientId,
        ClientSecret = clientSecret
      }, (IEnumerable<string>) scopes, userName, CancellationToken.None, (IDataStore) new FileDataStore("Demo.Drive.Auth.Store")).Result;
      return new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = (IConfigurableHttpClientInitializer) result,
        ApplicationName = "Drive API Demo"
      });
    }
    catch (Exception ex)
    {
      Console.WriteLine((object) ex.InnerException);
      return (DriveService) null;
    }
  }
}
