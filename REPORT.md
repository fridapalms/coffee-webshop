# 📌 Rättningsrapport – fed25s-the-webshop-webbshop-grupp-6

## 🎯 Uppgiftens Krav:
# The Webshop - En inlämningsuppgift

Denna uppgift går ut på att ni skall bygga en webbshop baserat på kraven här under.
Projektet är ett vite-projekt med vanilla/typescript.
Målet är att studenterna skall förstå vad som krävs för att skicka information mellan sidor, använda localStorage och kunna manipulera data i listor och objekt.

## VIKTIGT

Varukorgen skall vara en lista med objekt som baseras på en ny klass eller datatyp. Denna klass/datatyp skall innehålla en produkt men också hur många av denna produkt som varukorgen har. Ibland kan det behövas mer information i detta objekt, men minst skall klassen innhålla produkt och antal på något sätt.

## Teknik

- HTML
- SCSS
- TypeScript

## Krav - Betyg G

- En landningssida (startsida)
- En produktsida (Produktdetaljer)
- En kassasida
- En varukorg
- Kunna lägga produkter i varukorgen
- Simulera att ett köp genomförs på kassasidan
- Beräkna fram ett totalpris på produkterna i varukorgen
- Att informationen i varukorgen lagras genom utökade objekt, inte bara en produkt
- Att kunna öka/minska antalet produkter i varukorgen.
- Att kunna öka/minska antalet produkter på kassasidan
- Koden skall vara mycket väl strukturerad, väl formaterad samt innehålla god namngivning

## Styling

Försök att arbeta med så mycket styling ni hinner. Det är en rolig uppgift att ha med i ett portfolio framöver. Se till att era animationer är subtila. Arbeta med hero-images, kanske med lite video/ljud. Och skapa en bra struktur mer er scss redan från början.

## Krav för styling

Det är inget krav att video och ljud används.
Partials bör användas.
Mixins skall användas om möjligt, t.ex. för mediaqueries.
Ingen dubbelstyling, används mixins i sådana fall.

## 🔍 ESLint-varningar:
- C:\Work\AssignmentCorrector\backend\repos\fed25s-the-webshop-webbshop-grupp-6\src\Utils\hero.ts - no-unused-vars - 'p' is defined but never used.
- C:\Work\AssignmentCorrector\backend\repos\fed25s-the-webshop-webbshop-grupp-6\src\Utils\htmlUtils.ts - no-unused-vars - 'p' is defined but never used.
- C:\Work\AssignmentCorrector\backend\repos\fed25s-the-webshop-webbshop-grupp-6\src\Utils\productDetails.ts - no-unused-vars - 'p' is defined but never used.
- C:\Work\AssignmentCorrector\backend\repos\fed25s-the-webshop-webbshop-grupp-6\src\Utils\showResult.ts - no-unused-vars - 'p' is defined but never used.

## 🏆 **Betyg: G**
📌 **Motivering:** Projektet uppfyller G-kraven funktionellt: det finns en landningssida, en produktsida och en kassasida, samt en varukorg där produkter kan läggas till och där antal kan ökas/minskas både i varukorgsvyn och på kassasidan. Varukorgen lagras korrekt som en lista av utökade objekt (produkt + quantity) via en separat typ (`cartItem`) och persisteras i localStorage (lagring/återställning via `cartStorage`). Totalpris beräknas och uppdateras, och köpflödet simuleras på kassasidan (modal/dialog) där varukorgen töms efter bekräftelse.

Kodbasen har en övergripande logisk mappstruktur (models/data/utils/scss med partials), men kravet om att koden ska vara "mycket väl strukturerad" uppfylls bara delvis på grund av flera kvalitetsbrister: sidlogik är samlad i `main.ts` och körs på alla sidor (många guards behövs), HTML för header/footer dupliceras mellan sidor, namngivning är inkonsekvent (t.ex. `cooike.ts`, typer i lowercase), pris hanteras som sträng med "kr" vilket kräver skör parsing, och det finns en konkret SCSS-inkonsekvens där `_showResult.scss` refererar till `$cart-bg-color` medan variabeln verkar heta `$cart_bg_color` (kompileringsrisk). Trots detta är helheten tillräckligt komplett och korrekt för betyget G enligt den tillåtna betygsskalan. Bra jobbat—ni har fått ihop en fungerande webbshop med central funktionalitet och tydlig användning av TypeScript och localStorage.

💡 **Förbättringsförslag:**  
1) Dela upp sidlogiken: bryt ut `main.ts` till t.ex. `pages/index.ts`, `pages/products.ts`, `pages/shop.ts` och importera endast relevant kod per HTML-sida. Det minskar guards och gör koden mer underhållbar.

2) Undvik duplicerad markup: återanvänd header/footer via en enkel render/inject-funktion i TS eller en multipage-setup med gemensamma partials/templates.

3) Fixa faktiska inkonsekvenser/buggar:
   - Rätta variabelnamnet i SCSS: `$cart-bg-color` vs `$cart_bg_color` (risk för att SCSS-builden faller).
   - Byt namn på `src/Utils/cooike.ts` till `cookie.ts` och håll konsekvent namngivning.

4) Modellera pris som `number` i produktmodellen och formatera till "kr" vid rendering. Då slipper ni skör parsing och specialfall i `stackPrice()`.

5) Byt `innerHTML` till `textContent` där ni inte behöver HTML (t.ex. titel/pris). Det minskar XSS-risk och är en bättre standard.

6) Event listeners: se över att ni inte råkar registrera nya lyssnare vid varje sökning/submit (t.ex. overlay-click). Initiera lyssnare en gång eller avregistrera tidigare.

7) Produktdetaljer: om ni visar quantity-input i popupen, koppla den till `addToCart(product, qty)` så att användarens val faktiskt används (annars ta bort inputen).

8) Konsekvent kodstandard: använd PascalCase för typer (`CartItem`), camelCase för variabler och konsekventa id/class-namn. Det höjer läsbarhet och upplevd kvalitet.

9) SCSS: ni använder partials bra—lägg gärna till en `_mixins.scss` (t.ex. för media queries) och ersätt upprepade `@media` med mixins för att möta stylingkraven tydligare.

10) Robusthet i checkout: gör null-check innan ni använder/castar DOM-element (t.ex. `modal.innerHTML = ""` först efter att ni säkert hittat elementet).

Fortsätt så—funktionaliteten sitter, och med lite mer komponentisering, konsekvent namngivning och robustare datamodellering kommer koden kännas riktigt proffsig.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| Sami Daly | 36 | 29.3% | 0.25 | 0.27 |
| Wille | 33 | 26.8% | 0.25 | 0.26 |
| Ingrid | 29 | 23.6% | 0.25 | 0.24 |
| Frida | 25 | 20.3% | 0.25 | 0.23 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
