# Shoper - SAREhub Extension

## Obsługiwane zdarzenia

@TODO

## Wykorzystanie w sklepie internetowym

@TODO

## Development

Aby zaaktualizować kod biblioteki należy wykonać następujące kroki:

1. Zaloguj się do głównego panelu platformy Shoper: [https://panel.shoper.pl/](https://panel.shoper.pl/)
2. Aby zaktualizować bibliotekę należy wejść do sekcji **Moje aplikacje** i podmienić kod biblioteki
3. Aby opublikować zmiany należy udać do panelu developerksiego platformy Shoper. Aby dostać link do wspomnianego panelu należy wejść w sekcję **Sklep developerski**.
4. Po poprawny zalogowaniu przechodzimy do **Aplikacje -> Moje Aplikacje**. Po wybraniu odpowiedniej Aplikacji należy kliknąć **Aktualizuj**.

### Dodatkowe informacje

Przydatne linki:

- [API do pobierania informacji o produktach, koszyku itd.](https://developers.shoper.pl/developers/front-api/getting-started)
- [Zmienne kontekstowe](https://developers.shoper.pl/developers/snippets/contexts)

Objekt **Shop** dostępny na poziomie strony:

- ```Shop.pageType``` - typ odwiedzanej strony np: shop_product_list, shop_product
- ```Shop.pageId``` - identyfikator produktu lub kategorii
