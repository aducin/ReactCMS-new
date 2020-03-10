import { AccountSingleItem } from './accounts';

interface Modal {
    action: string;
    close: () => void;
    open: boolean;
    title: string;
}

export interface AccountsModal extends Modal {
    selectedRow: AccountSingleItem | null;
}

export interface PostalModal extends Modal {
    current: string;
}
