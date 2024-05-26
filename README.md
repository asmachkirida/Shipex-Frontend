# Project Shipex
![Capture_d_écran_2024-05-16_142433-removebg-preview](https://github.com/asmachkirida/Shipex-Frontend/assets/118173002/2d07ac80-6d76-4b0f-8061-f3a230d9ac47)

Ce document présente notre plateforme innovante, une application web et mobile dédiée à l'optimisation logistique par la géolocalisation. Ce projet vise à simplifier et améliorer les processus de transport et de gestion des stocks dans l'industrie logistique. Notre objectif est de faciliter la gestion des itinéraires de transport de manière efficace, en offrant des fonctionnalités telles que le suivi en temps réel des livraisons, l'optimisation des itinéraires et la planification des horaires de livraison. Conçue pour aider les entreprises à réduire les coûts logistiques tout en améliorant l'efficacité des opérations, cette plateforme permet une gestion logistique optimisée grâce à des fonctionnalités avancées et une interface intuitive. Un élément clé de notre plateforme est l'intégration de Google Maps, qui aide à optimiser les trajets et à s'adapter aux besoins spécifiques de chaque entreprise, redéfinissant ainsi la logistique traditionnelle. En utilisant la technologie pour optimiser la logistique, nous visons non seulement à rendre les processus plus efficaces, mais aussi à répondre aux besoins uniques de chaque entreprise.
## Table des matières
- [Aperçu](#aperçu)
- [Frontend](#frontend)
- [Backend](#backend)
- [Pour commencer](#pour-commencer)
- [Utilisation](#utilisation)
- [Structure du dossier](#structure-du-dossier)
- [Dépendances](#dépendances)
- [Démo vidéo](#démo-vidéo)
- [Contributions](#contributions)
  ## Aperçu
 Le projet vise à créer une application de géolocalisation révolutionnaire pour simplifier la gestion logistique. Avec une interface conviviale et sécurisée, elle rend l'optimisation des itinéraires et la gestion des stocks accessibles à tous. En offrant des fonctionnalités comme le suivi en temps réel des livraisons et la sélection d'itinéraires basée sur les conditions de trafic, elle améliore l'efficacité opérationnelle et la satisfaction client. L'objectif principal est d'optimiser les processus logistiques et de réduire les coûts, tout en favorisant l'adoption continue de cette solution innovante.
- ## Architecture logicielle
![Capture d'écran 2024-05-26 095007](https://github.com/asmachkirida/Shipex-Frontend/assets/118173002/89738b7f-2525-41b7-8626-3f8b51f6ce13)

## Frontend
### Technologies Utilisées
- React js
- React native 
- Chakra UI
- CSS
## Structure du Projet Frontend

La structure du projet frontend React repose sur quatre composants principaux, chacun ayant un objectif précis et contribuant à l'architecture globale et à la stabilité de l'application.

### 1. Composant Auth
- **Objectif:** Faciliter l'authentification des utilisateurs avec une interface de connexion commune, tout en offrant des formulaires d'inscription distincts adaptés à chaque rôle.
- **Fonctionnalités:**
  - **Interface de Connexion Partagée:** Une interface commune pour la connexion de tous les utilisateurs (administrateurs, livreurs et clients).
  - **Formulaires d'Inscription Adaptés:** Des formulaires d'inscription spécifiques pour les administrateurs, les livreurs et les clients, recueillant les informations nécessaires pour chaque type d'utilisateur.
  - **JWT (JSON Web Tokens):** Utilisation de tokens JWT pour sécuriser les endpoints de l'API et gérer l'accès basé sur les rôles. Les tokens sont stockés de manière sécurisée et utilisés pour authentifier les requêtes des utilisateurs.
  - **Gestion des Sessions:** Utilisation des cookies ou du stockage local pour gérer les sessions utilisateurs de manière sécurisée.
  - **Validation des Formulaires:** Système de validation des données pour assurer que les informations fournies sont correctes et complètes.

### 2. Composant Client
- **Objectif:** Permettre aux clients de soumettre facilement un colis en fournissant des détails précis via un formulaire détaillé et de suivre leurs colis en temps réel.
- **Fonctionnalités:**
  - **Soumission de Colis:** Formulaire détaillé permettant aux clients de soumettre des informations sur le colis, telles que le nom, la date d'expédition, le poids, et les instructions spéciales.
  - **Ajout d'Articles:** Possibilité pour les clients d'ajouter des articles spécifiques à leur colis, décrivant chaque produit.
  - **Suivi des Colis en Temps Réel:** Affichage des informations cruciales sur le statut du colis, y compris la durée et le coût estimés de la livraison, l'acceptation par le chauffeur, et l'état actuel du colis avec des mises à jour régulières de l'emplacement.
  - **Historique des Colis:** Consultation de l'historique des colis envoyés avec détails sur chaque envoi.
  - **Notifications:** Alertes pour les mises à jour importantes du statut du colis.

### 3. Composant Chauffeur
- **Objectif:** Offrir aux livreurs la flexibilité de sélectionner les villes à visiter dans l'ordre de leur choix tout en optimisant les itinéraires pour une efficacité maximale et en gérant les livraisons.
- **Fonctionnalités:**
  - **Optimisation des Itinéraires:** Possibilité de sélectionner les villes à visiter, avec optimisation automatique du trajet pour une efficacité maximale.
  - **Ajout de Colis au Voyage:** Les livreurs peuvent ajouter des colis à leur itinéraire en fonction de leur route planifiée.
  - **Gestion des Colis:** Affichage des colis disponibles sur une carte interactive, avec options pour accepter ou refuser des colis. Une fois un colis accepté, le livreur ne peut pas en accepter d'autres pendant 48 heures pour éviter les surcharges de travail.
  - **Démarrage du Voyage:** Les livreurs peuvent commencer leur voyage, gérer la livraison des colis et mettre à jour le statut de chaque colis.
  - **Suivi en Temps Réel:** Suivi en temps réel des colis livrés avec mises à jour régulières de l'emplacement actuel du livreur.
  - **Gestion des Bons de Livraison:** Les livreurs peuvent gérer les bons de livraison pour chaque colis livré.

### 4. Composant Admin
- **Objectif:** Fournir une vue d'ensemble des statistiques des colis et faciliter la gestion des colis, des livreurs et des clients, tout en supervisant le système.
- **Fonctionnalités:**
  - **Statistiques et Supervision:** Affichage des statistiques des colis, distinguant les colis en attente et les colis livrés, ainsi que le nombre total de colis ajoutés chaque mois.
  - **Visualisation des Utilisateurs et Colis:** Possibilité de visualiser les informations des clients, des colis et des livreurs.
  - **Gestion des Colis:** Permet de visualiser, ajouter, modifier et supprimer des colis.
  - **Gestion des Utilisateurs:** Fonctionnalités d'ajout, modification et suppression rapides des livreurs et des clients existants.
  - **Tableaux et Graphiques:** Utilisation de graphiques pour représenter les données de manière visuelle et compréhensible.


