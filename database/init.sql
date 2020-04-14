CREATE DATABASE secure_social_db;

CREATE TABLE Users
(
    Username varchar(255) not null,
    Password varchar(255) not null,
    PRIMARY KEY (Username)
);

CREATE TABLE Posts
(
    Id int not null,
    Encrypted_Text varchar(1024) not null,
    Author varchar(255) not null,
    DecryptKey varchar(255) not null,
    PRIMARY KEY (id),
    FOREIGN KEY (Author) References Users(Username)
);

CREATE TABLE Follows
(
    Follower varchar(255) not null,
    Following varchar(255) not null,
    PRIMARY KEY (Follower, Following),
    FOREIGN KEY (Follower) References Users(Username),
    FOREIGN KEY (Following) References Users(Username)
);

CREATE TABLE CanDecrypt
(
    User varchar(255) not null,
    PostsBy varchar(255) not null,
    PRIMARY KEY (User, PostsBy),
    FOREIGN KEY (User) References Users(Username),
    FOREIGN KEY (PostsBy) References Users(Username)
);