# 🎮 Hangman Game

Jeu du Pendu développé en React + TypeScript.

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (installé avec Node.js)

## 📥 Installation

1. **Cloner le dépôt**
```sh
git clone https://github.com/al3xghm/hangman-game.git
cd lunastra
```

2. **Installer les dépendances**
```sh
npm install
# ou
yarn install
```

## ▶️ Démarrer le projet

### Mode développement
```sh
npm run dev
# ou
yarn dev
```
Le projet sera accessible à l'adresse suivante :  
[http://localhost:5173](http://localhost:5173)

---

## 🌐 API de mots

L'application utilise une **API locale** pour récupérer les mots aléatoires en français.

- 📄 **Fichier :** `app.tsx`
- 🌍 **Langue :** `fr-FR`
- 🔗 **URL de l'API :**  
  ```
  http://localhost:3333
  ```

L'API fournit un mot aléatoire à chaque nouvelle partie.
