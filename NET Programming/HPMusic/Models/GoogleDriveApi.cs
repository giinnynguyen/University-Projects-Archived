using Google.Apis.Drive.v2;
using Google.Apis.Drive.v2.Data;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;

#nullable disable
namespace HPMusic.Models;

public class GoogleDriveApi
{
  public static Google.Apis.Drive.v2.Data.File createDirectory(
    DriveService _service,
    string _title,
    string _description,
    string _parent)
  {
    Google.Apis.Drive.v2.Data.File directory = (Google.Apis.Drive.v2.Data.File) null;
    Google.Apis.Drive.v2.Data.File body = new Google.Apis.Drive.v2.Data.File();
    body.Title = _title;
    body.Description = _description;
    body.MimeType = "application/vnd.google-apps.folder";
    body.Parents = (IList<ParentReference>) new List<ParentReference>()
    {
      new ParentReference() { Id = _parent }
    };
    try
    {
      directory = _service.Files.Insert(body).Execute();
    }
    catch (Exception ex)
    {
    }
    return directory;
  }

  public static List<Google.Apis.Drive.v2.Data.File> GetFiles(DriveService service, string search)
  {
    List<Google.Apis.Drive.v2.Data.File> files = new List<Google.Apis.Drive.v2.Data.File>();
    try
    {
      FilesResource.ListRequest listRequest = service.Files.List();
      listRequest.MaxResults = new int?(1000);
      if (search != null)
        listRequest.Q = search;
      for (FileList fileList = listRequest.Execute(); fileList.Items != null; fileList = listRequest.Execute())
      {
        foreach (Google.Apis.Drive.v2.Data.File file in (IEnumerable<Google.Apis.Drive.v2.Data.File>) fileList.Items)
          files.Add(file);
        if (fileList.NextPageToken != null)
          listRequest.PageToken = fileList.NextPageToken;
        else
          break;
      }
    }
    catch (Exception ex)
    {
    }
    return files;
  }

  public static Google.Apis.Drive.v2.Data.File uploadFile(
    DriveService _service,
    string _fileName,
    string _parentID,
    string _description)
  {
    if (!System.IO.File.Exists(_fileName))
      return (Google.Apis.Drive.v2.Data.File) null;
    Google.Apis.Drive.v2.Data.File body = new Google.Apis.Drive.v2.Data.File();
    body.Title = Path.GetFileName(_fileName);
    body.Description = _description;
    body.MimeType = GoogleDriveApi.GetMimeType(_fileName);
    body.Parents = (IList<ParentReference>) new List<ParentReference>()
    {
      new ParentReference() { Id = _parentID }
    };
    MemoryStream memoryStream = new MemoryStream(System.IO.File.ReadAllBytes(_fileName));
    try
    {
      FilesResource.InsertMediaUpload insertMediaUpload = _service.Files.Insert(body, (Stream) memoryStream, GoogleDriveApi.GetMimeType(_fileName));
      insertMediaUpload.Upload();
      return insertMediaUpload.ResponseBody;
    }
    catch (Exception ex)
    {
      return (Google.Apis.Drive.v2.Data.File) null;
    }
  }

  private static string GetMimeType(string fileName)
  {
    string mimeType = "application/unknown";
    string lower = Path.GetExtension(fileName).ToLower();
    RegistryKey registryKey = Registry.ClassesRoot.OpenSubKey(lower);
    if (registryKey != null && registryKey.GetValue("Content Type") != null)
      mimeType = registryKey.GetValue("Content Type").ToString();
    return mimeType;
  }

  public static bool downloadFile(DriveService _service, Google.Apis.Drive.v2.Data.File _fileResource, string _saveTo)
  {
    if (string.IsNullOrEmpty(_fileResource.DownloadUrl))
      return false;
    try
    {
      byte[] result = _service.HttpClient.GetByteArrayAsync(_fileResource.DownloadUrl).Result;
      System.IO.File.WriteAllBytes(_saveTo, result);
      return true;
    }
    catch (Exception ex)
    {
      return false;
    }
  }

  public static Google.Apis.Drive.v2.Data.File updateFile(
    DriveService service,
    string fileId,
    string newDescription,
    string newFilename,
    bool newRevision)
  {
    try
    {
      Google.Apis.Drive.v2.Data.File body = service.Files.Get(fileId).Execute();
      body.Title = Path.GetFileName(newFilename);
      body.Description = newDescription;
      body.MimeType = GoogleDriveApi.GetMimeType(newFilename);
      MemoryStream memoryStream = new MemoryStream(System.IO.File.ReadAllBytes(newFilename));
      FilesResource.UpdateMediaUpload updateMediaUpload = service.Files.Update(body, fileId, (Stream) memoryStream, body.MimeType);
      updateMediaUpload.NewRevision = new bool?(newRevision);
      updateMediaUpload.Upload();
      return updateMediaUpload.ResponseBody;
    }
    catch (Exception ex)
    {
      return (Google.Apis.Drive.v2.Data.File) null;
    }
  }

  public static Google.Apis.Drive.v2.Data.File printFile(DriveService service, string fileId)
  {
    try
    {
      return service.Files.Get(fileId).Execute();
    }
    catch (Exception ex)
    {
      return (Google.Apis.Drive.v2.Data.File) null;
    }
  }

  public static void PrintPermission(DriveService service, string fileId, string permissionId)
  {
    try
    {
      foreach (string additionalRole in (IEnumerable<string>) service.Permissions.Get(fileId, permissionId).Execute().AdditionalRoles)
        ;
    }
    catch (Exception ex)
    {
    }
  }

  public static Permission InsertPermission(
    DriveService service,
    string fileId,
    string who,
    string type,
    string role)
  {
    Permission body = new Permission();
    body.Value = who;
    body.Type = type;
    body.Role = role;
    try
    {
      return service.Permissions.Insert(body, fileId).Execute();
    }
    catch (Exception ex)
    {
    }
    return (Permission) null;
  }

  public static Permission InsertPermission(DriveService service, string fileId)
  {
    Permission body = new Permission();
    body.Type = "anyone";
    body.Role = "reader";
    try
    {
      return service.Permissions.Insert(body, fileId).Execute();
    }
    catch (Exception ex)
    {
    }
    return (Permission) null;
  }

  public static string PrintPermissionIdForEmail(DriveService service, string email)
  {
    try
    {
      return service.Permissions.GetIdForEmail(email).Execute().Id;
    }
    catch (Exception ex)
    {
      return (string) null;
    }
  }

  public static void DeleteFile(DriveService service, string fileId)
  {
    try
    {
      service.Files.Delete(fileId).Execute();
    }
    catch (Exception ex)
    {
    }
  }
}
