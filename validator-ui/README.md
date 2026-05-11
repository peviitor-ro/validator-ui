# Validator UI

Aplicatia `validator-ui` este interfata interna folosita pentru administrarea companiilor si a joburilor inainte de publicarea lor pe `https://joblio.ro`.

Scopul principal al aplicatiei este:
- sa listeze companiile disponibile pentru utilizatorul autentificat
- sa permita validarea si editarea datelor unei companii
- sa permita inspectarea, editarea si publicarea joburilor unei companii
- sa ofere actiuni de administrare pentru utilizatori si accesul acestora la companii

## Rolul aplicatiei

Aplicatia functioneaza ca un panou intern de operare pentru fluxul de publicare a joburilor.

Fluxul general este:
1. utilizatorul se autentifica prin email link
2. vede companiile la care are acces
3. intra pe pagina de joburi a unei companii
4. valideaza sau editeaza datele joburilor
5. publica unul sau mai multe joburi catre sistemul din spate care le face disponibile pe `joblio.ro`

Aplicatia nu este site-ul public de joburi, ci consola interna dinaintea publicarii.

## Stack tehnic

- React 18
- Vite
- React Router
- TanStack Query
- Axios
- Zustand
- Tailwind CSS
- Framer Motion
- Google reCAPTCHA v3

## Rulare locala

### Cerinte

- Node.js
- npm

### Variabile de mediu

Aplicatia foloseste urmatoarele variabile:

```env
VITE_BASE_URL=
VITE_BASE_WS_URL=
VITE_RECAPTCHA_KEY=
```

Descriere:
- `VITE_BASE_URL`: URL-ul backend-ului HTTP
- `VITE_BASE_WS_URL`: URL-ul backend-ului WebSocket pentru notificari
- `VITE_RECAPTCHA_KEY`: cheia publica Google reCAPTCHA folosita in login

### Pornire

```bash
npm install
npm run dev
```

Aplicatia ruleaza local pe:

```text
http://localhost:3000
```

Build de productie:

```bash
npm run build
```

## Structura functionala

### 1. Autentificare

Autentificarea este passwordless, pe baza de email.

Flux:
1. utilizatorul introduce emailul in pagina de login
2. aplicatia trimite cererea catre API-ul public
3. utilizatorul primeste un link pe email
4. linkul ajunge in `/authorize/:token`
5. aplicatia obtine tokenurile si starea de autentificare
6. tokenurile sunt salvate in `localStorage` sub cheia `validator`

Rute publice:
- `/login`
- `/authorize/:token`
- `/confirm-email`

Fisiere relevante:
- `src/pages/auth/Login.jsx`
- `src/pages/auth/Authorize.jsx`
- `src/services/auth/auth.service.js`
- `src/AuthProvider.jsx`

### 2. Layout si navigare

Dupa autentificare, utilizatorul intra in layout-ul principal al aplicatiei.

Acesta contine:
- continutul paginii curente
- bara fixa de navigare din partea de jos
- notificari live in partea dreapta sus

Navigarea principala include:
- `Acasa`
- `Cont`
- `Cautare`
- `Despre`
- `Notificari`
- `Iesire`

Fisiere relevante:
- `src/layouts/AppLayout/AppLayout.jsx`
- `src/contexts/Navbarcontext.jsx`
- `src/layouts/AppLayout/components/links.js`

### 3. Pagina principala: Companii

Ruta:
- `/`

Pagina principala afiseaza companiile la care utilizatorul are acces.

Functionalitati principale:
- cautare
- sortare
- incarcare incrementala prin infinite scroll
- editare companie
- stergere companie
- acces la joburile companiei
- deschidere website companie

Fiecare companie este afisata intr-un card cu:
- nume
- logo
- descriere
- numar de joburi publicate
- sursa
- actiuni rapide

Fisiere relevante:
- `src/pages/home/Homepage.jsx`
- `src/pages/home/components/cards/CompanyCard.jsx`
- `src/pages/home/components/forms/CompanyForm.jsx`

### 4. Pagina de joburi

Ruta:
- `/jobs/:id/:company`

Aceasta pagina afiseaza joburile unei companii selectate.

Functionalitati principale:
- listare joburi pentru compania selectata
- cautare si sortare
- infinite scroll
- editare job
- stergere job
- publicare job individual
- publicare in masa pentru toate joburile nepublicate
- stergere joburilor companiei din productie
- deschidere link original al jobului

Cardul unui job contine informatii precum:
- titlu job
- oras / judet / tara
- tip de lucru
- data publicarii
- status `Publicat`
- status `Editat`

Fisiere relevante:
- `src/pages/home/JobsPage.jsx`
- `src/pages/home/components/cards/JobCard.jsx`
- `src/pages/home/components/forms/JobForm.jsx`

## Publicarea joburilor

Publicarea este una dintre functiile principale ale aplicatiei.

Exista doua niveluri:

### Publicare job individual

Din cardul unui job, operatorul poate publica doar acel job.

Frontend-ul trimite jobul editat sau validat catre endpointul de publicare, iar dupa succes actualizeaza starea locala a listei.

### Publicare in masa

Din pagina de joburi, operatorul poate publica toate joburile nepublicate ale unei companii.

Fluxul este:
1. aplicatia incarca toate paginile de joburi ale companiei
2. filtreaza doar joburile nepublicate
3. trimite lotul catre endpointul de publicare
4. marcheaza local joburile ca publicate

Practic, aceasta aplicatie este ultimul pas de control operational inainte ca joburile sa ajunga in ecosistemul `joblio.ro`.

## Administrarea utilizatorilor si a accesului

Ruta:
- `/account`

Pagina `account` este folosita pentru administrarea accesului.

Functionalitati:
- adaugare utilizator
- selectarea unui utilizator existent
- atribuirea companiilor catre acel utilizator
- modificarea rolurilor `is_superuser` si `is_staff`
- stergerea unui utilizator

Aceasta pagina este importanta pentru controlul operational: fiecare utilizator vede doar companiile si joburile pe care are voie sa le gestioneze.

Fisiere relevante:
- `src/pages/account/Account.jsx`
- `src/pages/account/AccountForm.jsx`
- `src/pages/account/CompanyAccess.jsx`

## Integrarea cu backend-ul

Aplicatia foloseste doua instante Axios:

- `PUBLIC_API`
  pentru endpointurile publice, in special autentificare
- `PRIVATE_API`
  pentru endpointurile care necesita token

Tokenul `access` este atasat automat pe requesturile private.

La expirare:
- interceptorul Axios incearca refresh pe baza tokenului de refresh
- daca refresh-ul esueaza, utilizatorul este delogat

Fisiere relevante:
- `src/services/Api.js`
- `src/services/AxiosInterceptors.jsx`
- `src/services/landing/landing.service.js`
- `src/services/landing/landing.queries.js`

## Notificari live

Aplicatia deschide un WebSocket dupa autentificare pentru a primi notificari.

Acestea sunt afisate in layout si pot fi marcate ca citite.

Configurarea foloseste:
- `VITE_BASE_WS_URL`

Fisier relevant:
- `src/layouts/AppLayout/AppLayout.jsx`

## Managementul starii

Aplicatia combina:
- React Query pentru date asincrone si paginare
- Zustand pentru optiuni de filtrare, cautare si stare UI per sectiune

Exemple:
- filtre companii
- filtre joburi
- date pentru utilizatori si companii in zona de administrare

## Rute principale

### Publice

- `/login`
- `/authorize/:token`
- `/confirm-email`

### Protejate

- `/`
- `/account`
- `/jobs/:id/:company`

## Fisiere cheie din proiect

- `src/main.jsx` - entry point React
- `src/App.jsx` - providers principali ai aplicatiei
- `src/routes/Router.jsx` - definirea rutelor
- `src/layouts/AppLayout/AppLayout.jsx` - shell-ul aplicatiei
- `src/pages/home/Homepage.jsx` - lista companiilor
- `src/pages/home/JobsPage.jsx` - lista joburilor unei companii
- `src/pages/account/Account.jsx` - administrare utilizatori si acces
- `src/services/Api.js` - configurare Axios
- `src/services/AxiosInterceptors.jsx` - refresh token si logout automat

## Deploy

Configurarea existenta pentru Netlify:

```toml
[build]
command = "npm run build"
publish = "dist"

[dev]
command = "npm run dev"
port = 3000
```

## Rezumat

`validator-ui` este consola interna de operare prin care echipa:
- administreaza companii
- valideaza si editeaza joburi
- publica joburi
- controleaza accesul utilizatorilor

Prin acest UI, datele sunt pregatite si trimise mai departe pentru publicare pe `https://joblio.ro`.
