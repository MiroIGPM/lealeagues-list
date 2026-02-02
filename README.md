# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Instalation 

Clone the repo and run yarn install or if you are using npm run npm install.

If you cannot install the packages, Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.

## Start 
After the successfull installation of the packages:

create .env file like in .env.example file with the base url

run npm run dev or if you are using yarn use: yarn dev command.

Navigate to http://localhost:5174/ or other localhost port if you have started your server on that port.

If you cannot start the project, Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.

## Design decisions and implementations

Ai tool used to help for the project to be finished in set time constraints is claude code with mostyl utilizaing its plan feature and its AskUserQuestions tool to get best posible results tailored to my preferences. Calued was used for:
 - bassic scaffolding
 - project folder structure 
 - writing basic unit test for ui features and simpler tests for hooks
 - writing type interfaces 
 - writing basic ui dumb components 
 - applying tailwind styels

 Architecture used was component based where the aim was to create ui component that were dumb and then can be reused anywhere in the features component which would contain business logic inside its own hooks and or context so that the data prop driling could be avoided as much as posible. Feature components would than be used as building block for page components which are part of the higher layout setup. Aim was to make everything as modular so it could be reused acros project.

 ## Improvement if more time was provided
- add theming
- using style preprocessors like sass
- Using some component library like kendo or MUI 
- Add url persistance 
- Do better accesebility compliance
- Add storybook 
- Utillize iconMoon or something similar to handle icons
- Add localization and internationalization
- Show more data in tooltips or something similar on smaller devices
- Do a better visual design
- Add badges prefetch on hover 
- Add more user friendly error messages handling 