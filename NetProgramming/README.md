.NET PROGRAMMING COURSE REPORT (SEMESTER 2, 2016–2017)

Topic: Music Streaming Website

Authors: Ginny

1. Project Overview
2. Introduction
The music streaming website project is inspired by the concept of a music social network, where members can share their vocals with friends.

Website demo (uncompleted): [http://hpmusic.azurewebsites.net/](http://hpmusic.azurewebsites.net/)

3. Technologies Used
ASP.NET MVC

Google Drive API: Free hosting storage for music tracks and avatars

Entity Framework Code First

Entity Framework Migrations for database updates upon schema modifications

AJAX, jQuery, MD5 password hashing

4. Features
4.1. Music Upload
Login is required to upload music.

(Future development direction: After uploading, an admin reviews the content to verify the correct genre and check for copyright violations before approval.)

4.2. Music Player
Play a user's playlist or loop a single track.

HTML5 audio element for volume control, timeline tracking, and play/pause functions.

Download music.

Share songs on Facebook.

Update the song download counter when a user clicks "Download".

(We wanted to implement comments and likes for each song, but encountered difficulties due to being new to C# and ASP.NET, so we were unable to complete them.)

4.3. User Management
Follow and unfollow features: Login required to use this functionality.

4.4. Registration
Form validation using jQuery.

Show password toggle.

Use AJAX to check if a username or email already exists.

MD5 hashing for passwords.

4.5. Login and Logout
Form validation using jQuery; displays an error notification if the username or password is incorrect.

4.6. Homepage Interface
4.7. Genre-Based Music Interface