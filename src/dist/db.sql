CREATE TABLE users (
  id_user INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username CHAR(55) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(255) NOT NULL
);

CREATE TABLE sports (
  id_sport INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name CHAR(55) NOT NULL
);

CREATE TABLE addresses (
  id_address INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  street VARCHAR(255) NOT NULL,
  city CHAR(100) NOT NULL,
  state CHAR(100) NOT NULL
);

CREATE TABLE matches (
  id_match INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name CHAR(55) NOT NULL UNIQUE,
  description CHAR(255) NOT NULL,
  address_match INT NOT NULL,
  id_sport INT NOT NULL,
  date_match DATE NOT NULL,
  start_match TIME NOT NULL,
  end_of_match TIME NOT NULL,
  total_players_needed TINYINT UNSIGNED NOT NULL,
  players_registered TINYINT UNSIGNED NOT NULL,
  created_by INT NOT NULL,
  contact_phone CHAR(15),
  FOREIGN KEY (address_match) REFERENCES addresses(id_address),
  FOREIGN KEY (id_sport) REFERENCES sports(id_sport),
  FOREIGN KEY (created_by) REFERENCES users(id_user)
);

CREATE TABLE game_players (
  id_participants INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id_user),
  FOREIGN KEY (game_id) REFERENCES matches(id_match)
)


use meu_banco;

insert into sports(name) values 
	("Futebol"),
    ("Basquete"),
    ("Vôlei"),
    ("Tênis")

insert into users(username, email, password) VALUES
	("Tymo", "tymo@gmail.com", "123")