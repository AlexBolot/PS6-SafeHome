DROP TABLE IF EXISTS HOME CASCADE;
DROP TABLE IF EXISTS TASK CASCADE;
DROP TABLE IF EXISTS ISSUE CASCADE;
DROP TABLE IF EXISTS "USER" CASCADE;
DROP TABLE IF EXISTS STATUS CASCADE;
DROP TABLE IF EXISTS LOCATION CASCADE;
DROP TABLE IF EXISTS CATEGORY CASCADE;

DROP TABLE IF EXISTS HOME_USER CASCADE;
DROP TABLE IF EXISTS TASK_USER CASCADE;

CREATE TABLE ISSUE
(
  IdIssue         INTEGER      NOT NULL PRIMARY KEY,
  Title           VARCHAR(140) NOT NULL,
  Description     VARCHAR(600),
  DateIncident    DATE,
  DateDeclaration DATE,

  IdAuthor        INTEGER      NOT NULL REFERENCES "USER",
  IdCat           INTEGER      NOT NULL REFERENCES CATEGORY,
  IdHome          INTEGER      NOT NULL REFERENCES HOME,
  IdLocation      INTEGER      NOT NULL REFERENCES LOCATION,
  IdStatus        INTEGER      NOT NULL REFERENCES STATUS,
  IdUrgency       INTEGER      NOT NULL REFERENCES URGENCY

  --Image      ???        Je sais pas quel TYPE de donnée ON peut utiliser ~ Alex
);

CREATE TABLE "USER"
(
  IdUser   INTEGER     NOT NULL,
  Name     VARCHAR(20) NOT NULL,
  Password VARCHAR(50) NOT NULL,
  Admin    BOOLEAN     NOT NULL,
  Email    VARCHAR(40) NOT NULL,

  PRIMARY KEY (IdUser, Email)
);

CREATE TABLE HOME
(
  IdHome INTEGER     NOT NULL PRIMARY KEY,
  Name   VARCHAR(20) NOT NULL
);

CREATE TABLE HOME_USER
(
  IdHome INTEGER NOT NULL REFERENCES HOME,
  IdUser INTEGER NOT NULL REFERENCES "USER",

  PRIMARY KEY (IdHome, IdUser)
);

CREATE TABLE STATUS
(
  IdStatus INTEGER     NOT NULL PRIMARY KEY,
  Name     VARCHAR(20) NOT NULL
);

CREATE TABLE CATEGORY
(
  IdCat INTEGER     NOT NULL PRIMARY KEY,
  Name  VARCHAR(20) NOT NULL
);

CREATE TABLE LOCATION
(
  IdLocation INTEGER     NOT NULL PRIMARY KEY,
  Name       VARCHAR(20) NOT NULL
);

CREATE TABLE TASK
(
  IdTask   INTEGER      NOT NULL PRIMARY KEY,
  Text     VARCHAR(600) NOT NULL,
  IdAuthor INTEGER      NOT NULL REFERENCES "USER",
  IdIssue  INTEGER      NOT NULL REFERENCES ISSUE
);

CREATE TABLE TASK_USER
(
  IdTask    INTEGER NOT NULL REFERENCES TASK,
  IdAssigne INTEGER NOT NULL REFERENCES "USER",

  PRIMARY KEY (IdAssigne, IdAssigne)
);

CREATE TABLE URGENCY
(
  IdUrgency INTEGER      NOT NULL PRIMARY KEY,
  Name      VARCHAR(100) NOT NULL,
  Level     INTEGER      NOT NULL
);

COMMIT; -- Pour valider l'ensemble des créations











