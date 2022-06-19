# McPoliba

Si vuole realizzare un’applicazione web per la gestione degli ordini all’interno di un fast food.

Tutti i casi d'uso sono stati implementati e in particolare:
- Il frontend è stato realizzato in React
- Sono state gestite le sessioni attraverso passport secondo i JWT. 
- Nonostante sia stata utilizzata MUI come libreria grafica, gran parte del CSS è stato realizzato a mano.

## Frontend

Per il frontend è stato utilizzato React.
All'interno dell'applicazione web è presente una cartella con delle directories, che 
racchiudono tutti i componenti visivi della stessa.

![img_1.png](docs/img_1.png)

### ShoppingCart

Il primo di questi è rappresentato da ShoppingCart, il carello che permette di 
concludere o modificare l'ordine.

![img.png](docs/img.png)

### CartItem

Il componente CartItem è uno degli elementi selezionati dal menù e nella sezione di ShoppingCart 
può essere modificato.

![img_7.png](docs/img_7.png)

### HomePage 

La pagina principale permette la creazione di un ordine dal menù.

![img_2.png](docs/img_2.png)

### Login 

Questo componente permette di effettuare il login se si è 
già registrati per poter visuallizare i propri ordini.

![img_3.png](docs/img_3.png)

### Login

Questo componente permette di effettuare la registrazione.

![img_4.png](docs/img_4.png)

### Navbar

La Navbar è il container per i vari bottoni, tra cui gli ordini, 
il carello e la possibilità di effettura il logout.

![img_5.png](docs/img_5.png)

### Orders 

Orders consente di visualizzare la presa in carica di un ordine e quelli attivi

![img_6.png](docs/img_6.png)

### ChefPanel

La finestra del cuoco permette di prendere in carica o completare un 
ordine e verificare gli ordini attivi tramite id.

![img_8.png](docs/img_8.png)

## Backend

Il backend dell’applicazione è stato realizzato mediante Node.js ed Express.js.
I dati sono stati memorizzati all’interno di un database MongoDB.

![img_9.png](docs/img_9.png)

### Models

Nella directory del backend, models, vengono creati gli oggetti con i propri 
attrtibuti che saranno aggiunti e gestiti dal database.

### Controllers

In questa direcory è presente la logica per effettura  il logout, il login con 
l'autentificazione tramite jwt, l'aggiunta, l'eliminazione o l'aggiornamento 
di un prodotto e per controllare e gestire gli ordini.

### Autenticazione con JWT

Poiché JWT non deve essere verificato rispetto al database, migliora le prestazioni evitando la chiamata al database
in ogni richiesta.
Inoltre è archiviato sul lato client, aiuta a prevenire gli attacchi XSRF/CSRF.

![img_10.png](docs/img_10.png)

Le funzione utilizzate per l'autenticazione all'interno di userController sono:
1. getToken, viene utilizzato per creare il JWT.
2. getRefreshToken, viene utilizzato per creare il token di aggiornamento, che a sua volta è un JWT.
3. verifyUser è un middleware che deve essere chiamato per ogni richiesta autenticata.
4. COOKIE_OPTIONS viene utilizzato per creare il cookie del token di aggiornamento, che dovrebbe essere solo http e sicuro in modo che non possa essere letto dal javascript del client. SameSite è impostato su "Nessuno" poiché client e server saranno in domini diversi.

## API

L’applicazione dovrà fornire ai diversi attori le corrette API per il loro successivo utilizzo mediante dispositivi 
differenti. In particolare, i clienti del fast food potranno accedere al menù mediante il sito web e creare un ordine
mediante selezione degli elementi dal menù e pagamento immediato (simulato). I clienti, inoltre, potranno visualizzare lo 
stato del loro ordine. I cuochi del fast food potranno visualizzare la lista degli ordini inseriti, confermare l’inizio 
della lavorazione di un ordine e notificare la fine della preparazione. L’amministratore del sistema potrà aggiungere, 
modificare e rimuovere elementi all’interno del menù e potrà accedere allo storico delle transazioni.

![img_11.png](docs/img_11.png)

### Login e SignUp

Queste API permettono rispettivamente di effettuare il login e registrarsi.

![img_12.png](docs/img_12.png)
![img_13.png](docs/img_13.png)

### Me

me permette di ricevere tramite token l'oggetto che rappresenta l'utente loggato in quella sessione.

![img_14.png](docs/img_14.png)

### Refresh token 

Questa API consente di aggiornare la pagina senza perdere il token.

![img_15.png](docs/img_15.png)

 
### Logout 

Permette di effettuare il logout.

![img_16.png](docs/img_16.png) 

### Order

Queste API permettono rispettivamenre di creare, completare o accettare un ordine, prendere tutti gli ordini
attivi e quelli relativi all'utente loggato

### Product 

Le APi consentono di aggiungere un prodotto, prenderlo, eliminarlo e aggiornarlo.



