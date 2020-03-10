import { Option as OptionInterface, OrderOption as OrderOptionInterface } from './interfaces/config';

const defaultOption: OptionInterface = { id: -1, name: 'Wybierz' };
const accountState: OptionInterface[] = [
    { id: 0, name: 'Otwarty' },
    { id: 1, name: 'Zamknięty' },
    { id: 2, name: 'Nieodebrany' }
];
export const accountType: OptionInterface[] = [
    { id: 1, name: 'Przelew' },
    { id: 2, name: 'Pobranie' },
    { id: 3, name: 'Usł. inf. '},
    { id: 4, name: 'Sprzedaż bezp. '},
    { id: 5, name: 'Zwrot' }
];

export const orderAction: OrderOptionInterface[] = [
    { id: 1, name: 'Sprawdź kupon', db: 'old', additional: 'voucher' },
    { id: 2, name: 'Oblicz 15% rabat', db: 'old', additional: 'discount' },
    { id: 3, name: 'Wyślij ponowny mail (NP)', db: 'new', additional: 'mail' },
    { id: 4, name: 'Wyślij ponowny mail (SP)', db: 'old', additional: 'mail' }
];

export const orderOrigin: OrderOptionInterface[] = [
    { id: 1, name: 'Nowy panel', db: 'new' },
    { id: 2, name: 'Stary panel', db: 'old' }
];

const config = {
    accounts: {
        buttons: {
            add: 'Dodaj rachunek',
            edit: 'Edytuj rachunek'
        },
        details: {
            empty: 'Nie znaleziono wyników spełniających podane kryteria.',
            headers: [
                { name: 'LP.' },
                { name: 'Klient' },
                { name: 'Numer nadania' },
                { name: 'Kwota' },
                { name: 'Rodzaj' },
                { name: 'Nr paragonu' },
                { name: 'Data paragonu' },
                { name: 'Data wpłaty' },
                { name: 'Lok.' },
                { name: 'Wagony' },
                { name: 'Element' },
                { name: 'Części' },
                { name: 'Książki' },
                { name: 'Auta' },
                { name: 'Uwagi' }
            ], // second property (size) will be used in the future to style a columns` width
            titleAuto: (length: number) => `Lista rachunków - ostatnie ${length} pozycji`,
            titleCustom: (length: number) => `Lista rachunków z podanego zakresu: ${length} pozycji`,
            titleOverreached: '(maksymalna jednorazowa ilość - uściślij kryteria)'
        },
        labels: {
            dateEnd: 'Data końcowa',
            dateStart: 'Data początkowa',
            state: 'Stan rachunku',
            type: 'Typ rachunku'
        },
        modal: {
            title: {
                add: 'Dodaj nowy rachunek',
                modify: 'Zmodyfikuj istniejący rachunek'
            }
        },
        subtitles: {
            filter: 'Wyszukiwanie zaawansowane',
            manage: 'Zarządzanie rachunkami'
        },
        title: 'Manager rachunków Ad9BIS'
    },
    datePicker: {
        today: 'Dziś'
    },
    orders: {
        buttons: {
            details: {
                even: 'Wyrównaj ilości',
                fullEdition: (id: number) => `Pełna edycja produktu ID: ${id}`,
                remove: 'Usuń wyniki',
                shippingNumber: 'Prześlij numer przesyłki'
            },
            header: {
                search: 'Wyszukaj'
            }
        },
        details: {
            headers: {
                detail: (number: string, panel: string, reference: string) =>
                    `Szczegóły zamówienia nr ${number} (${reference}) - ${panel} panel`,
                tableHeaders: [
                    { name: 'Miniatura' },
                    { name: 'Numer ID' },
                    { name: 'Nazwa' },
                    { name: 'Na stanie' },
                    { name: 'Na stanie (drugi sklep)' },
                    { name: 'Zamówione' },
                    { name: 'Opcje' }
                ]
            },
            labels: {
                amount: 'Kwota',
                customer: 'Klient',
                email: 'Adres e-mail'
            },
            noParams: 'Podaj numer zamówienia i wybierz akcję.',
            panels: {
                new: 'nowy',
                old: 'stary'
            }
        },
        labels: {
            action: 'Wybierz akcję',
            order: 'Wybierz zamówienie',
            shippingNumber: 'Wprowadź numer przesyłki'
        },
        title: 'Manager zamówień Ad9BIS'
    },
    postal: {
        buttons: {
            header: {
                add: 'Dodaj kwotę',
                subtract: 'Odejmij kwotę'
            }
        },
        details: {
            title: (length: number) => `Historia zmian (ostatnie ${length} wpisów)`
        },
        headers: {
            amount: 'Kwota',
            created: 'Data',
            position: 'LP.'
        },
        labels: {
            currentAmount: 'Bieżąca kwota'
        },
        modal: {
            title: {
                add: 'Dodaj środki',
                subtract: 'Odejmij środki'
            }
        },
        title: 'Manager wysyłek AD9BIS'
    },
    selects: {
        accounts: {
            state: accountState,
            type: accountType
        },
        orders: {
            action: orderAction,
            origin: orderOrigin
        },
        default: defaultOption
    },
    currency: 'zł',
    loading: 'Wczytuję dane',
    url: 'http://modele-ad9bis.pl/cms_spa/web/',
    urlApp: 'http://modele-ad9bis.pl/react-panel/build/',
    productUrl: 'http://ad9bis.vot.pl/lokomotywy-h0/'
};

export default config;
