# 🌤️ WeatherApp - Applicazione Meteo Dinamica (Mobile-First)

Benvenuto in **WeatherApp**, una web application meteo moderna, altamente interattiva e ottimizzata per l'esperienza mobile. Il progetto si distingue per un'interfaccia raffinata ispirata ai canoni del *Glassmorphism*, arricchita da animazioni fluide sequenziali e funzionalità matematico-astronomiche avanzate per il tracciamento in tempo reale del ciclo solare.

L'applicazione adotta un approccio **Mobile-First**, garantendo un'interfaccia nativa, pulita ed estremamente reattiva sui dispositivi mobili, con una roadmap orientata alla futura espansione desktop.

---

## 📸 Anteprima Interfaccia (Mobile View)

<p align="center">
  <img src="/src/assets/img/Screenshot-WeatherApp.png" width="320"  />
  <img src="https://images.unsplash.com/photo-1590055531615-f16d36fed8f8?w=350&auto=format&fit=crop&q=80" alt="WeatherApp Solar Cycle Preview" width="320" style="border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin: 10px;" />
</p>

> *Nota: Sostituisci i link segnaposto sopra con gli screenshot effettivi del tuo progetto (es. `public/screenshot-home.png`) inserendoli nella cartella del repository.*

---

## ✨ Funzionalità Principali

### 🌟 1. Interfaccia Glassmorphism Avanzata
L'applicazione abbandona i vecchi layout piatti per abbracciare l'effetto "vetro satinato" contemporaneo. Sfruttando la proprietà CSS `backdrop-filter: blur()`, i pannelli riflettono e sfocano delicatamente le immagini di sfondo, garantendo un contrasto tipografico eccellente e un look premium.

### 🌗 2. Sfondi e Icone Dinamiche in Real-Time
Il background dell'applicazione cambia istantaneamente in base alla condizione meteorologica e alla transizione giorno/notte della città cercata (es. temporale notturno, giornata serena, nebbia mattutina). La mappatura dei codici meteo adatta sia gli sfondi ad alta risoluzione che il set di icone personalizzate.

### ⏳ 3. Animazioni Sequenziali Fluide (Staggered Animations)
Per evitare un caricamento a scatti dei dati, i componenti della UI vengono renderizzati tramite un'onda di ingresso dal basso verso l'alto (*staggered animation*). L'uso di curve di bezier personalizzate (`cubic-bezier(0.16, 1, 0.3, 1)`) dona un feeling fluido, organico ed elegante tipico delle applicazioni native iOS/Android.

### ☀️ 4. Ciclo Solare Interattivo & Matematico
Il widget del **Ciclo Solare** calcola algoritmicamente la posizione del sole lungo un arco geometrico SVG. Per aggirare le problematiche legate ai fusi orari locali del browser, l'algoritmo calcola il progresso temporale basandosi sui **Timestamp Unix Assoluti** forniti dall'API. Il sole si sposta fluidamente tramite interpolazione lineare e trigonometria (`Math.cos` e `Math.sin`), simulando la reale posizione dell'astro.

### 📊 5. Previsioni Multi-Sorgente Integrate
L'architettura effettua chiamate asincrone combinate a più API per offrire un quadro informativo completo:
- **Meteo Corrente e Dettagli**: Vento, Umidità, Visibilità, Pressione Atmosferica, Nuvolosità e Temperatura Percepita.
- **Previsioni Triorarie (3h x 3h)**: Slider orizzontale nativo con swipe fluido per analizzare l'andamento della giornata.
- **Previsioni Settimanali (6 Giorni)**: Estrapolazione delle temperature minime/massime e dei codici di condizione giornalieri.

---

## 🛠️ Stack Tecnologico

L'applicazione è sviluppata sfruttando le tecnologie web più moderne e performanti:

- **React 18**: Gestione dello stato e dell'architettura a componenti riutilizzabili.
- **Vite**: Build tool ultra-rapido per uno sviluppo snello e ottimizzato in produzione.
- **Bootstrap 5**: Griglia responsiva e utility di base per il layout.
- **CSS3 Avanzato**: Animazioni personalizzate, Keyframes, variabili di ambiente e Glassmorphism.
- **OpenWeatherMap API**: Fornitore principale per i dati correnti e la segmentazione a 3 ore.
- **Open-Meteo Geocoding & Forecast API**: Utilizzata per l'estrapolazione geolocalizzata dei dati a lungo termine (6 giorni).

---

## 🚀 Installazione e Avvio Locale

Segui questi passaggi per clonare ed eseguire il progetto sul tuo computer:

### 1. Clonazione del Repository
```bash
git clone [https://github.com/Dan131195/AppMeteo2.git](https://github.com/Dan131195/AppMeteo2.git)
cd AppMeteo2