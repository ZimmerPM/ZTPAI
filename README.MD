# LibraApp

LibraApp to aplikacja służąca do zarządzania zbiorami bibliotecznymi. Umożliwia użytkownikom przeglądanie katalogu bibliotecznego, pracownikom pozwala na modyfikowanie katalogu i prowadzenie go, a także każdemu użytkownikowi na zarządzanie własnym kontem. Celem stworzenia niniejszej wersji projektu była nauka i praktyka zaawansowanych technologii projektowania aplikacji internetowych.

## Widoki aplikacji

![Widok logowania aplikacji](/readme-pics/login.jpg "Widok logowania aplikacji")

![Widok logowania aplikacji- wersja mobilna](/readme-pics/login-mobile.jpg "Widok logowania aplikacji - wersja mobilna")

![Widok rejestracji użytkownika](/readme-pics/register.jpg "Widok rejestracji użytkownika")

![Widok rejestracji użytkownika -wersja mobilna](/readme-pics/register-mobile.jpg "Widok rejestracji użytkownika - wersja mobilna")

![Widok katalogu książek](/readme-pics/catalog.jpg "Widok katalogu książek")

![Widok katalogu książek - wersja mobilna](/readme-pics/catgalog-mobile.jpg "Widok katalogu książek - wersja mobilna")

![Dokumentacja Swaggera](/readme-pics/swagger.jpg "Dokumentacja Swaggera") 

## Technologie

- Django 4.2.7
- Python 3.10
- PostgreSQL 15.4
- React 18.2.0


## Uruchomienie

Aby uruchomić projekt lokalnie, postępuj zgodnie z poniższymi krokami:

1. Sklonuj repozytorium.
2. W pierwszej sesji terminala ustaw jako bieżący katalog: `ZTPAI/backend`
3. Uruchom migracje:  `python manage.py migrate`
4. Uruchom serwer:  `python manage.py runserver`
5. W drugiej równoległej sesji terminala jako bieżący katalog: `ZTPAI/frontend`
6. Zainstaluj zależności npm: `npm install` 
7. Uruchom aplikację: `npm start`
8. Wejdź na stronę: http://localhost:3000 w przeglądarce.


## Dodatkowe informacje

- Autor: Piotr Zimirski
- Link do repozytorium autora: https://github.com/ZimmerPM/

Dziękuję za zainteresowanie projektem LibraApp!