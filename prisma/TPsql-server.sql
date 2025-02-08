-- TP SQL SERVER :

--Partie I : Gestion de bases de données

-- 1. Création de la base de données
CREATE DATABASE bdGesStock
ON PRIMARY 
(
    NAME = 'bdGesStock',
    FILENAME = 'C:\DONNEES\GesStock\bdGesStock.mdf',
    SIZE = 100MB,
    MAXSIZE = 1GB,
    FILEGROWTH = 10MB
)
LOG ON
(
    NAME = 'bdGesStock_log',
    FILENAME = 'C:\DONNEES\GesStock\bdGesStock_log.ldf',
    SIZE = 8MB,
    MAXSIZE = 500MB,
    FILEGROWTH = 15%
);



-- 2. Ajout des groupes de fichiers
ALTER DATABASE bdGesStock
ADD FILEGROUP gfProda;

ALTER DATABASE bdGesStock
ADD FILEGROUP gfProdb;

ALTER DATABASE bdGesStock
ADD FILEGROUP gfProdc;

ALTER DATABASE bdGesStock
ADD FILEGROUP gfCateg;


-- 3. Ajout des fichiers aux groupes
ALTER DATABASE bdGesStock
ADD FILE
(
    NAME = 'Proda1',
    FILENAME = 'C:\DONNEES\GesStock\Proda1.ndf'
) TO FILEGROUP gfProda;

ALTER DATABASE bdGesStock
ADD FILE
(
    NAME = 'Prodb1',
    FILENAME = 'C:\DONNEES\GesStock\Prodb1.ndf'
) TO FILEGROUP gfProdb;

ALTER DATABASE bdGesStock
ADD FILE
(
    NAME = 'Prodc1',
    FILENAME = 'C:\DONNEES\GesStock\Prodc1.ndf'
) TO FILEGROUP gfProdc;

ALTER DATABASE bdGesStock
ADD FILE
(
    NAME = 'Categ1',
    FILENAME = 'C:\DONNEES\GesStock\Categ1.ndf'
) TO FILEGROUP gfCateg;

ALTER DATABASE bdGesStock
ADD FILE
(
    NAME = 'Categ2',
    FILENAME = 'C:\DONNEES\GesStock\Categ2.ndf'
) TO FILEGROUP gfCateg;



-- 4. Afficher l'aperçu de la base de données
EXEC sp_helpdb 'bdGesStock';


-- 5. Création de la table CATEGORIE
USE bdGesStock;
CREATE TABLE CATEGORIE
(
    CodeCateg CHAR(2) PRIMARY KEY,
    NomCateg VARCHAR(50)
) ON gfCateg;


-- 6. Afficher la structure de la table
EXEC sp_help 'CATEGORIE';


-- 7. Insertion des catégories
INSERT INTO CATEGORIE (CodeCateg, NomCateg) VALUES
('AG', 'Alimentation Générale'),
('EM', 'Electro Ménager');

-- 8. Création de la table PRODUIT partitionnée

-- Création de la fonction de partition
CREATE PARTITION FUNCTION PF_CodeCateg (CHAR(2))
AS RANGE RIGHT FOR VALUES ('EL');

-- Création du schéma de partition
CREATE PARTITION SCHEME PS_CodeCateg
AS PARTITION PF_CodeCateg 
TO (gfProda, gfProdb, gfProdc);

-- Création de la table PRODUIT partitionnée
CREATE TABLE PRODUIT
(
    Id INT IDENTITY(1,1),
    Libelle VARCHAR(100),
    PU DECIMAL(10,2),
    codeCateg CHAR(2)
) ON PS_CodeCateg(codeCateg);

-- 9. Insertion des produits
INSERT INTO PRODUIT (Libelle, PU, codeCateg) VALUES
-- Produits Alimentation Générale
('Riz', 1000, 'AG'),
('oeuf',200, 'AG'),
('sel', 800, 'AG'),
('Lait', 1200, 'AG'),
('Farine', 1500, 'AG'),
-- Produits Electro Ménager
('Téléviseur', 150000, 'EM'),
('Réfrigérateur', 200000, 'EM'),
('Machine à laver', 180000, 'EM'),
('Micro-onde', 45000, 'EM'),
('Climatiseur', 250000, 'EM');


-- 10. Requête pour afficher l'utilisation des fichiers
SELECT 
    df.name AS NomFichier,
    fs.allocated_extent_page_count AS PagesAllouees,
    fs.unallocated_extent_page_count AS PagesNonAllouees
FROM 
    sys.dm_db_file_space_usage fs
JOIN 
    sys.database_files df ON fs.file_id = df.file_id



	-- 1. Création de la connexion Root
CREATE LOGIN Root 
WITH PASSWORD = 'root',
DEFAULT_DATABASE = bdGesStock,
CHECK_EXPIRATION = OFF,
CHECK_POLICY = OFF;


-- 2. Création de la connexion Jacques
CREATE LOGIN Jacques 
WITH PASSWORD = 'root',
CHECK_EXPIRATION = ON,
CHECK_POLICY = ON;


-- 4. Activation du compte guest
USE bdGesStock;
GRANT CONNECT TO guest;


-- 7. Création des utilisateurs de base de données
CREATE USER URoot FOR LOGIN Root;
CREATE USER UJacques FOR LOGIN Jacques;



-- 10. Autorisation de sélection pour Jacques

GRANT SELECT ON PRODUIT TO UJacques;

-- 12. Autorisations supplémentaires pour Jacques avec WITH GRANT OPTION

GRANT DELETE, UPDATE, INSERT ON PRODUIT TO UJacques WITH GRANT OPTION;

-- Insérer un nouveau produit depuis la session de Jacques

INSERT INTO PRODUIT (Libelle, PU, codeCateg)
VALUES ('Nouvelle Tablette', 75000, 'EM');

-- 15. Autorisation de sélection sur toutes les tables du schéma dbo
GRANT SELECT ON SCHEMA::dbo TO UJacques;

-- 16. Révocation du droit de sélection sur CATEGORIE
REVOKE SELECT ON CATEGORIE FROM UJacques;

-- 19. Régularisation des droits
GRANT SELECT ON CATEGORIE TO UJacques;


-- 20. Privilèges pour Root

GRANT CREATE TABLE, CREATE VIEW TO URoot;


